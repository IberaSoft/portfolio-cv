import { type ExtendedRecordMap } from 'notion-types'
import { getPageTweetIds } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'
import { getTweet as getTweetData } from 'react-tweet/api'

import type { ExtendedTweetRecordMap, TweetData } from './types'
import { db } from './db'

export async function getTweetsMap(
  recordMap: ExtendedRecordMap
): Promise<void> {
  const tweetIds = getPageTweetIds(recordMap)

  const tweetsMap = Object.fromEntries(
    await pMap(
      tweetIds,
      async (tweetId: string) => {
        return [tweetId, await getTweet(tweetId)]
      },
      {
        concurrency: 8
      }
    )
  )

  ;(recordMap as ExtendedTweetRecordMap).tweets = tweetsMap
}

async function getTweetImpl(tweetId: string): Promise<TweetData | null> {
  if (!tweetId) return null

  const cacheKey = `tweet:${tweetId}`

  try {
    try {
      const cachedTweet = await db.get(cacheKey)
      if (cachedTweet || cachedTweet === null) {
        return cachedTweet as TweetData | null
      }
    } catch (err) {
      // ignore redis errors
      const error = err as Error
      console.warn(`redis error get "${cacheKey}"`, error.message)
    }

    const tweetData = (await getTweetData(tweetId)) || null

    try {
      await db.set(cacheKey, tweetData)
    } catch (err) {
      // ignore redis errors
      const error = err as Error
      console.warn(`redis error set "${cacheKey}"`, error.message)
    }

    return tweetData
  } catch (err) {
    const error = err as Error
    console.warn('failed to get tweet', tweetId, error.message)
    return null
  }
}

export const getTweet = pMemoize(getTweetImpl)
