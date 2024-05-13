import RecipeCard from '../../components/CardComponents/RecipeCard'
import { FaMedal } from 'react-icons/fa'
import FoodBanner from '../../components/FoodComponents/FoodBanner'
import { Link } from 'react-router-dom'
import AlbumCard from '../../components/CardComponents/AlbumCard'

import BlogCard from '../../components/CardComponents/BlogCard'
import { getBlogsForUser } from '../../apis/blogApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getListRecipesForUser } from '../../apis/recipeApi'
import { getListAlbumForUser } from '../../apis/albumApi'

export default function Cooking() {
  const { data: blogData } = useQuery({
    queryKey: ['blogs-list-user', { limit: 4 }],
    queryFn: () => {
      return getBlogsForUser({ limit: 4 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  const { data: recipesData } = useQuery({
    queryKey: ['recipes-list-user', { limit: 6 }],
    queryFn: () => {
      return getListRecipesForUser({ limit: 6 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  const { data: albumsData } = useQuery({
    queryKey: ['albums-list-user', { limit: 4 }],
    queryFn: () => {
      return getListAlbumForUser({ limit: 4 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
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

            <div className='grid gap-3 md:gap-4 mb-8 md:grid-cols-2 xl:grid-cols-3 pt-5'>
              {recipesData?.data?.result.recipes.map((recipe) => {
                return <RecipeCard key={recipe._id} recipe={recipe} />
              })}
            </div>
          </div>
          <div className='col-span-1'>
            <div className=''>
              <div className='text-xl flex items-center font-medium mb-2'>
                <span className='mr-2'>Top BXH thành viên</span>
                <FaMedal className='text-yellow-500' />
              </div>
              <div className='border-b-[3px] w-[20%] border-red-300 '></div>
            </div>
            <div className='mt-5 mb-10 w-full border shadow-sm shadow-red-200 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
              <div className='p-3'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mb-4 mt-2 gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className=''>
                        <span className='text-sm opacity-50'>100 bài viết | </span>
                        <span className='text-sm opacity-50'>100 người follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='border h-8 w-8 rounded-lg shadow-md bg-yellow-200 dark:text-black font-bold flex justify-center items-center'>
                    1
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mb-4 mt-2 gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className=''>
                        <span className='text-sm opacity-50'>100 bài viết | </span>
                        <span className='text-sm opacity-50'>100 người follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='border h-8 w-8 rounded-lg shadow-md bg-red-500 dark:text-black font-bold flex justify-center items-center'>
                    2
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mb-4 mt-2 gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className=''>
                        <span className='text-sm opacity-50'>100 bài viết | </span>
                        <span className='text-sm opacity-50'>100 người follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='border h-8 w-8 rounded-lg shadow-md bg-blue-400 dark:text-black font-bold flex justify-center items-center'>
                    3
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mb-4 mt-2 gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className=''>
                        <span className='text-sm opacity-50'>100 bài viết | </span>
                        <span className='text-sm opacity-50'>100 người follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='border h-8 w-8 rounded-lg shadow-md bg-green-500 dark:text-black font-bold flex justify-center items-center'>
                    4
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mb-4 mt-2 gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className=''>
                        <span className='text-sm opacity-50'>100 bài viết | </span>
                        <span className='text-sm opacity-50'>100 người follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='border h-8 w-8 rounded-lg shadow-md bg-green-500 dark:text-black font-bold flex justify-center items-center'>
                    5
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mb-4 mt-2 gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img
                          src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className=''>
                        <span className='text-sm opacity-50'>100 bài viết | </span>
                        <span className='text-sm opacity-50'>100 người follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='border h-8 w-8 rounded-lg shadow-md bg-green-500 dark:text-black font-bold flex justify-center items-center'>
                    6
                  </div>
                </div>
              </div>
              <div className='w-full text-center pb-4 font-medium dark:text-gray-300 text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-300'>
                Top thành viên ...
              </div>
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

          <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
            {albumsData?.data?.result.albums.map((album) => {
              return <AlbumCard key={album._id} album={album} />
            })}
          </div>
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

          <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
            {blogData?.data?.result.blogs.map((blog) => {
              return (
                <BlogCard
                  key={blog._id}
                  blogItem={blog}
                  imgClass='lg:h-[25vh] rounded-t-xl scale-100 overflow-hidden'
                  dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                  titleClass=' font-bold transition-all cursor-pointer line-clamp-2 hover:text-color-secondary'
                  descriptionClass='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'
                  linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
