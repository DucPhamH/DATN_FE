import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MotionWrapper from '../../../layouts/MotionWrapper'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import chef from '../../../assets/images/chef.png'
import chefdark from '../../../assets/images/chefdark.png'
import ButtonLanding from '../ButtonLanding'
import { AppContext } from '../../../contexts/app.context'

export default function BannerLanding() {
  const { theme } = useContext(AppContext)
  const [text] = useTypewriter({
    words: ['xem những công thức nấu ăn !', 'thiết lập chế độ dinh dưỡng cho riêng mình !'],
    loop: {},
    typeSpeed: 50
  })
  return (
    <div id='banner' className='flex justify-between w-full flex-wrap'>
      <div className='basis-1/2 ml-20'>
        <MotionWrapper
          variants={{
            offscreen: {
              opacity: 0,
              x: 50
            },
            onscreen: {
              opacity: 1,
              x: 0
            }
          }}
        >
          <div className='content'>
            <h3 className='mb-10 text-[#ef571a] text-xs uppercase tracking-[1rem]'>Healthy and Strong</h3>
            <h1 className='mb-10 font-black text-7xl leading-9'>
              Chào mừng tới <br />
              <br /> thế giới <span className='text-red-500'>Cook</span>Healthy
            </h1>
            <p className='mb-10 tracking-[0.1rem] leading-4 italic'>
              Nơi bạn có thể {text} <Cursor />
            </p>

            <div>
              <ButtonLanding
                link={'/login'}
                className='bg-gradient-to-r text-gray-100 from-[#ef571a] to-[#b11804]'
                text='Đăng nhập ngay !'
              />
            </div>
          </div>
        </MotionWrapper>
      </div>
      <div className='basis-1/2'>
        <div>
          <img src={theme === 'dark' ? chef : chefdark} className={theme === 'dark' ? 'chef-img' : 'chefdark-img'} />
        </div>
      </div>
    </div>
  )
}
