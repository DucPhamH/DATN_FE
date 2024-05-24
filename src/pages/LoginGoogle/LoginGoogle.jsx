import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from '../../utils/auth'
import { AppContext } from '../../contexts/app.context'

export default function LoginGoogle() {
  const [params] = useSearchParams()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [isBanner, setIsBanner] = useState(false)
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    console.log(params.get('user'))
    const user = JSON.parse(params.get('user'))
    console.log(user)
    console.log(access_token, refresh_token, user)
    if (access_token !== null && refresh_token !== null && user !== null) {
      setAccessTokenToLS(access_token)
      setRefreshTokenToLS(refresh_token)
      setProfileToLS(user)
      setIsAuthenticated(true)
      setProfile(user)
    } else {
      setIsBanner(true)
    }
  }, [params, setIsAuthenticated, setProfile])
  return (
    <div className='h-screen bg-white'>
      <div className=' p-6  md:mx-auto'>
        {!isBanner && (
          <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
            <path
              fill='currentColor'
              d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
            ></path>
          </svg>
        )}
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            {isBanner ? 'Tài khoản của bạn đã bị khóa hoặc không có quyền truy cập trang này' : 'Đăng nhập thành công'}
          </h3>
          {isBanner ? (
            <p className='text-gray-600 my-2'>
              Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để biết thêm thông tin
            </p>
          ) : (
            <p className='text-gray-600 my-2'>Hãy quay lại trang đăng nhập</p>
          )}

          <div className='py-10 text-center'>
            {isBanner ? (
              <a href='/login' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
                Quay lại trang đăng nhập
              </a>
            ) : (
              <a href='/home' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
                Quay lại trang chủ
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
