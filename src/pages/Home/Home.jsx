import { BsFillImageFill, BsFillSunFill } from 'react-icons/bs'
import useravatar from '../../assets/images/useravatar.jpg'
import { MdNightlight } from 'react-icons/md'
import { FaCheckCircle, FaCloudSun } from 'react-icons/fa'
import { PiClockAfternoonFill } from 'react-icons/pi'
import PostCard from '../../components/CardComponents/PostCard'
import BlogCard from '../../components/CardComponents/BlogCard'
import { useContext, useEffect, useState } from 'react'
import ModalUploadPost from './components/ModalUploadPost'
import { getNewsFeed } from '../../apis/postApi'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import LoadingHome from './components/LoadingHome'
import { AppContext } from '../../contexts/app.context'
import Loading from '../../components/GlobalComponents/Loading'
import { getBlogsForUser } from '../../apis/blogApi'
import { followUser, recommendUser } from '../../apis/userApi'
import { queryClient } from '../../main'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Home() {
  const { profile } = useContext(AppContext)
  const [modalPost, setModalPost] = useState(false)

  const openModalPost = () => {
    setModalPost(true)
  }

  const closeModalPost = () => {
    setModalPost(false)
  }
  const { ref, inView } = useInView()
  const fetchNewsFeed = async ({ pageParam }) => {
    return await getNewsFeed({ page: pageParam })
  }

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['newFeeds'],
    queryFn: fetchNewsFeed,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.newFeeds.length ? allPages.length + 1 : undefined
      return nextPage
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const content = data?.pages.map((dataNewFeeds) =>
    dataNewFeeds.data.result.newFeeds.map((newFeed) => {
      return <PostCard key={newFeed._id} data={newFeed} />
    })
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const { data: blogData } = useQuery({
    queryKey: ['blogs-list-user', { limit: 4 }],
    queryFn: () => {
      return getBlogsForUser({ limit: 4 })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data: userData } = useQuery({
    queryKey: ['recommed-list-user'],
    queryFn: () => {
      return recommendUser()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  if (status === 'pending') {
    return <LoadingHome />
  }

  if (status === 'error') {
    return (
      <div className='w-full p-10 text-center font-bold text-red-600 dark:text-pink-700 h-[100rem]'>
        Có lỗi xảy ra vui lòng load lại trang
      </div>
    )
  }
  return (
    <>
      <div className=' grid xl:mx-8 pt-2 xl:gap-6 xl:grid-cols-5'>
        <div className='xl:col-span-3'>
          <div className='bg-white py-2 px-4  shadow md:rounded-md dark:bg-color-primary'>
            <div>{checkTime(profile)}</div>
            <div className='flex justify-between items-center gap-2 md:gap-4 w-full'>
              <div className='w-8 h-8 md:w-10 overflow-hidden md:h-10 rounded-full cursor-pointer'>
                <img
                  className='w-[30px] h-[30px] md:w-10 object-cover md:h-10 rounded-full'
                  src={profile.avatar === '' ? useravatar : profile.avatar}
                  alt='user photo'
                />
              </div>
              <div
                onClick={openModalPost}
                className='bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-800 w-[90%] md:w-[92%] cursor-pointer hover:bg-slate-200 transition-all h-10   md:h-12 my-4 flex items-center rounded-full'
              >
                <span className='mx-4 text-gray-500 dark:text-gray-400'>Bạn đang nghĩ gì ?</span>
              </div>
            </div>
            <div className='border mb-4 dark:border-gray-700 border-red-200 '></div>
            <div className='flex mb-2 items-center justify-between'>
              <div onClick={openModalPost} className='flex mx-1'>
                <BsFillImageFill className='text-2xl text-blue-700 dark:text-blue-300 cursor-pointer' />
              </div>
              <button
                onClick={openModalPost}
                className='btn btn-sm bg-red-800 hover:bg-red-900  text-sm text-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out'
              >
                Đăng bài viết
              </button>
            </div>
          </div>
          <div className='my-3'>
            {content}
            {/* <div ref={ref}>{isFetchingNextPage && <Loading />}</div> */}
            <div ref={ref}>
              {isFetchingNextPage ? (
                <Loading />
              ) : (
                <div className='flex justify-center font-medium'>Không còn bài viết</div>
              )}
            </div>
          </div>
        </div>
        <div className='hidden xl:block  col-span-2'>
          {userData?.data?.result.length === 0 ? null : (
            <div className='w-full mb-2 shadow  bg-white rounded-lg dark:bg-color-primary dark:border-none'>
              <div className='flex dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
                Bạn có thể biết!
              </div>
              <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
              <div className='p-3'>
                {userData?.data?.result.map((user) => {
                  return <ItemUser key={user._id} user={user} />
                })}
              </div>
            </div>
          )}

          <div className='w-full shadow bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Blog mới nhất
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <div className='p-3'>
              {blogData?.data?.result.blogs.map((blog) => {
                return (
                  <BlogCard
                    key={blog._id}
                    blogItem={blog}
                    imgClass='w-full max-h-[20rem] object-cover rounded-t-xl scale-100 overflow-hidden'
                    dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                    titleClass=' font-bold  transition-all cursor-pointer line-clamp-2 hover:text-color-secondary'
                    descriptionClass='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'
                    linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                  />
                )
              })}
              <Link
                to={`/blog`}
                className='w-full flex justify-center text-center pb-4 font-medium dark:text-gray-300 text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-300'
              >
                Xem thêm bài viết...
              </Link>
            </div>
          </div>
        </div>
      </div>
      {modalPost && <ModalUploadPost profile={profile} closeModalPost={closeModalPost} />}
    </>
  )
}

const checkTime = (profile) => {
  var day = new Date()
  var hr = day.getHours()
  if (hr >= 0 && hr < 12) {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center'>
            {`Chào buổi sáng, ${profile.name.split(' ').slice(-1).join('')}`}
            <FaCloudSun />
          </div>
        </h2>
      </>
    )
  } else if (hr == 12) {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center '>
            {`Chúc bạn ăn trưa ngon miệng, ${profile.name.split(' ').slice(-1).join('')}`}
            <BsFillSunFill />
          </div>
        </h2>
      </>
    )
  } else if (hr >= 12 && hr <= 17) {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center'>
            {`Chúc bạn buổi chiều vui vẻ, ${profile.name.split(' ').slice(-1).join('')}`}
            <PiClockAfternoonFill />
          </div>
        </h2>
      </>
    )
  } else {
    return (
      <>
        <h2 className='text-xl font-medium mt-2 text-red-700 dark:text-gray-300'>
          <div className='flex gap-2 items-center'>
            {`Chúc bạn buổi tối an lành, ${profile.name.split(' ').slice(-1).join('')}`}
            <MdNightlight />
          </div>
        </h2>
      </>
    )
  }
}

const ItemUser = ({ user }) => {
  const navigate = useNavigate()
  const followMutation = useMutation({
    mutationFn: (body) => followUser(body)
  })
  const handleFollow = () => {
    followMutation.mutate(
      { follow_id: user._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('recommed-list-user')
        }
      }
    )
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center mb-4 mt-2 gap-3'>
        <div className='avatar'>
          <div className=' rounded-full w-12 h-12'>
            <img
              className='object-cover w-12 h-12 rounded-full'
              src={user.avatar === '' ? useravatar : user.avatar}
              alt='Avatar Tailwind CSS Component'
            />
          </div>
        </div>
        <div>
          <div
            onClick={() => navigate(`/user/${user._id}`)}
            className='font-bold flex items-center gap-2 cursor-pointer hover:underline'
          >
            {user.name}
            {user.role === 1 && (
              <div className='text-blue-400 rounded-full flex justify-center items-center '>
                <FaCheckCircle size={13} />
              </div>
            )}
          </div>
          <div className=''>
            <span className='text-sm opacity-50'>@{user.user_name}</span>
          </div>
        </div>
      </div>
      <button onClick={handleFollow} className='btn btn-sm text-white hover:bg-red-900 bg-red-800'>
        {' '}
        Theo dõi
      </button>
    </div>
  )
}
