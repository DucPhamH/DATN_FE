// import { BsFillImageFill, BsFillSunFill } from 'react-icons/bs'
// import useravatar from '../../assets/images/useravatar.jpg'
// import { MdNightlight } from 'react-icons/md'
// import { FaCloudSun } from 'react-icons/fa'
// import { PiClockAfternoonFill } from 'react-icons/pi'
// import PostCard from '../../components/CardComponents/PostCard'
import { useParams } from 'react-router-dom'
import BlogCard from '../../components/CardComponents/BlogCard'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '../../apis/postApi'
import LoadingHome from '../Home/components/LoadingHome'
import PostCardInfo from '../../components/CardComponents/PostCardInfo'
// import { AiOutlineArrowUp } from 'react-icons/ai'
// import { useContext, useEffect, useState } from 'react'

// import ModalUploadPost from './components/ModalUploadPost'
// import { getNewsFeed } from '../../apis/postApi'
// import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
// import { useInView } from 'react-intersection-observer'
// import LoadingHome from './components/LoadingHome'
// import { AppContext } from '../../contexts/app.context'
// import Loading from '../../components/GlobalComponents/Loading'

const blogItems = [
  {
    id: 1,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 2,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  }
]
export default function PostInfo() {
  const { id } = useParams()
  console.log(id)
  const { data, status } = useQuery({
    queryKey: ['post-info', id],
    queryFn: () => {
      return getPost(id)
    }
  })
  const post = data?.data.result[0]
  console.log(post)
  //   const { ref, inView } = useInView()
  //   const fetchNewsFeed = async ({ pageParam }) => {
  //     return await getNewsFeed({ page: pageParam })
  //   }

  //   const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
  //     queryKey: ['newFeeds'],
  //     queryFn: fetchNewsFeed,
  //     initialPageParam: 1,
  //     getNextPageParam: (lastPage, allPages) => {
  //       const nextPage = lastPage.data.result.newFeeds.length ? allPages.length + 1 : undefined
  //       return nextPage
  //     },
  //     placeholderData: keepPreviousData,
  //     staleTime: 1000 * 60 * 5
  //   })

  //   const content = data?.pages.map((dataNewFeeds) =>
  //     dataNewFeeds.data.result.newFeeds.map((newFeed, index) => {
  //       if (dataNewFeeds.data.result.newFeeds.length == index + 1) {
  //         return <PostCard innerRef={ref} key={newFeed._id} data={newFeed} />
  //       }
  //       return <PostCard key={newFeed._id} data={newFeed} />
  //     })
  //   )

  //   useEffect(() => {
  //     if (inView && hasNextPage) {
  //       fetchNextPage()
  //     }
  //   }, [inView, hasNextPage, fetchNextPage])

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
        <div className='col-span-3'>
          <div className='my-3'>
            <PostCardInfo data={post} />
          </div>
        </div>
        <div className='hidden xl:block col-span-2'>
          <div className='w-full shadow bg-white rounded-lg dark:bg-slate-900 dark:border-none'>
            <div className='flex dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tin tức mới nhất
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <div className='p-3'>
              {blogItems.map((blogItem) => {
                return (
                  <div className='mb-2 mx-5' key={blogItem.id}>
                    <BlogCard
                      blogItem={blogItem}
                      imgClass='lg:h-[32vh] rounded-t-xl scale-100 overflow-hidden'
                      dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                      titleClass=' font-bold hover:text-color-secondary'
                      descriptionClass='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'
                      linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                    />
                  </div>
                )
              })}
              <div className='w-full text-center pb-4 font-medium dark:text-gray-300 text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-300'>
                Xem thêm bài viết...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
