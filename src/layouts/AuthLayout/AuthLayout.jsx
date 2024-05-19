import { memo } from 'react'
import { Link } from 'react-router-dom'
import MotionWrapper from '../MotionWrapper'

function AuthLayoutInner({ children }) {
  return (
    <section className='min-h-screen flex items-stretch text-white '>
      <div className='lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center bg-dark_bg'>
        <div className='w-full px-24 z-10'>
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
            <Link to='/' className='text-6xl font-bold text-left tracking-wide'>
              Chào mừng đến với <span className='text-red-500'>Cook</span>Healthy
            </Link>
            <p className='text-3xl italic my-4'>Hãy chú ý đến sức khoẻ của mình nhé !</p>
          </MotionWrapper>
        </div>
      </div>
      <div className='lg:w-1/2 w-full flex bg-red-800 items-center justify-center text-center md:px-16 px-0 z-0'>
        <div className='absolute lg:hidden z-10 inset-0 bg-no-repeat bg-cover items-center back_ground_register'>
          <div className='absolute bg-black opacity-60 inset-0 z-0' />
        </div>
        <div className='w-full py-6 z-20'>{children}</div>
      </div>
    </section>
  )
}

const AuthLayout = memo(AuthLayoutInner)

export default AuthLayout
