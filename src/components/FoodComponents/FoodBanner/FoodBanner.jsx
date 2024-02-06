import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import background from '../../../assets/images/background.png'

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
            <img
              className='top-0 border dark:border-none shadow shadow-red-400 rounded-lg left-0 object-fill w-full h-[22rem] absolute'
              src={background}
              alt=''
            />
          </div>
        </div>
        <div className='h-[22rem]'>
          <div className='h-full border dark:border-none shadow shadow-red-400 rounded-lg w-full overflow-hidden'>
            <img
              className='h-full w-full object-cover'
              src='https://colombo.vn/upload/20922/20180814/Table-1.jpg'
              alt=''
            />
          </div>
        </div>
        <div className='h-[22rem]'>
          <div className='h-full border dark:border-none shadow shadow-red-400 rounded-lg w-full overflow-hidden'>
            <img
              className='h-full w-full object-cover'
              src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg'
              alt=''
            />
          </div>
        </div>
      </Slider>
    </div>
  )
}
