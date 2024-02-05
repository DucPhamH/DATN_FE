import FoodCard from '../../components/CardComponents/FoodCard/FoodCard'
import SearchCard from '../../components/CardComponents/SearchCard/SearchCard'
import { BiFilter } from 'react-icons/bi'
import { AiOutlineCamera } from 'react-icons/ai'
import { MdNightlight } from 'react-icons/md'
import { PiClockAfternoonFill } from 'react-icons/pi'
import { BsFillSunFill } from 'react-icons/bs'
import { FaCloudSun, FaLightbulb } from 'react-icons/fa'
import Pagination from '../../components/GlobalComponents/Pagination'
import SearchFood from '../../components/SearchComponents/SearchFood/SearchFood'
import SearchHoliday from '../../components/SearchComponents/SearchHoliday'
import SearchRegions from '../../components/SearchComponents/SearchRegions'
import SearchCook from '../../components/SearchComponents/SearchCook'
import SearchHard from '../../components/SearchComponents/SearchHard/SearchHard'
import SearchTime from '../../components/SearchComponents/SearchTime'

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
  },
  {
    id: 7,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  },
  {
    id: 8,
    title: 'Phở bò bát đá',
    time: '25 phút',
    date: '23/10/2023',
    like: '13k lượt thích',
    img: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    author: 'Godon Ramsey'
  }
]

// const searchItems = [
//   {
//     id: 1,
//     title: 'Món ăn',
//     color: 'text-orange-600',
//     radio_search: [
//       {
//         id: 'Mon-man',
//         title: 'Món mặn'
//       },
//       {
//         id: 'Mon-chay',
//         title: 'Món chay'
//       },
//       {
//         id: 'Mon-trang-mieng',
//         title: 'Món tráng miệng'
//       },
//       {
//         id: 'Do-uong',
//         title: 'Đồ uống'
//       },
//       {
//         id: 'Do-an-vat',
//         title: 'Đồ ăn vặt'
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: 'Vùng miền',
//     color: 'text-green-700',
//     radio_search: [
//       {
//         id: 'mien-bac',
//         title: 'Miền Bắc'
//       },
//       {
//         id: 'mien-trung',
//         title: 'Miền Trung'
//       },
//       {
//         id: 'mien-nam',
//         title: 'Miền Nam'
//       },
//       {
//         id: 'mon_a',
//         title: 'Món Á'
//       },
//       {
//         id: 'mon_au',
//         title: 'Món Âu'
//       }
//     ]
//   },
//   {
//     id: 3,
//     title: 'Cách nấu',
//     color: 'text-blue-500',
//     radio_search: [
//       {
//         id: 'lau',
//         title: 'Lẩu'
//       },
//       {
//         id: 'xao',
//         title: 'Xào'
//       },
//       {
//         id: 'nuong',
//         title: 'Nướng'
//       },
//       {
//         id: 'hap',
//         title: 'Hấp'
//       },
//       {
//         id: 'chien',
//         title: 'Chiên'
//       },
//       {
//         id: 'kho',
//         title: 'Kho'
//       },
//       {
//         id: 'ham',
//         title: 'Hầm'
//       },
//       {
//         id: 'goi',
//         title: 'Gỏi/Trộn'
//       },
//       {
//         id: 'canh_sup',
//         title: 'Canh/Súp'
//       },
//       {
//         id: 'quay',
//         title: 'Quay'
//       },
//       {
//         id: 'om_rim',
//         title: 'Om/Rim'
//       },
//       {
//         id: 'khac',
//         title: 'Khác'
//       }
//     ]
//   },
//   {
//     id: 4,
//     title: 'Dịp lễ',
//     color: 'text-teal-600',
//     radio_search: [
//       {
//         id: 'buoi_sang',
//         title: 'Buổi sáng'
//       },
//       {
//         id: 'buoi_trua',
//         title: 'Buổi trưa'
//       },
//       {
//         id: 'buoi_toi',
//         title: 'Buổi tối'
//       },
//       {
//         id: 'le_hoi',
//         title: 'Lễ hội'
//       },
//       {
//         id: 'tet',
//         title: 'Tết'
//       },
//       {
//         id: 'sinh_nhat',
//         title: 'Sinh nhật'
//       },
//       {
//         id: 'giang_sinh',
//         title: 'Giáng sinh'
//       },
//       {
//         id: 'khac',
//         title: 'Khác'
//       }
//     ]
//   },
//   {
//     id: 5,
//     title: 'Khác',
//     color: 'text-pink-500',
//     radio_search: [
//       {
//         id: 'thoi_gian_cao',
//         title: 'Thời gian nấu ăn nhiều'
//       },
//       {
//         id: 'thoi_gian_thap',
//         title: 'Thời gian nấu ăn ít'
//       },
//       {
//         id: 'nguoi_like_nhieu',
//         title: 'Like nhiều nhất'
//       },
//       {
//         id: 'moi_nhat',
//         title: 'Mới nhất'
//       }
//     ]
//   }
// ]

const checkTime = () => {
  var day = new Date()
  var hr = day.getHours()
  if (hr >= 0 && hr < 12) {
    return (
      <>
        <h2 className='text-xl font-semibold mx-3 text-red-700 dark:text-gray-300'>
          <div className='flex gap-3 items-center mb-1'>
            Chào buổi sáng, Đức
            <FaCloudSun />
          </div>
        </h2>
        <div className='mx-3 mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 italic tracking-[0.05rem] text-gray-800 dark:text-gray-400 font-normal'>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Bữa sáng khởi động quá trình trao đổi chất, giúp đốt cháy calo, nó cũng cung cấp năng lượng cần để hoàn
            thành công việc. Đó là một trong những lý do tại sao bữa sáng được xem là bữa ăn quan trọng nhất trong ngày.
          </div>
        </div>
      </>
    )
  } else if (hr == 12) {
    return (
      <>
        <h2 className='text-xl font-semibold mx-3 text-red-700 dark:text-gray-300'>
          <div className='flex gap-3 items-center mb-1'>
            Chào buổi trưa, Đức
            <BsFillSunFill />
          </div>
        </h2>
        <div className='mx-3 mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 italic tracking-[0.05rem] text-gray-800 dark:text-gray-400 font-normal'>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Nghiên cứu cho thấy, bữa trưa tốt nhất là nên được ăn sau không quá 4 tiếng so với bữa sáng. Bữa trưa chiếm
            đến 40% khẩu phần ăn trong ngày, cung cấp nhiều nguồn năng lượng nhất, nên dù bạn đã ăn bữa sáng thật no thì
            cũng không thể bỏ qua một bữa trưa để nạp năng lượng cho ngày dài còn lại.
          </div>
        </div>
      </>
    )
  } else if (hr >= 12 && hr <= 17) {
    return (
      <>
        <h2 className='text-xl font-semibold mx-3 text-red-700 dark:text-gray-300'>
          <div className='flex gap-3 items-center mb-1'>
            Chào buổi chiều, Đức
            <PiClockAfternoonFill />
          </div>
        </h2>
        <div className='mx-3 mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 italic tracking-[0.05rem] text-gray-800 dark:text-gray-400 font-normal'>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Vào thời gian này, năng lượng được cung cấp từ thực phẩm của bữa trưa đã tiêu hao gần hết. Bổ sung dinh
            dưỡng bằng 1 bữa ăn nhẹ buổi chiều sẽ giúp bạn làm việc có hiệu quả hơn vào cuối giờ chiều.
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h2 className='text-xl font-semibold mx-3 text-red-700 dark:text-gray-300'>
          <div className='flex gap-3 items-center mb-1'>
            Chào buổi tối, Đức
            <MdNightlight />
          </div>
        </h2>
        <div className='mx-3 mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 italic tracking-[0.05rem] text-gray-800 dark:text-gray-400 font-normal'>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Khi ăn tối sớm, dạ dày của bạn sẽ có nhiều thời gian hơn để tiêu hóa thức ăn. Quá trình xử lý thức ăn kéo
            dài sẽ giúp các dưỡng chất được hấp thu vào cơ thể tốt hơn. Các chuyên gia dinh dưỡng khuyên rằng thời gian
            lý tưởng nhất cho bữa tối là trước 19h.
          </div>
        </div>
      </>
    )
  }
}

export default function Cooking() {
  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      {checkTime()}
      <div className='flex flex-wrap justify-between items-center border bg-white shadow-sm dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-xl py-1 px-3 mt-4 mb-4 mx-3'>
        <div className='flex flex-wrap gap-3 lg:gap-4 items-center justify-center'>
          {/* {searchItems.map((searchItem) => {
            return <SearchCard key={searchItem.id} searchItem={searchItem} />
          })} */}
          <SearchFood />
          <SearchRegions />
          <SearchCook />
          <SearchHoliday />
          <SearchHard />
          <SearchTime />
        </div>

        <div className='flex gap-3 w-full justify-end lg:w-auto text-2xl'>
          <div className='hover:text-red-400 cursor-pointer'>
            <AiOutlineCamera />
          </div>
          <div className='hover:text-red-400 cursor-pointer'>
            <BiFilter />
          </div>
        </div>
      </div>
      <div className='flex mx-3 justify-end '>
        <div className='flex gap-5 justify-center items-center'>
          <div className=' font-medium text-gray-700 dark:text-gray-400'>Page 1/10</div>
          <div className='flex'>
            <button className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 5H1m0 0 4 4M1 5l4-4'
                />
              </svg>
            </button>
            <button className='flex items-center bg-white shadow-sm border dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-md justify-center px-3 text-sm py-2'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className='grid gap-5 md:gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 pt-5 mx-2'>
          {foodItems.map((foodItem) => {
            return <FoodCard key={foodItem.id} foodItem={foodItem} />
          })}
        </div>
      </div>

      <Pagination queryConfig={3} pageSize={3} url='/' />
    </div>
  )
}
