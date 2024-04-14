import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getUserPosts } from '../../../../apis/postApi'
import PostCard from '../../../../components/CardComponents/PostCard'
import Loading from '../../../../components/GlobalComponents/Loading'

export default function UserPost({ user_id }) {
  const { ref, inView } = useInView()
  const fetchUserPost = async ({ pageParam }) => {
    return await getUserPosts(user_id, { page: pageParam })
  }

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['userPost', user_id],
    queryFn: fetchUserPost,
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
        <div className='col-span-3'>
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
        <div className='hidden xl:block col-span-2'></div>
      </div>
    </>
  )
}
