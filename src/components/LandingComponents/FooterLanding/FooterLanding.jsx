import { BsFacebook, BsLinkedin, BsTelegram, BsYoutube } from 'react-icons/bs'

export default function FooterLanding() {
  return (
    <footer className='relative text-black pt-8 bg-gray-300 dark:bg-footerdark_bg pb-4'>
      <div className='mx-auto px-10'>
        <div className='flex flex-wrap text-left lg:text-left'>
          <div className='w-full lg:w-6/12 px-4'>
            <h4 className='text-xl font-semibold uppercase text-red-800'>Hãy giữ liên lạc!</h4>
            <h5 className='text-lg mt-6 mb-3 dark:text-white'>
              Nếu có thắc mắc gì, liên lạc với chúng tôi qua các mạng xã hội :
            </h5>
            <div className='mt-6 lg:mb-0 mb-3 flex'>
              <div className='dark:bg-white text-xl bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsFacebook />
              </div>
              <div className='dark:bg-white text-xl bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsYoutube />
              </div>
              <div className='dark:bg-white text-xl bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsLinkedin />
              </div>
              <div className='dark:bg-white text-xl bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsTelegram />
              </div>
            </div>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='flex flex-wrap items-top mb-6'>
              <div className='w-full lg:w-6/12 px-4 ml-auto'>
                <span className='block uppercase mt-5 mb-2  text-red-800 font-semibold text-xl lg:mt-0 lg:mb-6'>
                  Địa chỉ
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href=''>
                      Địa chỉ: 158 Trương Định, Hai Bà Trưng, Hà Nội
                    </a>
                  </li>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href='/'>
                      SĐT: 0969 696 969
                    </a>
                  </li>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href='/'>
                      Đường dây nóng: 1900 969 969
                    </a>
                  </li>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href='/'>
                      Email: ducphamhong2@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className='w-full lg:w-6/12 px-4 ml-auto'>
                <span className='block uppercase  text-red-800 font-semibold text-xl mb-6'>Useful Links</span>
                <ul className='list-unstyled'>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className='w-full lg:w-6/12 px-4'>
                <span className='block uppercase  mt-5 mb-2 text-red-800 text-xl font-semibold lg:mt-0 lg:mb-6'>
                  Hướng dẫn khách hàng
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href=''>
                      Hướng dẫn sử dụng Website
                    </a>
                  </li>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href=''>
                      Hướng dẫn nấu ăn
                    </a>
                  </li>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href=''>
                      Hưỡng dẫn tương tác
                    </a>
                  </li>
                  <li>
                    <a className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white  block pb-2 ' href=''>
                      Hướng dẫn kiểm tra sức khoẻ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-8 border-black dark:border-white' />
        <div className='flex flex-wrap items-center md:justify-between justify-center'>
          <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
            <div className='text-base dark:text-white font-semibold py-1'>
              Thông tin trên Website chỉ mang tính chất tham khảo
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
