import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../components/GlobalComponents/Pagination'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { getBlogsForChef, getCategoryBlogs } from '../../apis/blogApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import BlogItem from './components/BlogItem'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'

export default function BlogList() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category-blog'],
    queryFn: () => {
      return getCategoryBlogs()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['blogs-list-chef', queryConfig],
    queryFn: () => {
      return getBlogsForChef(queryConfig)
    },
    placeholderData: keepPreviousData
  })

  const handleChangeSort = (e) => {
    navigate({
      pathname: '/chef/blog-list',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }
  const handleChangeStatus = (e) => {
    console.log(e.target.value)
    if (e.target.value === 'all') {
      console.log('all')
      navigate({
        pathname: '/chef/blog-list',
        search: createSearchParams({
          ...omit(queryConfig, ['status'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/chef/blog-list',
        search: createSearchParams({
          ...queryConfig,
          status: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      navigate({
        pathname: '/chef/blog-list',
        search: createSearchParams({
          ...omit(queryConfig, ['category_blog_id'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/chef/blog-list',
        search: createSearchParams({
          ...queryConfig,
          category_blog_id: e.target.value
        }).toString()
      })
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchBlogs: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.searchBlogs === '') {
      navigate({
        pathname: '/chef/blog-list',
        search: createSearchParams(
          omit({ ...queryConfig }, ['status', 'category_blog_id', 'page', 'search'])
        ).toString()
      })
      return
    }

    navigate({
      pathname: '/chef/blog-list',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchBlogs }, ['status', 'category_blog_id', 'page'])
      ).toString()
    })
  })

  return (
    <div className='h-screen mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-6 items-center'>
            <div className='col-span-2 lg:col-span-1 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Blog đã tạo</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button
                  onClick={() => navigate('/chef/create-blog')}
                  className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <div className='flex justify-center gap-2 items-center'>
                    <FaPlus /> <div>Tạo bài viết</div>
                  </div>
                </button>
                <select
                  onChange={handleChangeSort}
                  defaultValue={queryConfig.sort}
                  id='sort'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='desc'>Mới nhất</option>
                  <option value='asc'>Lâu nhất</option>
                </select>
                <select
                  defaultValue={queryConfig.status || 'all'}
                  onChange={handleChangeStatus}
                  id='status'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Tất cả</option>
                  <option value='1'>Đã duyệt</option>
                  <option value='0'>Chưa duyệt</option>
                  <option value='3'>Bị từ chối</option>
                </select>
                {isLoadingCategory ? (
                  <Loading className='flex ml-4' />
                ) : (
                  <select
                    defaultValue={queryConfig.category_blog_id || 'all-category'}
                    onChange={handleChangeCategory}
                    id='category'
                    className='select  select-sm  bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='all-category'>Tất cả thể loại</option>
                    {category?.data?.result.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                )}
                <form onSubmit={onSubmitSearch} className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'>
                  <div className='relative'>
                    <input
                      autoComplete='off'
                      type='search'
                      id='search_input'
                      {...register('searchBlogs')}
                      placeholder='Tìm kiếm bài viết'
                      className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                    />
                    <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                      <AiOutlineSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className=' border-[2px] scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                <table className=' w-full shadow-md  divide-y divide-gray-200'>
                  <thead className='bg-gray-50 dark:bg-slate-800 '>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Tên bài viết
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Trạng thái
                      </th>

                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Thể loại
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Ngày tạo
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                      >
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                    {data?.data?.result.blogs.map((blog) => {
                      return <BlogItem key={blog._id} blog={blog} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.blogs.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination pageSize={data?.data.result.totalPage} queryConfig={queryConfig} url='/chef/blog-list' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
