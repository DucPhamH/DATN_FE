import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { getListAlbumForUser } from '../../apis/albumApi'
import AlbumCard from '../../components/CardComponents/AlbumCard'

export default function Album() {
  const navigate = useNavigate()
  const queryConfig = omit(useQueryConfig(), ['page'])

  const fetchAlbum = async ({ pageParam }) => {
    return await getListAlbumForUser({ page: pageParam, ...queryConfig })
  }

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['albums-list-user', queryConfig],
    queryFn: fetchAlbum,
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
      pathname: '/album',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }

  const handleChangeCategoryAlbum = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/album',
        search: createSearchParams({
          ...omit(queryConfig, ['category_album'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/album',
        search: createSearchParams({
          ...queryConfig,
          category_album: e.target.value
        }).toString()
      })
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchAlbums: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.searchAlbums === '') {
      navigate({
        pathname: '/album',
        search: createSearchParams(omit({ ...queryConfig }, ['category_album', 'limit', 'page', 'search'])).toString()
      })
      return
    }
    navigate({
      pathname: '/album',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchAlbums }, ['category_album', 'limit'])
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
                <span>Album nấu ăn nổi bật</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
            </div>
            <div className='col-span-2 gap-2 mb-2 flex flex-wrap justify-end items-center '>
              <select
                defaultValue={queryConfig.sort}
                onChange={handleChangeSort}
                id='sort_by'
                className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
              >
                <option value='desc'>Mới nhất</option>
                <option value='asc'>Cũ nhất</option>
              </select>
              <select
                defaultValue={queryConfig.category_album || 'all'}
                onChange={handleChangeCategoryAlbum}
                id='category_album'
                className='select   select-sm border bg-white dark:bg-slate-800 dark:border-none'
              >
                <option value='all'>Thể loại</option>
                <option value='Cho bé'>Cho bé</option>
                <option value='Cho bà bầu'>Cho bà bầu</option>
                <option value='Cho người già'>Cho người già</option>
                <option value='Giảm cân'>Giảm cân</option>
                <option value='Tăng cân'>Tăng cân</option>
                <option value='Cho người bệnh'>Cho người bệnh</option>
                <option value='Thể thao'>Thể thao</option>
                <option value='Sắc đẹp'>Sắc đẹp</option>
                <option value='Cho người ăn chay'>Cho người ăn chay</option>
              </select>
              <form onSubmit={onSubmitSearch} className=' w-[100%] max-w-[20rem] relative'>
                <div className='relative'>
                  <input
                    type='search'
                    id='search_input'
                    {...register('searchAlbums')}
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

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
                {data?.pages?.map((dataAlbums) =>
                  dataAlbums.data.result.albums.map((album) => {
                    return <AlbumCard key={album._id} album={album} />
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
