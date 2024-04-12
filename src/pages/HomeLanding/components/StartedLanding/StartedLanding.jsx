import React from 'react'
import ButtonLanding from '../ButtonLanding'
import MotionWrapper from '../../../../layouts/MotionWrapper'
import healthy from '../../../../assets/images/healthy.png'
export default function StartedLanding() {
  return (
    <section id='started'>
      <div className=' py-20 dark:bg-dark_bg bg-white_bg bg-cover mb-10 relative'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <div className='mb-12 w-1/2 ml-20 healthy-img md:w-1/3'>
            <img src={healthy} alt='healthy' />
          </div>

          <div className='text-center md:text-left md:w-1/2 md:ml-20 md:mr-5'>
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
              <h4 className='font-bold text-color-secondary text-4xl mb-4'>Có thể bạn chưa biết :</h4>
              <h1 className='font-semibold text-2xl mb-4'>
                Việc hấp thụ calo một cách khoa học sẽ khiến bạn khoẻ mạnh hơn !
              </h1>
              <p className='leading-relaxed text-xl line-clamp-2 italic mb-10'>
                Khi chúng ta sở hữu kiến thức về dinh dưỡng, biết cách điều chỉnh lượng dinh dưỡng đi vào cơ thể thì ta
                có thể kiểm soát cân nặng, sức khoẻ của mình một cách dễ dàng
              </p>
              <ButtonLanding
                link={'/home'}
                className='bg-gradient-to-r inline-block text-white from-[#ef571a] to-[#b11804]'
                text='Bắt đầu ngay !'
              />
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
