import { Link, useParams } from 'react-router-dom'
import BlogCard from '../../components/CardComponents/BlogCard'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPost } from '../../apis/postApi'
import LoadingHome from '../Home/components/LoadingHome'
import PostCardInfo from '../../components/CardComponents/PostCardInfo'
import { getBlogsForUser } from '../../apis/blogApi'

export default function PostInfo() {
  const { id } = useParams()
  const { data, status } = useQuery({
    queryKey: ['post-info', id],
    queryFn: () => {
      return getPost(id)
    }
  })
  const { data: blogData } = useQuery({
    queryKey: ['blogs-list-user', { limit: 2 }],
    queryFn: () => {
      return getBlogsForUser({ limit: 2 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })
  const post = data?.data.result[0]

  if (status === 'pending') {
    return <LoadingHome />
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
      <div className='grid xl:mx-8 mb-[30rem] pt-2 xl:gap-6 xl:grid-cols-5'>
        <div className='col-span-3 '>
          <div className=''>
            <PostCardInfo data={post} />
          </div>
        </div>
        <div className='hidden xl:block col-span-2'>
          <div className='w-full shadow bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tin tức mới nhất
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <div className='p-3'>
              {blogData?.data?.result.blogs.map((blog) => {
                return (
                  <BlogCard
                    key={blog._id}
                    blogItem={blog}
                    imgClass='w-full max-h-[20rem] object-cover rounded-t-xl scale-100 overflow-hidden'
                    dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                    titleClass=' font-bold  transition-all cursor-pointer line-clamp-2 hover:text-color-secondary'
                    descriptionClass='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'
                    linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                  />
                )
              })}
              <Link
                to={`/blog`}
                className='w-full flex justify-center text-center pb-4 font-medium dark:text-gray-300 text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-300'
              >
                Xem thêm bài viết...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
