import FoodCard from '../../components/CardComponents/FoodCard/FoodCard'
import React from 'react'
import { FaMedal } from 'react-icons/fa'
import FoodBanner from '../../components/FoodComponents/FoodBanner'
import { Link } from 'react-router-dom'
import AlbumCard from '../../components/CardComponents/AlbumCard'

import BlogCard from '../../components/CardComponents/BlogCard'

const foodItems = [
  {
    id: 1,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 2,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 3,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 4,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 5,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 6,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  }
]

const albumItems = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  }
]

const blogItems = [
  {
    id: 1,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 2,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 3,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },
  {
    id: 4,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  }
]
export default function Cooking() {
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
                  <span>Tổng </span>
                  <span className='text-red-600'>1000 </span>
                  <span>công thức nấu ăn</span>
                </div>
                <div className='border-b-[3px] w-[20%] border-red-300 '></div>
              </div>
              <Link
                to='/cooking/cooking-food'
                className='col-span-1 xl:flex xl:justify-end dark:text-gray-300 text-lg font-medium text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-100'
              >
                Xem thêm ...
              </Link>
            </div>

            <div className='grid gap-3 md:gap-4 mb-8 md:grid-cols-2 xl:grid-cols-3 pt-5'>
              {foodItems.map((foodItem) => {
                return <FoodCard key={foodItem.id} foodItem={foodItem} />
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
              to='/cooking/cooking-food'
              className='col-span-1 xl:flex xl:justify-end dark:text-gray-300 text-lg font-medium text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-100'
            >
              Xem thêm ...
            </Link>
          </div>

          <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
            {albumItems.map((albumItem) => {
              return <AlbumCard key={albumItem.id} />
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
              className='col-span-1 xl:flex xl:justify-end dark:text-gray-300 text-lg font-medium text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-100'
            >
              Xem thêm ...
            </Link>
          </div>

          <div className='grid gap-3 md:gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
            {blogItems.map((blogItem) => {
              return (
                <BlogCard
                  key={blogItem.id}
                  blogItem={blogItem}
                  imgClass='lg:h-[25vh] rounded-t-xl scale-100 overflow-hidden'
                  dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                  titleClass=' font-bold hover:text-color-secondary'
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
