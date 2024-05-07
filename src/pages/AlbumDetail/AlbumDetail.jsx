import { useParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAlbumForUser } from '../../apis/albumApi'
import Loading from '../../components/GlobalComponents/Loading'
import { FaPlus } from 'react-icons/fa'

export default function AlbumDetail() {
  const { id } = useParams()
  const { data, isFetching } = useQuery({
    queryKey: ['album-info-user', id],
    queryFn: () => {
      return getAlbumForUser(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  const album = data?.data.result[0]
  console.log(album)

  return (
    <div className='h-full mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        {isFetching ? (
          <Loading />
        ) : (
          <div className=''>
            <div className=''>
              <div className='text-xl font-medium mb-2'>
                <span>Bạn đang xem album: {album.title}</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
              <div className='flex gap-5 justify-between'>
                <div className=' text-red-600 dark:text-red-300 font-medium mb-2'>
                  Thể loại: <span className='text-black dark:text-gray-400 '>{album.category_album}</span> -{' '}
                  <span className='text-sm text-red-800 dark:text-red-400 font-medium '>
                    {album.recipes.length} công thức
                  </span>
                </div>

                <button className='block btn btn-xs  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'>
                  <div className='flex text-xs justify-center gap-1 items-center'>
                    <FaPlus /> <div>Lưu</div>
                  </div>
                </button>
              </div>

              <div className=' my-4 dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
                <div className='m-1 flex  gap-2'>{album.description}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
