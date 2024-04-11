import BlogCard from '../../components/CardComponents/BlogCard'

import { AiOutlineSearch } from 'react-icons/ai'

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
  },
  {
    id: 5,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 6,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 7,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },
  {
    id: 8,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  }
]

export default function Blog() {
  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-4 items-center'>
            <div className='col-span-2 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Góc chia sẻ, bí quyết nấu nướng</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
            </div>
            <div className='col-span-2 mb-2 md:flex xl:justify-end items-center '>
              <select
                defaultValue='new'
                id='sort_by'
                className='select my-2 select-sm border bg-white dark:bg-slate-800 dark:border-none'
              >
                <option value='new'>Mới nhất</option>
                <option value='a-z'>A-Z</option>
                <option value='z-a'>Z-A</option>
              </select>
              <form className='md:ml-4 w-[100%] max-w-[20rem] relative'>
                <div className='relative'>
                  <input
                    type='search'
                    id='search_input'
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
          <div className='my-2'>
            <div className='flex items-center justify-center'>
              <ul className='flex flex-wrap w-full py-2 gap-x-5 px-2'>
                <li className=''>
                  <input className='peer sr-only' defaultChecked type='radio' name='answer' id='tat-ca' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out'
                    htmlFor='tat-ca'
                  >
                    Tất cả
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' name='answer' id='chuyen-bep' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out'
                    htmlFor='chuyen-bep'
                  >
                    Chuyện bếp
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' name='answer' id='cam-nang' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out'
                    htmlFor='cam-nang'
                  >
                    Cẩm nang & mẹo vặt
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' defaultValue='yesno' name='answer' id='mon-ngon' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out '
                    htmlFor='mon-ngon'
                  >
                    Món ngon mỗi ngày
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' defaultValue='yesno' name='answer' id='lam-banh' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out '
                    htmlFor='lam-banh'
                  >
                    Làm bánh
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' defaultValue='yesno' name='answer' id='bep' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out '
                    htmlFor='bep'
                  >
                    Bếp & dụng cụ
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' defaultValue='yesno' name='answer' id='suc-khoe' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out '
                    htmlFor='suc-khoe'
                  >
                    Sức khỏe
                  </label>
                </li>
                <li>
                  <input className='peer sr-only' type='radio' defaultValue='yesno' name='answer' id='kien-thuc' />
                  <label
                    className='flex dark:bg-gray-700 my-1 dark:border-none justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-1 px-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500 transition-all duration-500 ease-in-out '
                    htmlFor='kien-thuc'
                  >
                    Kiến thức & kinh nghiệm
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5'>
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
          <div className='flex justify-center items-center'>
            <button className='btn w-full hover:bg-red-800 mb-6 text-xl bg-red-900 text-gray-200'>
              Xem thêm kết quả khác
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
