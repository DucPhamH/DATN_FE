import useravatar from '../../assets/images/useravatar.jpg'
import avatarbg from '../../assets/images/avatarbg.jpg'
import { useContext, useState } from 'react'
import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query'
import TabsProfile from '../../components/GlobalComponents/TabsProfile'
import UserPost from './components/UserPost'
import { useParams } from 'react-router-dom'
import { followUser, getProfile, unfollowUser } from '../../apis/userApi'
import { queryClient } from '../../main'
import { FaCheckCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { navBarsProfileChef, navBarsProfileUser } from '../../constants/objectUi'
import UserBlog from './components/UserBlog'
import UserAlbum from './components/UserAlbum'
import UserRecipe from './components/UserRecipe'
import { AppContext } from '../../contexts/app.context'
import { SocketContext } from '../../contexts/socket.context'

export default function UserProfile() {
  const { id } = useParams()
  const { profile } = useContext(AppContext)
  const { newSocket } = useContext(SocketContext)
  const [toggleState, setToggleState] = useState(0)
  const toggleTab = (index) => {
    setToggleState(index)
  }

  const getActiveClass = (index, className) => (toggleState === index ? className : '')

  const { data: userData } = useQuery({
    queryKey: ['user-profile', id],
    queryFn: () => {
      return getProfile(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })
  console.log(userData)
  const followMutation = useMutation({
    mutationFn: (body) => followUser(body)
  })

  const unfollowMutation = useMutation({
    mutationFn: (body) => unfollowUser(body)
  })
  const handleFollow = () => {
    if (userData?.data.result[0].is_following) {
      unfollowMutation.mutate(
        { follow_id: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['user-profile']
            })
            toast.success('Đã hủy theo dõi')
          }
        }
      )
    } else {
      followMutation.mutate(
        { follow_id: id },
        {
          onSuccess: () => {
            newSocket.emit('follow', {
              content: 'Đã theo dõi bạn',
              to: id,
              name: profile.name,
              avatar: profile.avatar
            })
            queryClient.invalidateQueries({
              queryKey: ['user-profile']
            })
            toast.success('Theo dõi thành công')
          }
        }
      )
    }
  }
  return (
    <div>
      <div className='h-full rounded-lg text-gray-900 dark:text-white'>
        <div className='w-full'>
          <div className='w-full h-[18rem]'>
            <div className='relative'>
              <img
                alt='avatar bg'
                src={userData?.data.result[0].cover_avatar ? userData?.data.result[0].cover_avatar : avatarbg}
                className='w-full shadow-md rounded-lg h-[18rem] relative object-cover'
              />
              <div className='px-2 w-full md:flex md:flex-row gap-2 top-60 pb-5 absolute'>
                <img
                  className='h-40 w-40 ml-2 border border-red-200 rounded-full  object-cover relative'
                  src={userData?.data.result[0].avatar ? userData?.data.result[0].avatar : useravatar}
                  alt='avatar'
                />

                <div className='w-full lg:flex mr-10 mb-8 items-end justify-between '>
                  <div className='md:mt-16 flex-col flex justify-end'>
                    <div className='px-2'>
                      <div className='text-3xl flex items-center gap-2 whitespace-nowrap text-gray-800 dark:text-white font-semibold'>
                        {userData?.data.result[0].name}
                        {userData?.data.result[0].role === 1 && (
                          <div className='text-blue-400 rounded-full flex justify-center items-center '>
                            <FaCheckCircle size={20} />
                          </div>
                        )}
                      </div>
                      <div className='text-lg whitespace-nowrap text-gray-600 dark:text-gray-400'>
                        @{userData?.data.result[0].user_name}
                      </div>
                    </div>

                    <div className='py-4 flex divide-x divide-gray-400 divide-solid'>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>{userData?.data.result[0].followers_count}</span>
                        <span className='text-gray-600 dark:text-white'> Người theo dõi</span>
                      </span>
                      <span className='text-center px-2'>
                        <span className='font-bold text-red-700'>{userData?.data.result[0].posts_count}</span>
                        <span className='text-gray-600 dark:text-white'> Bài đăng</span>
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div onClick={handleFollow}>
                      {!userData?.data.result[0].is_following ? (
                        <button className='block btn btn-xs  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
                          <div className='flex text-xs justify-center gap-1 items-center'>+ Theo dõi</div>
                        </button>
                      ) : (
                        <button className='block btn btn-xs  md:inline-block md:w-auto  bg-blue-400 hover:bg-blue-500 border-none text-white rounded-lg font-semibold text-sm  md:order-2'>
                          <div className='flex text-xs justify-center gap-1 items-center'>
                            <FaCheckCircle /> <div>Đã theo dõi</div>
                          </div>
                        </button>
                      )}
                    </div>

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
          <TabsProfile
            toggleTab={toggleTab}
            getActiveClass={getActiveClass}
            navBarsProfile={userData?.data.result[0].role === 0 ? navBarsProfileUser : navBarsProfileChef}
          />
        </div>
        {/* {toggleState === 0 && <UserPost user_id={id} user={userData?.data.result[0]} />}
        {toggleState === 1 && <div>Tab 2</div>}
        {toggleState === 2 && <div>Tab 3</div>} */}
        {userData?.data.result[0].role === 0 ? (
          <>{toggleState === 0 && <UserPost user_id={id} user={userData?.data.result[0]} />}</>
        ) : (
          <>
            {toggleState === 0 && <UserPost user_id={id} user={userData?.data.result[0]} />}
            {toggleState === 1 && <UserRecipe user_id={id} />}
            {toggleState === 2 && <UserAlbum user_id={id} />}
            {toggleState === 3 && <UserBlog user_id={id} />}
          </>
        )}
      </div>
    </div>
  )
}
