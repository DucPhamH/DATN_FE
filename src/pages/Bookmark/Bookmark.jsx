import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { bookmarkUser } from '../../apis/userApi'
import RecipeCard from '../../components/CardComponents/RecipeCard'
import Loading from '../../components/GlobalComponents/Loading'
import AlbumCard from '../../components/CardComponents/AlbumCard'
import toast from 'react-hot-toast'
import { queryClient } from '../../main'
import { unbookmarkAlbum } from '../../apis/albumApi'

export default function Bookmark() {
  const { data, isLoading } = useQuery({
    queryKey: ['bookmark'],
    queryFn: () => {
      return bookmarkUser()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-3 '>
          <div className=''>
            <div className='mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Bài viết nấu ăn đã yêu thích</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data?.result.recipes.length === 0 ? (
            <div className='text-center text-gray-400 text-lg mt-5'>Bạn chưa lưu bài viết nào</div>
          ) : (
            <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
              {data?.data?.result.recipes.map((recipe) => {
                return <RecipeCard key={recipe._id} recipe={recipe} />
              })}
            </div>
          )}
        </>
      )}

      <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-3 '>
          <div className=''>
            <div className='mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Album đã yêu thích</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data?.result.albums.length === 0 ? (
            <div className='text-center text-gray-400 text-lg mt-5'>Bạn chưa lưu album nào</div>
          ) : (
            <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
              {data?.data?.result.albums.map((album) => {
                return <AlbumItem key={album._id} album={album} />
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const AlbumItem = ({ album }) => {
  const unbookmarkMutation = useMutation({
    mutationFn: (body) => unbookmarkAlbum(body)
  })

  const handleBookmark = () => {
    if (album?.is_bookmarked) {
      unbookmarkMutation.mutate(
        { album_id: album?._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['bookmark']
            })
            toast.success('Bỏ lưu thành công')
          }
        }
      )
    }
  }

  return (
    <div className='relative h-full w-full'>
      <button
        onClick={handleBookmark}
        className='block z-50 absolute top-0 right-0 m-2 btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-gray-200 hover:text-white  rounded-lg font-semibold text-sm md:order-2'
      >
        <div className='flex gap-1 items-center justify-center'>X</div>
      </button>
      <AlbumCard album={album} />
    </div>
  )
}
