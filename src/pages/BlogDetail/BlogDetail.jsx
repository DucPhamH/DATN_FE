import { FaArrowCircleRight } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { LiaEyeSolid } from 'react-icons/lia'
import { FaRegComment } from 'react-icons/fa'
import { getBlogForUser } from '../../apis/blogApi'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import moment from 'moment'
import parse from 'html-react-parser'
import Comments from './components/Comments'

export default function BlogDetail() {
  const { id } = useParams()
  const { data, isFetching: isFetchingBlog } = useQuery({
    queryKey: ['blog-info-user', id],
    queryFn: () => {
      return getBlogForUser(id)
    }
  })

  return (
    <>
      <div className='grid xl:mx-4  pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-6'>
          <main className='pt-8 xl:mx-12 xl:px-10 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            {isFetchingBlog ? (
              <Loading />
            ) : (
              <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
                <article className='mx-auto w-full '>
                  <header className='mb-3 not-format'>
                    <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                      {data?.data.result[0].title}
                    </h1>

                    <div className='flex mx-3 mt-2 justify-between items-center'>
                      <div className=''>
                        <div className='flex font-bold items-center gap-2'>
                          Người viết:
                          <div className='mr-4 flex items-center gap-2'>
                            <div className='font-medium hover:underline cursor-pointer'>
                              {data?.data.result[0].user.name}
                            </div>
                          </div>
                        </div>
                        <div className='flex font-bold items-center'>
                          Ngày tạo:{' '}
                          <span className='ml-2 font-medium'>
                            {moment(data?.data.result[0].createdAt).format('MM/DD/YYYY')}
                          </span>
                        </div>
                      </div>
                      <div className=' text-xs font-bold flex flex-col justify-end text-black-900 dark:text-gray-300'>
                        <div className='flex items-center justify-end gap-1'>
                          <div className='text-xl'>
                            <LiaEyeSolid />
                          </div>
                          {data?.data.result[0].user_view} lượt xem
                        </div>
                        <div className='flex items-center justify-end gap-1'>
                          <div className=''>
                            <FaRegComment />
                          </div>
                          {data?.data.result[0].comment_count} bình luận
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className='border rounded-md shadow-md mb-4 bg-[#fef8f8] dark:bg-gray-900 dark:border-none to-gray-300 p-3'>
                    <div className='font-medium'>Xem thêm các bài viết khác:</div>
                    <ul>
                      <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                        <FaArrowCircleRight className='text-xl' />
                        <Link className=' hover:underline'> Tính chỉ số BMR </Link>
                      </li>
                      <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                        <FaArrowCircleRight className='text-xl' />
                        <Link className=' hover:underline'> Tìm hiểu và tính toán chỉ số Calo</Link>
                      </li>
                      <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                        <FaArrowCircleRight className='text-xl' />
                        <Link className=' hover:underline'> Tính toán lượng chất béo trong cơ thể</Link>
                      </li>
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
