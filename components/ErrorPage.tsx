import { PageHead } from './PageHead'

export function ErrorPage({ statusCode }: { statusCode: number }) {
  const title = 'Error'

  return (
    <>
      <PageHead title={title} />

      <div className='absolute inset-0 flex justify-center items-center p-notion text-base leading-6 text-gray-700 bg-bg font-notion'>
        <main className='flex flex-col justify-center items-center'>
          <h1>Error Loading Page</h1>

          {statusCode && <p>Error code: {statusCode}</p>}

          <img src='/error.png' alt='Error' className='max-w-full w-160' />
        </main>
      </div>
    </>
  )
}
