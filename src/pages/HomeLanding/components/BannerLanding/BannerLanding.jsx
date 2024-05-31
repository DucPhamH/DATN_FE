import { useContext } from 'react'
import MotionWrapper from '../../../../layouts/MotionWrapper'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import chef from '../../../../assets/images/chef.png'
import chefdark from '../../../../assets/images/chefdark.png'
import ButtonLanding from '../ButtonLanding'
import { AppContext } from '../../../../contexts/app.context'

export default function BannerLanding() {
  const { theme } = useContext(AppContext)
  const [text] = useTypewriter({
    words: ['xem những công thức nấu ăn !', 'thiết lập chế độ dinh dưỡng cho riêng mình !'],
    loop: {},
    typeSpeed: 50
  })
  return (
    <div id='banner' className='flex justify-center items-center lg:flex lg:justify-between w-full flex-wrap'>
      <div className='lg:basis-1/2 lg:ml-20'>
        <MotionWrapper
          variants={{
            offscreen: {
              opacity: 0,
              y: 20
            },
            onscreen: {
              opacity: 1,
              y: 0
            }
          }}
        >
          <div className='content flex flex-col mx-4 md:mx-0'>
            <h3 className=' mt-10 md:mt-0 mb-10 text-[#ef571a] text-xs text-center md:text-left uppercase tracking-[0.5rem] md:tracking-[1rem]'>
              Healthy and Strong
            </h3>
            <h1 className='mb-10 font-Montserrat font-black text-5xl text-center md:text-left md:text-7xl md:leading-9'>
              Chào mừng tới <br />
              <br className='md:block hidden' /> thế giới <span className='text-red-500'>Cook</span>Healthy
            </h1>
            <p className='mb-10 tracking-[0.1rem] leading-4 italic'>
              Nơi bạn có thể {text} <Cursor />
            </p>

            <div className='flex justify-center items-center md:justify-start'>
              <ButtonLanding
                link={'/login'}
                className='bg-gradient-to-r inline-block text-gray-100 from-[#ef571a] to-[#b11804]'
                text='Đăng nhập ngay !'
              />
            </div>
          </div>
        </MotionWrapper>
      </div>
      <div className='lg:basis-1/2'>
        <div className='hidden lg:block'>
          <img src={theme === 'dark' ? chef : chefdark} className={theme === 'dark' ? 'chef-img' : 'chefdark-img'} />
        </div>
      </div>
    </div>
  )
}
