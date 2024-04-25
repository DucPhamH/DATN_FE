import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export default function CreateItemSchedule({ workout, handleCloseCreate }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 mx-2 gap-2'>
      <div className='blog-view  max-w-3xl w-full p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary   border border-gray-200 rounded-lg shadow mx-auto'>
        <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Thêm ngày tập luyện</h2>
        <form noValidate>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-2'>
            <div className='sm:col-span-2'>
              <div className='w-full  flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Nhập ngày tập luyện
                </label>
                <DatePicker
                  className='bg-white  border-gray-300 border p-1 rounded-lg dark:bg-gray-900 dark:text-gray-300 text-gray-900'
                  minDate={workout?.start_date}
                  maxDate={workout?.end_date}
                  selected={workout?.start_date}
                  //   onChange={onStartDateStateChange}
                />
                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {/* // {errors?.start_date?.message} */}
                </div>
              </div>
            </div>
          </div>
          <div className='sm:col-span-2'>
            {/* <Input
          title='Nhập link hình ảnh'
          type='text'
          name='image'
          id='image'
          placeholder='Nhập link hình ảnh bài viết'
          register={register}
          errors={errors.image}
        /> */}
          </div>
        </form>
        <button className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'>
          <div className='flex gap-1 items-center justify-center'>Tạo bài viết</div>
        </button>
      </div>

      <div className=' blog-view  max-w-3xl w-full dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary border border-gray-200 rounded-lg shadow mx-auto'>
        <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Xem trước</h2>
        <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
          <main className=' '></main>
        </div>
      </div>
    </div>
  )
}
