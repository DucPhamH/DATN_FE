import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import medal from '../../../assets/images/medal.png'
import medal2 from '../../../assets/images/medal2.png'
import medal3 from '../../../assets/images/medal3.png'
import { FaMedal } from 'react-icons/fa'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'none'
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'none'
      }}
      onClick={onClick}
    />
  )
}

export default function FoodBanner() {
  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dotsClass: 'slick-dots'
  }
  return (
    <div className='bg-gray'>
      <Slider {...settings}>
        <div className='h-[22rem]'>
          <div className='h-full border dark:border-none shadow shadow-red-400 rounded-lg w-full overflow-hidden'>
            <img
              className='h-full w-full relative object-cover'
              src='https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg'
              alt=''
            />
            <div className='w-full h-full bg-black opacity-50 absolute border dark:border-none shadow shadow-red-400 rounded-lg top-0 left-0' />
            <div className='absolute z-10 lg:bottom-10 md:bottom-8 bottom-0 lg:px-7 md:px-10 px-4 py-4'>
              <p className='lg:text-4xl mb-2 md:text-2xl text-2xl font-semibold leading-9 text-white'>
                Top 3 công thức hot ở <span className='text-red-500'>Cook</span>Healthy
              </p>
              <p className='lg:text-2xl flex items-center mb-2 md:text-2xl text-2xl pt-5 font-normal leading-9 text-white'>
                <FaMedal className='text-yellow-500 mr-3' /> Bún bò huế
              </p>
              <button className='btn font-blod leading-none text-gray-800 bg-white hover:bg-slate-300 px-2 py-0.5 mt-3 text-center'>
                Xem ngay
              </button>
            </div>
            <div className='absolute z-10 top-0 right-0 p-3'>
              <img src={medal} className='w-12 md:w-20 shadow-lg' alt='' />
            </div>
          </div>
        </div>
        <div className='h-[22rem]'>
          <div className='h-full border dark:border-none shadow shadow-red-400 rounded-lg w-full overflow-hidden'>
            <img
              className='h-full w-full object-cover'
              src='https://colombo.vn/upload/20922/20180814/Table-1.jpg'
              alt=''
            />
            <div className='w-full h-full bg-black opacity-50 absolute border dark:border-none shadow shadow-red-400 rounded-lg top-0 left-0' />
            <div className='absolute z-10 lg:bottom-10 md:bottom-8 bottom-0 lg:px-7 md:px-10 px-4 py-4'>
              <p className='lg:text-4xl mb-2 md:text-2xl text-2xl font-semibold leading-9 text-white'>
                Top 3 công thức hot ở <span className='text-red-500'>Cook</span>Healthy
              </p>
              <p className='lg:text-2xl flex items-center mb-2 md:text-2xl text-2xl pt-5 font-normal leading-9 text-white'>
                <FaMedal className='text-yellow-500 mr-3' /> Phở bò
              </p>
              <button className='btn font-blod leading-none text-gray-800 bg-white hover:bg-slate-300 px-2 py-0.5 mt-3 text-center'>
                Xem ngay
              </button>
            </div>
            <div className='absolute z-10 top-0 right-0 p-3'>
              <img src={medal2} className='w-12 md:w-20 shadow-lg' alt='' />
            </div>
          </div>
        </div>
        <div className='h-[22rem]'>
          <div className='h-full border dark:border-none shadow shadow-red-400 rounded-lg w-full overflow-hidden'>
            <img
              className='h-full w-full object-cover'
              src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg'
              alt=''
            />
            <div className='w-full h-full bg-black opacity-50 absolute border dark:border-none shadow shadow-red-400 rounded-lg top-0 left-0' />
            <div className='absolute z-10 lg:bottom-10 md:bottom-8 bottom-0 lg:px-7 md:px-10 px-4 py-4'>
              <p className='lg:text-4xl mb-2 md:text-2xl text-2xl font-semibold leading-9 text-white'>
                Top 3 công thức hot ở <span className='text-red-500'>Cook</span>Healthy
              </p>
              <p className='lg:text-2xl flex items-center mb-2 md:text-2xl text-2xl pt-5 font-normal leading-9 text-white'>
                <FaMedal className='text-yellow-500 mr-3' /> Bún đậu
              </p>
              <button className='btn font-blod leading-none text-gray-800 bg-white hover:bg-slate-300 px-2 py-0.5 mt-3 text-center'>
                Xem ngay
              </button>
            </div>
            <div className='absolute z-10 top-0 right-0 p-3'>
              <img src={medal3} className='w-12 md:w-20 shadow-lg' alt='' />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}
