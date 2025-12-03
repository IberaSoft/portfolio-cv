import { LoadingIcon } from './LoadingIcon'

export function Loading() {
  return (
    <div className='absolute inset-0 flex justify-center items-center p-notion text-base leading-6 text-gray-700 bg-bg font-notion'>
      <LoadingIcon />
    </div>
  )
}
