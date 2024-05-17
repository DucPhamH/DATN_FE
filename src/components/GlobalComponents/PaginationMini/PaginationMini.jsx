export default function PaginationMini({ query, pageSize, setQuery, title }) {
  const page = Number(query.page) ? Number(query.page) : 1

  return (
    <div className='flex mx-3 justify-end '>
      <div className='flex gap-5 justify-center items-center'>
        <div className=' font-medium text-gray-700 dark:text-gray-400'>
          {title} {page}/{pageSize}
        </div>
        <div className='flex'>
          {page === 1 ? (
            <button
              disabled
              className='flex cursor-not-allowed  items-center bg-white text-gray-500 shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'
            >
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 5H1m0 0 4 4M1 5l4-4'
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setQuery({ ...query, page: (page - 1).toString() })}
              className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'
            >
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 5H1m0 0 4 4M1 5l4-4'
                />
              </svg>
            </button>
          )}

          {page === pageSize ? (
            <button
              disabled
              className='flex cursor-not-allowed items-center bg-white text-gray-500 shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'
            >
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M1 5h12m0 0-4-4m4 4-4 4'
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setQuery({ ...query, page: (page + 1).toString() })}
              className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'
            >
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M1 5h12m0 0-4-4m4 4-4 4'
                />
              </svg>
            </button>
          )}

          {/* <button className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'>
            <svg
              className='w-3.5 h-3.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  )
}
