import { type GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { domain, isDev, languagePageIds, pageUrlOverrides } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { type PageProps, type Params } from '@/lib/types'

// Define the type for languagePageIds
interface LanguagePageIds {
  default: string
  [key: string]: string
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPageId = context.params.pageId as string

  try {
    // Check if there's a pageUrlOverride for this path first
    // If not, check languagePageIds, otherwise pass rawPageId to resolveNotionPage
    let pageId: string | undefined

    if (pageUrlOverrides[rawPageId]) {
      // pageUrlOverride exists - pass rawPageId to resolveNotionPage which will handle it
      pageId = rawPageId
    } else if (
      languagePageIds &&
      (languagePageIds as LanguagePageIds)[rawPageId]
    ) {
      // Use language page IDs from site config if it exists
      pageId = (languagePageIds as LanguagePageIds)[rawPageId]
    } else if (
      languagePageIds &&
      (languagePageIds as LanguagePageIds).default
    ) {
      // Fall back to default language page
      pageId = (languagePageIds as LanguagePageIds).default
    } else {
      // No override or language mapping, pass rawPageId to resolveNotionPage
      pageId = rawPageId
    }

    const props = await resolveNotionPage(domain, pageId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMap = await getSiteMap()

  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    // paths: [],
    fallback: true
  }

  console.log(staticPaths.paths)
  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}
