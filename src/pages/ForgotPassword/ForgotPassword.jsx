import { Outlet } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div>
      <div className='relative overflow-hidden h-screen rounded-lg bg-cover bg-no-repeat  text-center'>
        <img
          className='bottom-0 left-0 right-0 top-0 h-screen w-screen object-cover overflow-hidden'
          src='https://studiovietnam.com/wp-content/uploads/2023/02/chup-anh-mon-an-11.jpg'
          alt='image'
          loading='lazy'
        />
        <div
          className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className='mt-20'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
