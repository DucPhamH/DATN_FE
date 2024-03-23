import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from '../../utils/auth'
import { AppContext } from '../../contexts/app.context'

export default function LoginGoogle() {
  const [params] = useSearchParams()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const user = JSON.parse(params.get('user'))
    console.log(access_token, refresh_token, user)
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(user)
    setIsAuthenticated(true)
    setProfile(user)
  }, [params, setIsAuthenticated, setProfile])
  return (
    <div className='bg-gray-100 h-screen '>
      <div className='bg-white p-6  md:mx-auto'>
        <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Đăng nhập thành công</h3>
          <p className='text-gray-600 my-2'>Hãy quay lại trang chủ</p>
          <div className='py-10 text-center'>
            <a href='/home' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
              Quay lại trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
