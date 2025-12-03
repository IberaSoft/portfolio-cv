import { AiOutlineRetweet } from 'react-icons/ai'
import { IoHeartOutline } from 'react-icons/io5'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
 */
export function PageActions({ tweet }: { tweet: string }) {
  return (
    <div className='flex flex-row justify-center py-1.5 px-3 pb-3'>
      <a
        className='cursor-pointer text-2xl inline-flex p-3 mr-4 last:mr-0 rounded-full bg-transparent transition-all duration-200 ease-out hover:bg-red-100 hover:text-red-600 hover:transition-all hover:duration-75 hover:ease-out'
        href={`https://twitter.com/intent/like?tweet_id=${tweet}`}
        target='_blank'
        rel='noopener noreferrer'
        title='Like this post on Twitter'
      >
        <IoHeartOutline />
      </a>

      <a
        className='cursor-pointer text-2xl inline-flex p-3 mr-4 last:mr-0 rounded-full bg-transparent transition-all duration-200 ease-out hover:bg-green-100 hover:text-green-600 hover:transition-all hover:duration-75 hover:ease-out'
        href={`https://twitter.com/intent/retweet?tweet_id=${tweet}`}
        target='_blank'
        rel='noopener noreferrer'
        title='Retweet this post on Twitter'
      >
        <AiOutlineRetweet />
      </a>
    </div>
  )
}
