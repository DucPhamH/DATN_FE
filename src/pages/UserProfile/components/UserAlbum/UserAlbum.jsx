import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Loading from '../../../../components/GlobalComponents/Loading'
import PaginationNotUrl from '../../../../components/GlobalComponents/PaginationNotUrl'
import { getUserAlbum } from '../../../../apis/albumApi'
import AlbumCard from '../../../../components/CardComponents/AlbumCard'

export default function UserAlbum({ user_id }) {
  const [queryConfig, setQueryConfig] = useState({
    page: 1,
    limit: 8
  })

  const { data, isLoading } = useQuery({
    queryKey: ['user-album', queryConfig],
    queryFn: () => {
      return getUserAlbum(user_id, queryConfig)
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
                {data?.data?.result.albums.map((album) => {
                  return <AlbumCard key={album._id} album={album} />
                })}
              </div>
            </>
          )}
          {data?.data.result.albums.length === 0 && (
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
