import React from 'react'
import { BsFacebook } from 'react-icons/bs'

export default function FooterLanding() {
  return (
    <footer className='relative text-black pt-8 bg-gray-300 dark:bg-footerdark_bg pb-4'>
      <div className='mx-auto px-10'>
        <div className='flex flex-wrap text-left lg:text-left'>
          <div className='w-full lg:w-6/12 px-4'>
            <h4 className='text-xl font-bold text-red-800'>Hãy giữ liên lạc!</h4>
            <h5 className='text-lg mt-6 mb-3 dark:text-white'>Liên lạc với chúng tôi qua các mạng xã hội sau :</h5>
            <div className='mt-6 lg:mb-0 mb-3 flex'>
              <div className='dark:bg-white bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsFacebook />
              </div>
              <div className='dark:bg-white bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsFacebook />
              </div>
              <div className='dark:bg-white bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsFacebook />
              </div>
              <div className='dark:bg-white bg-red-700 dark:text-black text-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4'>
                <BsFacebook />
              </div>
            </div>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='flex flex-wrap items-top mb-6'>
              <div className='w-full lg:w-4/12 px-4 ml-auto'>
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
                      href='/'
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href='/'
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href='/'
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className='w-full lg:w-4/12 px-4 ml-auto'>
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
              </div>
              <div className='w-full lg:w-4/12 px-4'>
                <span className='block uppercase  text-red-800 text-xl font-semibold mb-6'>Other Resources</span>
                <ul className='list-unstyled'>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className='dark:text-gray-300 hover:text-red-600 dark:hover:text-white font-semibold block pb-2 '
                      href=''
                    >
                      Contact Us
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
