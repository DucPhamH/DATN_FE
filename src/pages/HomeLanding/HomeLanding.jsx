import healthy from '../../assets/images/healthy.png'
import { AiFillHeart } from 'react-icons/ai'
import { BiSolidCookie, BiSolidShareAlt } from 'react-icons/bi'
import HeaderLanding from '../../components/LandingComponents/HeaderLanding'
import FooterLanding from '../../components/LandingComponents/FooterLanding'
import MotionWrapper from '../../layouts/MotionWrapper'
import BannerLanding from '../../components/LandingComponents/BannerLanding'
import ButtonLanding from '../../components/LandingComponents/ButtonLanding'
export default function HomeLanding() {
  return (
    <div className='w-full h-full text-gray-900 dark:text-gray-300 bg-color-primary-light dark:bg-color-primary-dark'>
      <div className='w-full h-auto'>
        <div className='container bg-white_bg dark:bg-dark_bg min-w-full'>
          <div className='w-full h-[45rem]'>
            <HeaderLanding />
            <BannerLanding />
          </div>
        </div>
      </div>
      <section id='info'>
        <div className='py-20'>
          <div className='text-center m-auto mb-20 md:w-1/2'>
            <h1 className='font-bold text-3xl mb-4'>
              Với <span className='text-red-500'>Cook</span>Healthy
            </h1>
            <h1 className=' text-3xl font-extrabold'>Bạn có thể làm gì ?</h1>
          </div>
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
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-12 lg:gap-8 px-4 sm:px-6 lg:px-8'>
              <div className='border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer dark:hover:border-white hover:border-red-500 dark:hover:bg-color-primary hover:bg-yellow-100 ease-in duration-200'>
                <div className='bg-color-secondary inline-block rounded-2xl py-5 px-6'>
                  <div className='text-white text-4xl'>
                    <AiFillHeart />
                  </div>
                </div>
                <h3 className='text-2xl font-bold py-4'>Kiểm tra Calo</h3>
                <p className='leading-relaxed text-lg'>
                  Chúng ta sẽ biết được lượng calo mà chúng ta nạp vào hàng ngày
                </p>
              </div>
              <div className='border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer dark:hover:border-white hover:border-red-500 dark:hover:bg-color-primary hover:bg-yellow-100 ease-in duration-200'>
                <div className='bg-color-secondary inline-block rounded-2xl py-5 px-6'>
                  <div className='text-white text-4xl'>
                    <BiSolidCookie />
                  </div>
                </div>
                <h3 className='text-2xl font-bold py-4'>Học nấu ăn</h3>
                <p className='leading-relaxed text-lg'>
                  Vô vàn bài viết về những công thức nấu ăn, chế độ dinh dưỡng cho chúng ta khám phá
                </p>
              </div>
              <div className='border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer dark:hover:border-white hover:border-red-500 dark:hover:bg-color-primary hover:bg-yellow-100 ease-in duration-200'>
                <div className='bg-color-secondary inline-block rounded-2xl py-5 px-6'>
                  <div className='text-white text-4xl'>
                    <BiSolidShareAlt />
                  </div>
                </div>
                <h3 className='text-2xl font-bold py-4'>Kết nối</h3>
                <p className='leading-relaxed text-lg'>
                  Chúng ta có thể viết blog, chia sẻ với mọi người về chế độ dinh dưỡng mình đạt được và còn vô số điều
                  thú vị khác
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>
      <section id='started'>
        <div className=' py-20 dark:bg-dark_bg bg-white_bg bg-cover mb-20 relative'>
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
                <h1 className='font-semibold text-2xl  mb-4'>
                  Việc hấp thụ calo một cách khoa học sẽ khiến bạn khoẻ mạnh hơn !
                </h1>
                <p className='leading-relaxed font-medium text-xl line-clamp-2 italic mb-10'>
                  Khi chúng ta sử hữu kiến thức về dinh dưỡng, biết cách điều chỉnh lượng dinh dưỡng đi vào cơ thể thì
                  ta có thể kiểm soát cân nặng, sức khoẻ của mình một cách dễ dàng
                </p>
                <ButtonLanding
                  link={'/home'}
                  className='bg-gradient-to-r text-white from-[#ef571a] to-[#b11804]'
                  text='Bắt đầu ngay !'
                />
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>
      <section id='contact'>
        <div className='py-10 px-10'>
          <div className='text-center m-auto mb-20 md:w-1/2'>
            <h4 className='font-bold text-3xl text-red-500 mb-4'>Bạn có câu hỏi gì ?</h4>
            <h1 className='text-3xl font-extrabold'>Liên hệ với chúng tôi !</h1>
          </div>
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
            <form>
              <div className='w-full m-auto text-center md:w-2/3'>
                <div className='text-color-primary-dark grid gap-6 mb-6 md:grid-cols-2'>
                  <input
                    type='text'
                    className='dark:bg-gray-100 bg-yellow-50 border border-gray-600 text-lg rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary'
                    placeholder='Name'
                  />
                  <input
                    type='email'
                    className='dark:bg-gray-100 bg-yellow-50 border border-gray-600 text-lg rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary'
                    placeholder='Email'
                  />
                </div>
                <textarea
                  rows={6}
                  className='text-color-primary-dark dark:bg-gray-100 bg-yellow-50 border border-gray-600 text-lg rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary'
                  placeholder='Message'
                  defaultValue={''}
                />
                <ButtonLanding
                  link={'/login'}
                  className='bg-gradient-to-r mt-10 text-gray-100 from-[#ef571a] to-[#b11804]'
                  text='gửi tin nhắn'
                />
              </div>
            </form>
          </MotionWrapper>
        </div>
      </section>

      <div>
        <FooterLanding />
      </div>
    </div>
  )
}
