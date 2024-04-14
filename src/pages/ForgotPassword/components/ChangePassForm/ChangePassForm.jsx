import { useNavigate } from 'react-router-dom'
import InputPass from '../../../../components/InputComponents/InputPass'
import MotionWrapper from '../../../../layouts/MotionWrapper'

export default function ChangePassForm() {
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
        <div className='mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300'>
          <div className='p-4 sm:p-7'>
            <div className='text-center'>
              <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Đổi mật khẩu</h1>
            </div>
            <div className='mt-5'>
              <form>
                <div className='grid gap-y-4'>
                  <div>
                    <InputPass title='Mật khẩu mới của bạn' placeholder='Nhập mật khẩu mới của bạn' name='password' />
                    <InputPass
                      title='Xác nhận mật khẩu'
                      placeholder='Nhập lại mật khẩu của bạn'
                      name='confirm_password'
                    />
                  </div>
                  <button
                    type='submit'
                    onClick={() => navigate('/forgot-password/success')}
                    className='uppercase text-white block w-full p-2 transition-all duration-500 text-lg rounded-full bg-orange-700 hover:bg-orange-600 focus:outline-none'
                  >
                    Xác nhận
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
