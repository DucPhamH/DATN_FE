import { useNavigate } from 'react-router-dom'
import MotionWrapper from '../../../../layouts/MotionWrapper'

export default function InputConfirm() {
  const navigate = useNavigate()
  return (
    <MotionWrapper
      variants={{
        offscreen: {
          opacity: 0,
          y: 30
        },
        onscreen: {
          opacity: 1,
          y: 0
        }
      }}
    >
      <div className='flex justify-center'>
        <form className='px-10 rounded-lg shadow-md py-10 bg-white  mt-[5rem]'>
          <div className='text-center mb-5'>
            <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Xác nhận OTP</h1>
          </div>
          <div className='flex justify-center  gap-2 mb-6'>
            <input
              className='w-12 h-12 text-center bg-gray-200 text-black border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500'
              type='text'
              maxLength={1}
              pattern='[0-9]'
              inputMode='numeric'
              autoComplete='one-time-code'
              required
            />
            <input
              className='w-12 h-12 text-center bg-gray-200 text-black border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500'
              type='text'
              maxLength={1}
              pattern='[0-9]'
              inputMode='numeric'
              autoComplete='one-time-code'
              required
            />
            <input
              className='w-12 h-12 text-center bg-gray-200 text-black border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500'
              type='text'
              maxLength={1}
              pattern='[0-9]'
              inputMode='numeric'
              autoComplete='one-time-code'
              required
            />
            <input
              className='w-12 h-12 text-center bg-gray-200 text-black border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500'
              type='text'
              maxLength={1}
              pattern='[0-9]'
              inputMode='numeric'
              autoComplete='one-time-code'
              required
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              onClick={() => navigate('/forgot-password/change-password')}
              className='bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg btn '
              type='button'
            >
              Xác nhận
            </button>
            <a
              className='inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4'
              href='#'
            >
              Gửi lại mã
            </a>
          </div>
        </form>
      </div>
    </MotionWrapper>
  )
}
