import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20
1 2 ... 4 5 [6] 8 9 ... 19 20
1 2 ...13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2
export default function Pagination({ queryConfig, pageSize, url }) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='bg-white text-sm font-medium dark:shadow-orange-900 dark:bg-gray-900 dark:text-white dark:border-gray-800 rounded  text-black px-3 py-1 shadow-sm mx-2 border'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='bg-white text-sm font-medium dark:shadow-orange-900 dark:bg-gray-900 dark:text-white dark:border-gray-800  rounded text-black px-3 py-1 shadow-sm mx-2 border'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: url,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'bg-white rounded border text-sm font-medium dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 px-3 py-1 hover:text-orange-600 shadow-sm mx-2 cursor-pointer',
              {
                'border-orange-600 text-orange-600': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap gap- mt-6 justify-center'>
      {page === 1 ? (
        <span className=' cursor-not-allowed text-sm font-medium rounded border text-gray-500 dark:text-gray-200 dark:bg-gray-800 dark:border-none bg-white/60 px-3 py-1  shadow-sm'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: url,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className=' dark:shadow-orange-900 text-sm font-medium dark:bg-gray-900 border-gray-300 dark:border-gray-800  cursor-pointer rounded border bg-white px-3 py-1  shadow-sm'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className=' cursor-not-allowed text-sm font-medium rounded border text-gray-500 dark:text-gray-200 dark:bg-gray-800 dark:border-none bg-white/60 px-3 py-1 shadow-sm'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: url,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className=' dark:shadow-orange-900 text-sm font-medium dark:bg-gray-900 border-gray-300 dark:border-gray-800  cursor-pointer rounded border bg-white px-3 py-1  shadow-sm'
        >
          Next
        </Link>
      )}
    </div>
  )
}
