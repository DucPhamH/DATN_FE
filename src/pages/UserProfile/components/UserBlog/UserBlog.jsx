import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUserBlog } from '../../../../apis/blogApi'
import { useState } from 'react'
import Loading from '../../../../components/GlobalComponents/Loading'
import BlogCard from '../../../../components/CardComponents/BlogCard'
import PaginationNotUrl from '../../../../components/GlobalComponents/PaginationNotUrl'

export default function UserBlog({ user_id }) {
  const [queryConfig, setQueryConfig] = useState({
    page: 1,
    limit: 8
  })

  const { data, isLoading } = useQuery({
    queryKey: ['user-blog', queryConfig],
    queryFn: () => {
      return getUserBlog(user_id, queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  console.log(queryConfig)

  return (
    <div className='mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
                {data?.data?.result.blogs.map((blog) => {
                  return (
                    <BlogCard
                      key={blog._id}
                      blogItem={blog}
                      imgClass='w-full h-[12rem] object-cover rounded-t-xl scale-100 overflow-hidden'
                      dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                      titleClass=' font-bold h-12 transition-all cursor-pointer line-clamp-2 hover:text-color-secondary'
                      descriptionClass='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'
                      linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                    />
                  )
                })}
              </div>
            </>
          )}
          {data?.data.result.blogs.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center mb-5 items-center'>
              <PaginationNotUrl pageSize={data?.data.result.totalPage} query={queryConfig} setQuery={setQueryConfig} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
