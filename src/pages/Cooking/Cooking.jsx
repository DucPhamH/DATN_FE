import RecipeCard from '../../components/CardComponents/RecipeCard'
import { Link, useNavigate } from 'react-router-dom'
import AlbumCard from '../../components/CardComponents/AlbumCard'
import useravatar from '../../assets/images/useravatar.jpg'
import BlogCard from '../../components/CardComponents/BlogCard'
import { getBlogsForUser } from '../../apis/blogApi'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getListRecipesForUser } from '../../apis/recipeApi'
import { getListAlbumForUser } from '../../apis/albumApi'
import FoodBanner from './components/FoodBanner'
import { followUser, recommendUser } from '../../apis/userApi'
import { queryClient } from '../../main'
import Loading from '../../components/GlobalComponents/Loading'
import { FaCheckCircle } from 'react-icons/fa'

export default function Cooking() {
  const { data: blogData, isLoading: isLoadingBlog } = useQuery({
    queryKey: ['blogs-list-user', { limit: 4 }],
    queryFn: () => {
      return getBlogsForUser({ limit: 4 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data: recipesData, isLoading: isLoadingRecipe } = useQuery({
    queryKey: ['recipes-list-user', { limit: 6 }],
    queryFn: () => {
      return getListRecipesForUser({ limit: 6 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data: albumsData, isLoading: isLoadingAlbum } = useQuery({
    queryKey: ['albums-list-user', { limit: 4 }],
    queryFn: () => {
      return getListAlbumForUser({ limit: 4 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data: userData } = useQuery({
    queryKey: ['recommed-list-user'],
    queryFn: () => {
      return recommendUser()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })
  return (
    <>
      <div className='text-gray-900 dark:text-white lg:mx-3'>
        <div className='w-full mb-14 grid grid-cols-1'>
          <FoodBanner />
        </div>
      </div>

      <div className='h-full text-gray-900 dark:text-white mx-3'>
        <div className='grid mx-2 md:gap-10 grid-cols-1 xl:grid-cols-3'>
          <div className='col-span-2 '>
            <div className='grid xl:grid-cols-3 items-center'>
              <div className='col-span-2 mb-2'>
                <div className='text-xl font-medium mb-2'>
                  <span>Công thức nấu ăn mới nhất</span>
                </div>
                <div className='border-b-[3px] w-[20%] border-red-300 '></div>
              </div>
              <Link
                to='/cooking/recipe'
                className='col-span-1 xl:flex xl:justify-end dark:text-gray-300  font-medium text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-100'
              >
                <div className='flex gap-2 max-w-[14rem] border bg-gray-200 dark:bg-slate-800 dark:border-none px-2 py-1 rounded-lg text-base'>
                  Đi đến trang công thức
                  <svg
                    className='w-4'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                  >
                    <path d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </div>
              </Link>
            </div>

            {isLoadingRecipe ? (
              <Loading />
            ) : (
              <div className='grid gap-3 md:gap-4 mb-8 md:grid-cols-2 xl:grid-cols-3 pt-5'>
                {recipesData?.data?.result.recipes.map((recipe) => {
                  return <RecipeCard key={recipe._id} recipe={recipe} />
                })}
              </div>
            )}
          </div>
          <div className='col-span-1'>
            <div className=''>
              <div className='text-xl flex items-center font-medium mb-2'>
                <span className='mr-2'>Bạn có thể biết</span>
              </div>
              <div className='border-b-[3px] w-[20%] border-red-300 '></div>
            </div>
            <div className='mt-5 mb-10 w-full'>
              {userData?.data?.result.length === 0 ? null : (
                <div className='w-full mb-2 shadow  bg-white rounded-lg dark:bg-color-primary dark:border-none'>
                  <div className='p-3'>
                    {userData?.data?.result.map((user) => {
                      return <ItemUser key={user._id} user={user} />
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mx-2 mt-5 mb-14'>
          <div className='grid xl:grid-cols-3 items-center'>
            <div className='col-span-2 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Bộ sưu tập nổi bật</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
            </div>
            <Link
              to='/album'
              className='col-span-1 xl:flex xl:justify-end dark:text-gray-300  font-medium text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-100'
            >
              <div className='flex gap-2 max-w-[14rem] border bg-gray-200 dark:bg-slate-800 dark:border-none px-2 py-1 rounded-lg text-base'>
                Đi đến trang album
                <svg
                  className='w-4'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                >
                  <path d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </Link>
          </div>

          {isLoadingAlbum ? (
            <Loading />
          ) : (
            <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
              {albumsData?.data?.result.albums.map((album) => {
                return <AlbumCard key={album._id} album={album} />
              })}
            </div>
          )}
        </div>

        <div className='mx-2'>
          <div className='grid xl:grid-cols-3 items-center'>
            <div className='col-span-2 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Bài viết nổi bật</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
            </div>

            <Link
              to='/blog'
              className='col-span-1 xl:flex xl:justify-end dark:text-gray-300  font-medium text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-100'
            >
              <div className='flex gap-2 max-w-[14rem] border bg-gray-200 dark:bg-slate-800 dark:border-none px-2 py-1 rounded-lg text-base'>
                Đi đến trang blogs
                <svg
                  className='w-4'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                >
                  <path d='M14 5l7 7m0 0l-7 7m7-7H3' />
                </svg>
              </div>
            </Link>
          </div>

          {isLoadingBlog ? (
            <Loading />
          ) : (
            <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
              {blogData?.data?.result.blogs.map((blog) => {
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
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const ItemUser = ({ user }) => {
  const navigate = useNavigate()
  const followMutation = useMutation({
    mutationFn: (body) => followUser(body)
  })
  const handleFollow = () => {
    followMutation.mutate(
      { follow_id: user._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('recommed-list-user')
        }
      }
    )
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center mb-4 mt-2 gap-3'>
        <div className='avatar'>
          <div className=' rounded-full w-12 h-12'>
            <img
              className='object-cover w-12 h-12 rounded-full'
              src={user.avatar === '' ? useravatar : user.avatar}
              alt='Avatar Tailwind CSS Component'
            />
          </div>
        </div>
        <div>
          <div
            onClick={() => navigate(`/user/${user._id}`)}
            className='font-bold flex items-center gap-2 cursor-pointer hover:underline'
          >
            {user.name}
            {user.role === 1 && (
              <div className='text-blue-400 rounded-full flex justify-center items-center '>
                <FaCheckCircle size={13} />
              </div>
            )}
          </div>
          <div className=''>
            <span className='text-sm opacity-50'>@{user.user_name}</span>
          </div>
        </div>
      </div>
      <button onClick={handleFollow} className='btn btn-sm text-white hover:bg-red-900 bg-red-800'>
        {' '}
        Theo dõi
      </button>
    </div>
  )
}
