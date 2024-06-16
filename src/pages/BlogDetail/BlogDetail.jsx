import { FaArrowCircleRight } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { getBlogForUser, getBlogsForUser } from '../../apis/blogApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import moment from 'moment'
import parse from 'html-react-parser'
import Comments from './components/Comments'
import { MdPerson } from 'react-icons/md'
import { FaEye } from 'react-icons/fa6'
import { FaComment } from 'react-icons/fa'

export default function BlogDetail() {
  const { id } = useParams()
  const { data, isLoading: isLoadingBlog } = useQuery({
    queryKey: ['blog-info-user', id],
    queryFn: () => {
      return getBlogForUser(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  const { data: recommendBlog } = useQuery({
    queryKey: [
      'recommend-blog',
      {
        category_blog_id: data?.data.result[0]?.category_blog_id
      }
    ],
    queryFn: () => {
      return getBlogsForUser({
        category_blog_id: data?.data.result[0]?.category_blog_id
      })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  //bỏ blog hiện tại ra khỏi danh sách recommend và limted 4 bài

  const filterRecommendBlog = recommendBlog?.data.result.blogs
    .filter((item) => item._id !== data?.data.result[0]._id)
    .slice(0, 4)

  return (
    <>
      <div className='grid xl:mx-4 pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-6'>
          <main className='pt-8 xl:mx-12 xl:px-10 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            {isLoadingBlog ? (
              <Loading />
            ) : (
              <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
                <article className='mx-auto w-full '>
                  <header className='mb-3 not-format'>
                    <div>
                      <span className='font-medium text-gray-500'>
                        {moment(data?.data.result[0].createdAt).format('LLLL')}
                      </span>

                      <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                        {data?.data.result[0].title}
                      </h1>
                      <div className='pt-3 text-sm flex gap-2 flex-wrap'>
                        <div className='flex font-medium pr-3 text-gray-500  border-r-2 flex-row items-center'>
                          <MdPerson className='text-lg text-green-500 mr-1' />
                          {data?.data.result[0].user.name}
                        </div>

                        <div className='flex flex-row items-center text-gray-500 font-medium pr-3 border-r-2  '>
                          <FaEye className='text-blue-400 mr-1' />
                          <span className=''> {data?.data.result[0].user_view} lượt xem</span>
                        </div>

                        <div className='flex pr-3 flex-row text-gray-500 font-medium items-center'>
                          <FaComment className='text-blue-400 mr-1' />
                          {data?.data.result[0].comment_count} bình luận
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className='border rounded-md shadow-md mb-4 bg-[#fef8f8] dark:bg-gray-900 dark:border-none to-gray-300 p-3'>
                    <div className='font-medium'>Xem thêm các bài viết khác:</div>

                    <ul>
                      {filterRecommendBlog?.map((blog) => {
                        return (
                          <li key={blog._id} className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                            <div>
                              <FaArrowCircleRight size={18} className='text-xl' />
                            </div>

                            <Link to={`/blog/${blog._id}`} className=' hover:underline'>
                              {blog.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <p className='lead mb-3 whitespace-pre-line font-medium'>{data?.data.result[0].description}</p>
                  <div className='flex flex-col items-center my-6 justify-center w-[100%]'>
                    <img
                      className='object-cover rounded-md max-h-[28rem] w-[100%]'
                      src={data?.data.result[0].image}
                      alt='image'
                    />
                  </div>
                  <div className='custorm-blog '>{parse(data?.data.result[0].content)}</div>
                </article>
              </div>
            )}
            <Comments blog={data?.data.result[0]} />
          </main>
        </div>
      </div>
    </>
  )
}
