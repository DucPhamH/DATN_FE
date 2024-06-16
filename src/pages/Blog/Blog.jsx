import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getBlogsForUser, getCategoryBlogs } from '../../apis/blogApi'
import BlogCard from '../../components/CardComponents/BlogCard'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'

export default function Blog() {
  const navigate = useNavigate()
  const queryConfig = omit(useQueryConfig(), ['page'])

  const { data: category } = useQuery({
    queryKey: ['category-blog'],
    queryFn: () => {
      return getCategoryBlogs()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const fetchBlog = async ({ pageParam }) => {
    return await getBlogsForUser({ page: pageParam, ...queryConfig })
  }
  // const { data: blogData, isFetching } = useQuery({
  //   queryKey: ['blogs-list-user', queryConfig],
  //   queryFn: () => {
  //     return getBlogsForUser(queryConfig)
  //   },
  //   placeholderData: keepPreviousData,
  //   staleTime: 1000 * 60 * 5
  // })

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['blogs-list-user', queryConfig],
    queryFn: fetchBlog,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // const nextPage = lastPage.data.result.blogs.length ? allPages.length + 1 : undefined
      const nextPage = lastPage.data.result.page + 1
      if (nextPage > lastPage.data.result.totalPage) return undefined
      return nextPage
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  const handleChangeSort = (e) => {
    navigate({
      pathname: '/blog',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }

  // viết hàm lấy id category từ các thẻ input radio mỗi khi click vào
  const handleClickCategory = (e) => {
    console.log(e.target.id)
    if (e.target.id === 'tat-ca') {
      navigate({
        pathname: '/blog',
        search: createSearchParams({
          ...omit(queryConfig, ['category_blog_id'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/blog',
        search: createSearchParams({
          ...queryConfig,
          category_blog_id: e.target.id
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
        pathname: '/blog',
        search: createSearchParams(
          omit({ ...queryConfig }, ['status', 'category_blog_id', 'page', 'search', 'limit'])
        ).toString()
      })
      return
    }
    navigate({
      pathname: '/blog',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchBlogs }, ['category_blog_id', 'limit'])
      ).toString()
    })
  })

  return (
    <div className='h-full mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-4 items-center'>
            <div className='col-span-2 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Góc chia sẻ, bí quyết nấu nướng</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
            </div>
            <div className='col-span-2 mb-2 md:flex xl:justify-end items-center '>
              <select
                defaultValue={queryConfig.sort}
                onChange={handleChangeSort}
                id='sort_by'
                className='select my-2 select-sm border bg-white dark:bg-slate-800 dark:border-none'
              >
                <option value='desc'>Mới nhất</option>
                <option value='asc'>Cũ nhất</option>
              </select>
              <form onSubmit={onSubmitSearch} className='md:ml-4 w-[100%] max-w-[20rem] relative'>
                <div className='relative'>
                  <input
                    type='search'
                    id='search_blog'
                    name='search_blog'
                    {...register('searchBlogs')}
                    placeholder='Tìm kiếm chuyên đề'
                    className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                  />
                  <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                    <AiOutlineSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='my-2'>
            <div className='flex items-center justify-center'>
              <ul className='flex flex-wrap w-full py-2 gap-x-5 px-2'>
                <li className=''>
                  <input
                    className='peer sr-only'
                    onClick={handleClickCategory}
                    defaultChecked={queryConfig.category_blog_id ? false : true}
                    type='radio'
                    name='answer'
                    id='tat-ca'
                  />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out'
                    htmlFor='tat-ca'
                  >
                    Tất cả
                  </label>
                </li>
                {category?.data?.result.map((item) => {
                  return (
                    <li key={item._id}>
                      <input
                        className='peer sr-only'
                        onClick={handleClickCategory}
                        type='radio'
                        name='answer'
                        defaultChecked={queryConfig.category_blog_id === item._id}
                        id={item._id}
                      />
                      <label
                        className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out'
                        htmlFor={item._id}
                      >
                        {item.name}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
                {data?.pages?.map((dataBlogs) =>
                  dataBlogs.data.result.blogs.map((blog) => {
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
                  })
                )}
              </div>
            </>
          )}
          <div className='w-full'>
            <button
              className='btn w-full mt-4 hover:bg-red-800 mb-6 text-xl bg-red-900 dark:bg-pink-700 dark:disabled:bg-slate-700 dark:disabled:text-gray-400 disabled:text-black text-gray-200'
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Đang tải ...' : hasNextPage ? 'Xem thêm kết quả khác' : 'Không còn bài viết nào'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
