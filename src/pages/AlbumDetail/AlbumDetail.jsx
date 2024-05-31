import { useParams } from 'react-router-dom'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { bookmarkAlbum, getAlbumForUser, getRecipesInAlbum, unbookmarkAlbum } from '../../apis/albumApi'
import Loading from '../../components/GlobalComponents/Loading'
import { FaCheckCircle } from 'react-icons/fa'
import RecipeCard from '../../components/CardComponents/RecipeCard'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { queryClient } from '../../main'
import toast from 'react-hot-toast'

export default function AlbumDetail() {
  const { id } = useParams()

  const { data, isLoading: isLoadingAlbum } = useQuery({
    queryKey: ['album-info-user', id],
    queryFn: () => {
      return getAlbumForUser(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })

  const album = data?.data.result[0]

  const fetchRecipes = async ({ pageParam }) => {
    return await getRecipesInAlbum({ page: pageParam, album_id: id })
  }

  const {
    data: recipeData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['recipes-list-album', { album_id: id }],
    queryFn: fetchRecipes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.result.page + 1
      if (nextPage > lastPage.data.result.totalPage) return undefined
      return nextPage
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  const bookmarkMutation = useMutation({
    mutationFn: (body) => bookmarkAlbum(body)
  })

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
              queryKey: ['album-info-user']
            })
            toast.success('Bỏ lưu thành công')
          }
        }
      )
    } else {
      bookmarkMutation.mutate(
        { album_id: album?._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['album-info-user']
            })
            toast.success('Lưu vào mục yêu thích thành công')
          }
        }
      )
    }
  }

  return (
    <div className='h-full mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        {isLoadingAlbum ? (
          <Loading />
        ) : (
          <div className=''>
            <div className=''>
              <div className='text-xl font-medium mb-2'>
                <span>Bạn đang xem album: {album.title}</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
              <div className='flex gap-5 justify-between'>
                <div className=' text-red-600 flex gap-2 dark:text-red-300 font-medium mb-2'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                    {album.category_album}
                  </span>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                    {album.recipes.length} công thức
                  </span>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                    {album.total_bookmarks} lượt lưu
                  </span>
                </div>

                <span onClick={handleBookmark}>
                  {!album?.is_bookmarked ? (
                    <button className='block btn btn-xs  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
                      <div className='flex text-xs justify-center gap-1 items-center'>
                        <BsFillBookmarkFill /> <div>Lưu</div>
                      </div>
                    </button>
                  ) : (
                    <button className='block btn btn-xs  md:inline-block md:w-auto  bg-blue-400 hover:bg-blue-500 border-none text-white rounded-lg font-semibold text-sm  md:order-2'>
                      <div className='flex text-xs justify-center gap-1 items-center'>
                        <FaCheckCircle />
                        <div>Bỏ lưu</div>
                      </div>
                    </button>
                  )}
                </span>
              </div>

              <div className=' my-4 dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
                <div className='m-1 flex  gap-2'>{album.description}</div>
              </div>

              {isLoading ? (
                <Loading />
              ) : (
                <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
                  {recipeData?.pages?.map((dataRecipes) =>
                    dataRecipes.data.result.recipes.map((recipe) => {
                      return <RecipeCard key={recipe._id} recipe={recipe} />
                    })
                  )}
                </div>
              )}
            </div>
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
        )}
      </div>
    </div>
  )
}
