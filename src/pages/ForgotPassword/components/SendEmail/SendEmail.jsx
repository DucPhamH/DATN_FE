import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../../components/InputComponents/Input'
import MotionWrapper from '../../../../layouts/MotionWrapper'

export default function SendEmail() {
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
      <main className='w-full  max-w-md mx-auto p-6'>
        <div className='mt-7 bg-white  rounded-xl shadow-lg  border-2 border-indigo-300'>
          <div className='p-4 sm:p-7'>
            <div className='text-center'>
              <h1 className='block text-2xl font-bold text-gray-800 '>Quên mật khẩu ?</h1>
              <p className='mt-2 text-sm text-gray-600 '>
                Bạn nhớ mật khẩu ?
                <Link to='/login' className='text-blue-600 ml-2 decoration-2 hover:underline font-medium' href='#'>
                  Đăng nhập ở đây
                </Link>
              </p>
            </div>
            <div className='mt-5'>
              <form>
                <div className='grid gap-y-4'>
                  <div>
                    <Input
                      title='Email của bạn'
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Nhập email của bạn'
                      className='block bg-white  w-full placeholder:text-sm px-3 py-2  text-black  text-lg border border-gray-300 rounded-lg'
                      classNameLabel='text-gray-400 lg:text-red-900 text-sm font-medium mb-1  text-left'
                    />
                  </div>
                  <button
                    onClick={() => navigate('/forgot-password/confirm-otp')}
                    type='submit'
                    className='uppercase text-white block w-full p-2 transition-all duration-500 text-lg rounded-full bg-orange-700 hover:bg-orange-600 focus:outline-none'
                  >
                    Gửi email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </MotionWrapper>
  )
}
