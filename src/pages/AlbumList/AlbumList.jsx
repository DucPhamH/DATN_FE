import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../components/GlobalComponents/Pagination'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { getListAlbumForChef } from '../../apis/albumApi'
import AlbumItem from './components/AlbumItem'

export default function AlbumList() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { data, isLoading } = useQuery({
    queryKey: ['albums-list-chef', queryConfig],
    queryFn: () => {
      return getListAlbumForChef(queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const handleChangeSort = (e) => {
    navigate({
      pathname: '/chef/album-list',
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
        pathname: '/chef/album-list',
        search: createSearchParams({
          ...omit(queryConfig, ['status'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/chef/album-list',
        search: createSearchParams({
          ...queryConfig,
          status: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeCategoryAlbum = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/chef/album-list',
        search: createSearchParams({
          ...omit(queryConfig, ['category_album'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/chef/album-list',
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
        pathname: '/chef/album-list',
        search: createSearchParams(omit({ ...queryConfig }, ['status', 'category_album', 'page', 'search'])).toString()
      })
      return
    }
    navigate({
      pathname: '/chef/album-list',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchAlbums }, ['status', 'category_album', 'page'])
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
                <span>Album đã tạo</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[30%] border-red-300 '></div>
            </div>
            <div className='col-span-4 lg:col-span-5 mb-2  '>
              <div className='flex flex-wrap gap-3 xl:justify-end items-center'>
                <button
                  onClick={() => navigate('/chef/create-album')}
                  className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <div className='flex justify-center gap-2 items-center'>
                    <FaPlus /> <div>Tạo Album mới</div>
                  </div>
                </button>
                <select
                  onChange={handleChangeSort}
                  defaultValue={queryConfig.sort}
                  id='sort'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='desc'>Mới nhất</option>
                  <option value='asc'>Lâu nhất</option>
                </select>
                <select
                  defaultValue={queryConfig.status || 'all'}
                  onChange={handleChangeStatus}
                  id='status'
                  className='select my-2  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Tất cả</option>
                  <option value='1'>Đã duyệt</option>
                  <option value='0'>Chưa duyệt</option>
                </select>
                <select
                  defaultValue={queryConfig.category_album || 'all'}
                  onChange={handleChangeCategoryAlbum}
                  id='category_album'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
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

                <form onSubmit={onSubmitSearch} className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'>
                  <div className='relative'>
                    <input
                      autoComplete='off'
                      type='search'
                      id='search_input'
                      {...register('searchAlbums')}
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
                        Tên Album
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
                    {data?.data?.result.albums.map((album) => {
                      return <AlbumItem key={album._id} album={album} />
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data?.data.result.albums.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có album nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center items-center'>
              <Pagination pageSize={data?.data.result.totalPage} queryConfig={queryConfig} url='/chef/album-list' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
