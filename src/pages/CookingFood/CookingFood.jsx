import FoodCard from '../../components/CardComponents/FoodCard/FoodCard'
import { BiFilter } from 'react-icons/bi'
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai'
import { MdNightlight } from 'react-icons/md'
import { PiClockAfternoonFill } from 'react-icons/pi'
import { BsFillSunFill } from 'react-icons/bs'
import { FaCloudSun, FaLightbulb } from 'react-icons/fa'
import Pagination from '../../components/GlobalComponents/Pagination'
import SearchFood from '../../components/SearchComponents/SearchFood/SearchFood'
import SearchHoliday from '../../components/SearchComponents/SearchHoliday'
import SearchRegions from '../../components/SearchComponents/SearchRegions'
import SearchCook from '../../components/SearchComponents/SearchCook'
import SearchHard from '../../components/SearchComponents/SearchHard'
import SearchTime from '../../components/SearchComponents/SearchTime'
import { FaMedal } from 'react-icons/fa'

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

export default function CookingFood() {
  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      {checkTime()}
      <div className='flex flex-wrap justify-between items-center border bg-white shadow-sm dark:shadow-orange-900 dark:bg-gray-900 border-gray-300 dark:border-gray-800 rounded-xl py-1 px-3 mt-4 mb-6 mx-3'>
        <div className='flex flex-wrap gap-3 lg:gap-4 items-center justify-center'>
          <SearchFood />
          <SearchRegions />
          <SearchCook />
          <SearchHoliday />
          <SearchHard />
          <SearchTime />
        </div>

        <div className='flex gap-3 w-full justify-end lg:w-auto text-2xl'>
          <div className='hover:text-red-400 cursor-pointer'>
            <BiFilter />
          </div>
        </div>
      </div>

      <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-2 '>
          <div className='grid xl:grid-cols-3 items-center'>
            <div className='col-span-2 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Xem 9 trên </span>
                <span className='text-red-600'>1000 </span>
                <span>công thức nấu ăn</span>
              </div>
              <div className='border-b-[3px] w-[20%] border-red-300 '></div>
            </div>
            <div className='col-span-1 mb-2 flex items-center '>
              <form className='w-[100%] relative'>
                <div className='relative'>
                  <input
                    type='search'
                    id='search_input'
                    placeholder='Tìm kiếm món ăn'
                    className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                  />
                  <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                    <AiOutlineSearch />
                  </button>
                </div>
              </form>
              <div className='hover:text-red-600 flex items-center justify-center ml-2 border bg-white p-1 rounded-lg dark:bg-slate-800 dark:border-none cursor-pointer'>
                <AiOutlineCamera size={30} />
              </div>
            </div>
          </div>

          <div className='grid gap-3 md:gap-4 mb-8 md:grid-cols-2 xl:grid-cols-3 pt-5'>
            {foodItems.map((foodItem) => {
              return <FoodCard key={foodItem.id} foodItem={foodItem} />
            })}
          </div>
          <div>
            <button className='btn w-full mb-6 text-xl bg-slate-700'>Xem thêm kết quả khác</button>
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
          <div className='mt-5 w-full border shadow-sm bg-white rounded-lg dark:bg-slate-800 dark:border-none'>
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
            <div className='w-full text-center pb-4 font-bold hover:text-red-600 cursor-pointer transition-all duration-300'>
              Top thành viên ...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
