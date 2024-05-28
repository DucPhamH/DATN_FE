import { useQuery } from '@tanstack/react-query'
import RecipeCard from '../../components/CardComponents/RecipeCard'
import Loading from '../../components/GlobalComponents/Loading'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { searchAll } from '../../apis/searchApi'
import PostCard from '../../components/CardComponents/PostCard'
import { useNavigate } from 'react-router-dom'
import useravatar from '../../assets/images/useravatar.jpg'

export default function Search() {
  const { searchQuery } = useContext(AppContext)

  console.log(searchQuery)
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: [
      'search-all',
      {
        search: searchQuery.search || ''
      }
    ],
    queryFn: () => {
      return searchAll({
        search: searchQuery.search || ''
      })
    }
  })

  if (
    data?.data?.result.recipes.length === 0 &&
    data?.data?.result.users.length === 0 &&
    data?.data?.result.posts.length === 0
  ) {
    return (
      <div className='w-full p-10 text-center font-bold text-red-600 dark:text-pink-700 h-[100rem]'>
        Không tìm thấy kết quả nào phù hợp
      </div>
    )
  }

  console.log(data)
  return (
    <div className='h-full text-gray-900 dark:text-white py-4'>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <>
            <div className='mx-3'>
              {data?.data?.result.recipes.length === 0 ? null : (
                <div>
                  <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
                    <div className='col-span-3 '>
                      <div className=''>
                        <div className='mb-2'>
                          <div className='text-xl font-medium mb-2'>
                            <span>Tìm thấy {data?.data?.result.recipes.length} bài viết nấu ăn</span>
                          </div>
                          <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
                    {data?.data?.result.recipes.map((recipe) => {
                      return <RecipeCard key={recipe._id} recipe={recipe} />
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className='mx-3'>
              {data?.data?.result.users.length === 0 ? null : (
                <div>
                  <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
                    <div className='col-span-3 '>
                      <div className=''>
                        <div className='mb-2'>
                          <div className='text-xl font-medium mb-2'>
                            <span>Tìm thấy {data?.data?.result.users.length} người sử dụng</span>
                          </div>
                          <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
                    {data?.data?.result.users.map((user) => {
                      return (
                        <div
                          key={user._id}
                          className='w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
                        >
                          <div className='flex flex-col pt-5 items-center pb-5'>
                            <img
                              className='w-24 h-24 mb-3 object-cover rounded-full shadow-lg'
                              src={user.avatar === '' ? useravatar : user.avatar}
                              alt='avatar'
                            />
                            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{user.name}</h5>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>@{user?.user_name}</span>
                            <div className='flex mt-4 md:mt-6'>
                              <button
                                onClick={() => navigate(`/user/${user._id}`)}
                                className='btn btn-sm text-white hover:bg-red-900 bg-red-800'
                              >
                                Đến trang cá nhân
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className='xl:mx-3'>
              {data?.data?.result.posts.length === 0 ? null : (
                <div>
                  <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
                    <div className='col-span-3 '>
                      <div className=''>
                        <div className='mb-2'>
                          <div className='text-xl font-medium mb-2'>
                            <span>Tìm thấy {data?.data?.result.posts.length} bài viết diễn đàn</span>
                          </div>
                          <div className='border-b-[3px] mb-8 w-[10%] border-red-300 '></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='grid xl:grid-cols-3 gap-10'>
                    <div className='col-span-2'>
                      {data?.data.result.posts.map((post) => {
                        return <PostCard key={post._id} data={post} />
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  )
}

// const AlbumItem = ({ album }) => {
//   const unbookmarkMutation = useMutation({
//     mutationFn: (body) => unbookmarkAlbum(body)
//   })

//   const handleBookmark = () => {
//     if (album?.is_bookmarked) {
//       unbookmarkMutation.mutate(
//         { album_id: album?._id },
//         {
//           onSuccess: () => {
//             queryClient.invalidateQueries('bookmark')
//             toast.success('Bỏ lưu thành công')
//           }
//         }
//       )
//     }
//   }

//   return (
//     <div className='relative h-full w-full'>
//       <button
//         onClick={handleBookmark}
//         className='block z-50 absolute top-0 right-0 m-2 btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-gray-200 hover:text-white  rounded-lg font-semibold text-sm md:order-2'
//       >
//         <div className='flex gap-1 items-center justify-center'>X</div>
//       </button>
//       <AlbumCard album={album} />
//     </div>
//   )
// }
