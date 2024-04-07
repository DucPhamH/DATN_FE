import useravatar from '../../assets/images/useravatar.jpg'
import avatarbg from '../../assets/images/avatarbg.jpg'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import TabsProfile from '../../components/GlobalComponents/TabsProfile'
import UserPost from './components/UserPost'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
  const { id } = useParams()
  const [toggleState, setToggleState] = useState(0)
  const toggleTab = (index) => {
    setToggleState(index)
  }

  const getActiveClass = (index, className) => (toggleState === index ? className : '')

  //   const { data: userData } = useQuery({
  //     queryKey: ['me'],
  //     queryFn: () => {
  //       return currentAccount()
  //     }
  //   })
  //   console.log(userData)

  return (
    <div>
      <div className='h-full rounded-lg text-gray-900 dark:text-white'>
        <div className='w-full'>
          <div className='w-full h-[18rem]'>
            <div className='relative'>
              <img
                alt='avatar bg'
                src={avatarbg}
                className='w-full shadow-md rounded-lg h-[18rem] relative object-cover'
              />
              <div className='px-2 w-full md:flex md:flex-row gap-2 top-60 pb-5 absolute'>
                <img
                  className='h-40 w-40 ml-2 border border-red-200 rounded-full  object-cover relative'
                  src={useravatar}
                  alt='avatar'
                />

                <div className='w-full lg:flex mr-10 mb-8 items-end justify-between '>
                  <div className='md:mt-16 flex-col flex justify-end'>
                    <div className='px-2'>
                      <div className='text-3xl whitespace-nowrap text-gray-800 dark:text-white font-semibold'>
                        UserName
                      </div>
                      <div className='text-lg whitespace-nowrap text-gray-600 dark:text-gray-400'>@UserName</div>
                    </div>

                    <div className='py-4 flex divide-x divide-gray-400 divide-solid'>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>56</span>
                        <span className='text-gray-600 dark:text-white'> followers</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>112</span>
                        <span className='text-gray-600 dark:text-white'> following</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>27</span>
                        <span className='text-gray-600 dark:text-white'> repos</span>
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <button
                      type='button'
                      className='rounded-lg btn-sm btn flex mx-2 items-center justify-center hover:bg-red-600 bg-red-700 text-sm text-white font-medium transition-all duration-300 ease-in-out '
                    >
                      + Follow
                    </button>
                    {/* <div className='px-3 text-2xl hover:text-red-600 cursor-pointer transition-all duration-300'>
                      <ThreeDots />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[20rem] md:mt-64 lg:mt-48 dark:shadow-sm shadow-md dark:shadow-red-600 py-3 px-4'>
          {/* <NavBarProfile /> */}
          <TabsProfile toggleTab={toggleTab} getActiveClass={getActiveClass} />
        </div>
        {toggleState === 0 && <UserPost user_id={id} />}
        {toggleState === 1 && <div>Tab 2</div>}
        {toggleState === 2 && <div>Tab 3</div>}
      </div>
    </div>
  )
}
