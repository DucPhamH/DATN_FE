import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getMePosts } from '../../../../apis/postApi'
import PostCard from '../../../../components/CardComponents/PostCard'
import Loading from '../../../../components/GlobalComponents/Loading'

export default function MePost() {
  const { ref, inView } = useInView()
  const fetchMePost = async ({ pageParam }) => {
    return await getMePosts({ page: pageParam })
  }

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['mePost'],
    queryFn: fetchMePost,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.posts.length ? allPages.length + 1 : undefined
      return nextPage
    }
  })

  const content = data?.pages.map((dataMePost) =>
    dataMePost.data.result.posts.map((post) => {
      return <PostCard key={post._id} data={post} />
    })
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (status === 'pending') {
    return <Loading className='w-full flex justify-center mt-4' />
  }

  if (status === 'error') {
    return (
      <div className='w-full p-10 text-center font-bold text-red-600 dark:text-pink-700 h-[100rem]'>
        Có lỗi xảy ra vui lòng load lại trang
      </div>
    )
  }
  return (
    <>
      <div className=' grid xl:mx-8 pt-2 xl:gap-6 xl:grid-cols-5'>
        <div className='xl:col-span-3'>
          <div className='my-3'>
            {content}
            {/* <div ref={ref}>{isFetchingNextPage && <Loading />}</div> */}
            <div ref={ref}>
              {isFetchingNextPage ? (
                <Loading />
              ) : (
                <div className='flex justify-center font-medium'>Không còn bài viết</div>
              )}
            </div>
          </div>
        </div>
        <div className=' order-first xl:order-last xl:col-span-2'>
          <div className='bg-white dark:bg-color-primary  w-full my-3 shadow flex flex-col justify-center sm:rounded-lg'>
            <div className='px-4 py-5'>
              <h3 className='text-lg leading-6 font-medium dark:text-gray-300 text-gray-900'>Thông tin cá nhân</h3>
            </div>
            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Full name</dt>
                  <dd className='mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2'>
                    Mickael Poulaz
                  </dd>
                </div>
                <div className='bg-white dark:bg-color-primary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium  text-gray-500'>Best techno</dt>
                  <dd className='mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2'>React JS</dd>
                </div>
                <div className='bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Email address</dt>
                  <dd className='mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2'>
                    m.poul@example.com
                  </dd>
                </div>
                <div className='bg-white dark:bg-color-primary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Salary</dt>
                  <dd className='mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2'>$10,000</dd>
                </div>
                <div className='bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>About</dt>
                  <dd className='mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2'>
                    To get social media testimonials like these, keep your customers engaged with your social media
                    accounts by posting regularly yourself
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
