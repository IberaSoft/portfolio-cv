import ky from 'ky'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { ImageResponse } from 'next/og'
import { type PageBlock, type ExtendedRecordMap } from 'notion-types'
import {
  getBlockIcon,
  getBlockTitle,
  getPageProperty,
  isUrl,
  parsePageId
} from 'notion-utils'

import * as config from '@/lib/config'
import interSemiBoldFont from '@/lib/fonts/inter-semibold'
import { mapImageUrl } from '@/lib/map-image-url'
import { notion } from '@/lib/notion-api'
import { type NotionPageInfo, type PageError } from '@/lib/types'

export const runtime = 'edge'

// Social image dimensions following OpenGraph standards
const SOCIAL_IMAGE_WIDTH = 1200
const SOCIAL_IMAGE_HEIGHT = 630
const CARD_WIDTH = 900
const CARD_HEIGHT = 465
const AUTHOR_IMAGE_SIZE = 128
const BORDER_WIDTH = 16

/**
 * Generates Open Graph social media images for Notion pages
 */
export default async function OGImage(
  req: NextApiRequest,
  _res: NextApiResponse
) {
  try {
    const { searchParams } = new URL(req.url || '')
    const pageId = parsePageId(
      searchParams.get('id') || config.rootNotionPageId
    )

    if (!pageId) {
      return new Response('Invalid notion page id', { status: 400 })
    }

    const pageInfoResult = await getNotionPageInfo({ pageId })

    if (pageInfoResult.type === 'error') {
      console.error('Page info error:', pageInfoResult.error)
      return new Response(
        JSON.stringify({ error: pageInfoResult.error.message }),
        {
          status: pageInfoResult.error.statusCode,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const pageInfo = pageInfoResult.data

    return createSocialImage(pageInfo)
  } catch (error) {
    console.error('Social image generation error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate social image' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

/**
 * Creates the social media image using ImageResponse
 */
function createSocialImage(pageInfo: NotionPageInfo) {
  const containerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#1F2027',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    color: 'black'
  }

  const backgroundImageStyle = {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  }

  const cardContainerStyle = {
    position: 'relative' as const,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    display: 'flex',
    flexDirection: 'column' as const,
    border: `${BORDER_WIDTH}px solid rgba(0,0,0,0.3)`,
    borderRadius: 8,
    zIndex: '1'
  }

  const cardContentStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-around' as const,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center' as const,
    textAlign: 'center' as const
  }

  const titleStyle = {
    fontSize: 70,
    fontWeight: 700,
    fontFamily: 'Inter'
  }

  const detailStyle = {
    fontSize: 32,
    opacity: 0.6
  }

  const authorImageContainerStyle = {
    position: 'absolute' as const,
    top: 47,
    left: 104,
    height: AUTHOR_IMAGE_SIZE,
    width: AUTHOR_IMAGE_SIZE,
    display: 'flex',
    borderRadius: '50%',
    border: '4px solid #fff',
    zIndex: '5'
  }

  const authorImageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  }

  return new ImageResponse(
    <div style={containerStyle}>
      {/* Background Image */}
      {pageInfo.image && (
        <img
          src={pageInfo.image}
          alt='Background'
          style={backgroundImageStyle}
        />
      )}

      {/* Main Content Card */}
      <div style={cardContainerStyle}>
        <div style={cardContentStyle}>
          {/* Hidden detail for spacing */}
          {pageInfo.detail && (
            <div style={{ ...detailStyle, opacity: 0 }}>{pageInfo.detail}</div>
          )}

          {/* Title */}
          <div style={titleStyle}>{pageInfo.title}</div>

          {/* Visible detail */}
          {pageInfo.detail && <div style={detailStyle}>{pageInfo.detail}</div>}
        </div>
      </div>

      {/* Author Image */}
      {pageInfo.authorImage && (
        <div style={authorImageContainerStyle}>
          <img
            src={pageInfo.authorImage}
            alt='Author'
            style={authorImageStyle}
          />
        </div>
      )}
    </div>,
    {
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBoldFont,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}

/**
 * Fetches and processes Notion page information for social image generation
 */
export async function getNotionPageInfo({
  pageId
}: {
  pageId: string
}): Promise<
  | { type: 'success'; data: NotionPageInfo }
  | { type: 'error'; error: PageError }
> {
  try {
    const recordMap = await notion.getPage(pageId)

    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value

    if (!block) {
      return {
        type: 'error',
        error: {
          statusCode: 404,
          message: 'Page not found or invalid page structure'
        }
      }
    }

    // Validate workspace
    const validationError = validateWorkspace(block as PageBlock, pageId)
    if (validationError) {
      return validationError
    }

    const pageInfo = await buildPageInfo(block as PageBlock, recordMap, pageId)

    return {
      type: 'success',
      data: pageInfo
    }
  } catch (error) {
    console.error(`Error fetching page info for ${pageId}:`, error)
    return {
      type: 'error',
      error: {
        statusCode: 500,
        message: 'Failed to fetch page information'
      }
    }
  }
}

/**
 * Validates if the page belongs to the correct workspace
 */
function validateWorkspace(
  block: PageBlock,
  pageId: string
): { type: 'error'; error: PageError } | null {
  const blockSpaceId = block.space_id

  if (
    blockSpaceId &&
    config.rootNotionSpaceId &&
    blockSpaceId !== config.rootNotionSpaceId
  ) {
    return {
      type: 'error',
      error: {
        statusCode: 400,
        message: `Notion page "${pageId}" belongs to a different workspace.`
      }
    }
  }

  return null
}

/**
 * Builds the complete page information object
 */
async function buildPageInfo(
  block: PageBlock,
  recordMap: ExtendedRecordMap,
  pageId: string
): Promise<NotionPageInfo> {
  const isBlogPost =
    block.type === 'page' && block.parent_table === 'collection'
  const title = getBlockTitle(block, recordMap) || config.name

  // Image processing
  const imageCoverPosition =
    (block as PageBlock).format?.page_cover_position ??
    config.defaultPageCoverPosition
  const imageObjectPosition = imageCoverPosition
    ? `center ${(1 - imageCoverPosition) * 100}%`
    : null

  const imageBlockUrl = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover,
    block
  )
  const imageFallbackUrl = mapImageUrl(config.defaultPageCover, block)

  // Author image processing
  const blockIcon = getBlockIcon(block, recordMap)
  const authorImageBlockUrl = mapImageUrl(
    blockIcon && isUrl(blockIcon) ? blockIcon : null,
    block
  )
  const authorImageFallbackUrl = mapImageUrl(config.defaultPageIcon, block)

  // Fetch images in parallel for better performance
  const [authorImage, image] = await Promise.all([
    getCompatibleImageUrl(authorImageBlockUrl, authorImageFallbackUrl),
    getCompatibleImageUrl(imageBlockUrl, imageFallbackUrl)
  ])

  // Author and metadata
  const author =
    getPageProperty<string>('Author', block, recordMap) || config.author
  const publishedTime = getPageProperty<number>('Published', block, recordMap)
  const datePublished = publishedTime ? new Date(publishedTime) : undefined

  const date =
    isBlogPost && datePublished ? formatPublishDate(datePublished) : undefined

  const detail = date || author || config.domain

  return {
    pageId,
    title,
    image,
    imageObjectPosition,
    author,
    authorImage,
    detail
  }
}

/**
 * Formats the publication date for display
 */
function formatPublishDate(date: Date): string {
  return `${date.toLocaleString('en-US', {
    month: 'long'
  })} ${date.getFullYear()}`
}

/**
 * Checks if a URL is reachable by making a HEAD request
 */
async function isUrlReachable(url: string | null): Promise<boolean> {
  if (!url) {
    return false
  }

  try {
    await ky.head(url, {
      timeout: 5000, // 5 second timeout
      retry: {
        limit: 2,
        methods: ['head']
      }
    })
    return true
  } catch (error) {
    console.warn(`URL not reachable: ${url}`, error)
    return false
  }
}

/**
 * Gets a compatible image URL, falling back if the primary URL is not reachable
 * Also optimizes Unsplash URLs for better performance
 */
async function getCompatibleImageUrl(
  url: string | null,
  fallbackUrl: string | null
): Promise<string | null> {
  const image = (await isUrlReachable(url)) ? url : fallbackUrl

  if (!image) {
    return null
  }

  try {
    const imageUrl = new URL(image)

    // Optimize Unsplash images
    if (imageUrl.host === 'images.unsplash.com') {
      if (!imageUrl.searchParams.has('w')) {
        imageUrl.searchParams.set('w', SOCIAL_IMAGE_WIDTH.toString())
        imageUrl.searchParams.set('fit', 'max')
        imageUrl.searchParams.set('q', '80') // Quality
        return imageUrl.toString()
      }
    }

    return image
  } catch (error) {
    console.warn(`Invalid image URL: ${image}`, error)
    return image // Return original if URL parsing fails
  }
}
