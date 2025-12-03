import type * as types from '@/lib/types'

import { PageHead } from './PageHead'

export function Page404({ site, pageId, error }: types.PageProps) {
  const title = site?.name || 'Page Not Found'

  return (
    <>
      <PageHead site={site} title={title} />

      <div className='absolute inset-0 flex justify-center items-center p-notion text-base leading-6 text-gray-700 bg-bg font-notion'>
        <main className='flex flex-col justify-center items-center'>
          <h1>Page Not Found</h1>

          {error ? (
            <p>{error.message}</p>
          ) : (
            pageId && (
              <p>
                Make sure that Notion page &quot;{pageId}&quot; is publicly
                accessible.
              </p>
            )
          )}

          <img
            src='/404.png'
            alt='404 Not Found'
            className='max-w-full w-160'
          />
        </main>
      </div>
    </>
  )
}
