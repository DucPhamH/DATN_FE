import { Link } from 'react-router-dom'
import MotionWrapper from '../../../../layouts/MotionWrapper'

export default function ChangeSuccess() {
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
      <main className='w-full  max-w-md mx-auto p-6'>
        <div className='mt-7 bg-white  rounded-xl shadow-lg  border-2 border-indigo-300'>
          <div className='p-4 sm:p-7'>
            <div className='text-center'>
              <h1 className='block text-2xl font-bold text-gray-800 '>Đổi mật khẩu thành công</h1>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                <Link to='/login' className='text-blue-600 ml-2 decoration-2 hover:underline font-medium' href='#'>
                  Quay lại đăng nhập
                </Link>
              </p>
            </div>
            <div className='mt-5'>
              <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
                <path
                  fill='currentColor'
                  d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </MotionWrapper>
  )
}
