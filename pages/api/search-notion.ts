import { type NextApiRequest, type NextApiResponse } from 'next'

import type * as types from '../../lib/types'
import { search } from '../../lib/notion'

export default async function searchNotion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const searchParams: types.SearchParams = req.body

  console.log('<<< lambda search-notion', searchParams)

  try {
    const results = await search(searchParams)
    console.log('>>> lambda search-notion', results)

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
    )
    res.status(200).json(results)
  } catch (error) {
    console.error('Search error - Notion API may be experiencing issues:', {
      error: error.message,
      searchParams,
      timestamp: new Date().toISOString()
    })

    // Return an empty results object instead of failing
    // This allows the search UI to remain functional even when Notion's search API is down
    const emptyResults = {
      results: [],
      total: 0,
      hasMore: false
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, max-age=10, stale-while-revalidate=10'
    )
    res.status(200).json(emptyResults)
  }
}
