import { useContext, useState } from 'react'
import useravatar from '../../../assets/images/useravatar.jpg'
import { AiFillHeart } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { PiShareFatLight } from 'react-icons/pi'
import { LiaComments } from 'react-icons/lia'
import moment from 'moment'
import { deletePostForEachUser, likePost, unlikePost } from '../../../apis/postApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../main'
import Comments from '../../../pages/Home/components/Comments'
import ModalSharePost from '../../../pages/Home/components/ModalSharePost'
import ShowMoreContent from '../../GlobalComponents/ShowMoreContent/ShowMoreContent'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import ThreeDotPost from '../../../pages/Home/components/ThreeDotPost'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MdPublic } from 'react-icons/md'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { AppContext } from '../../../contexts/app.context'
import { FaCheckCircle, FaUserFriends } from 'react-icons/fa'
import { SocketContext } from '../../../contexts/socket.context'
import useSound from 'use-sound'
import like from '../../../assets/sounds/like.mp3'

export default function PostCardInfo({ data }) {
  const [openComment, setOpenComment] = useState(false)
  const [openSharePost, setOpenSharePost] = useState(false)
  const { profile } = useContext(AppContext)
  const [play] = useSound(like)
  const { newSocket } = useContext(SocketContext)
  const navigate = useNavigate()

  const checkNavigateProfileUser = () => {
    if (profile._id === data.user._id) {
      return navigate('/me')
    }
    return navigate(`/user/${data.user._id}`)
  }

  const checkNavigateProfileParentUser = () => {
    if (profile._id === data.parent_user._id) {
      return navigate('/me')
    }
    return navigate(`/user/${data.parent_user._id}`)
  }
  const handleCloseSharePost = () => {
    setOpenSharePost(false)
  }
  const handleOpenSharePost = () => {
    setOpenSharePost(true)
  }
  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  const likeMutation = useMutation({
    mutationFn: (body) => likePost(body)
  })

  const unlikeMutation = useMutation({
    mutationFn: (body) => unlikePost(body)
  })

  const handleLike = () => {
    if (data.is_like) {
      unlikeMutation.mutate(
        { post_id: data._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('post-info')
          }
        }
      )
    } else {
      likeMutation.mutate(
        { post_id: data._id },
        {
          onSuccess: () => {
            newSocket.emit('like post', {
              content: 'Đã thích 1 bài viết của bạn',
              to: data.user._id,
              name: profile.name,
              avatar: profile.avatar
            })
            play()
            queryClient.invalidateQueries('post-info')
          }
        }
      )
    }
  }

  const deletePostMutation = useMutation({
    mutationFn: (body) => deletePostForEachUser(body)
  })

  const handleDeletePost = () => {
    deletePostMutation.mutate(
      { post_id: data._id },
      {
        onSuccess: () => {
          toast.success('Xóa bài viết thành công'), queryClient.invalidateQueries('post-info'), navigate('/home')
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }

  return (
    <article className='mb-4 shadow break-inside md:px-6 pt-6 pb-4 md:rounded-md bg-white dark:dark:bg-color-primary flex flex-col bg-clip-border'>
      <CheckTypeOfPost
        data={data}
        handleDeletePost={handleDeletePost}
        checkNavigateProfileUser={checkNavigateProfileUser}
        checkNavigateProfileParentUser={checkNavigateProfileParentUser}
      />
      <div className='px-4 md:px-0'>
        <div className='flex justify-between items-center'>
          <div className='inline-flex items-center'>
            <AiFillHeart className='mr-1 text-red-500 dark:text-pink-600 ' size={20} />
            <span className='font-bold'>{data.like_count}</span>
            <span className='ml-1 md:ml-2'>Lượt thích</span>
          </div>
          <div className='flex gap-3 items-center'>
            <div
              onClick={handleOpenComment}
              className='hover:text-red-600 dark:hover:text-pink-600 cursor-pointer transition-all'
            >
              {data.comment_count} bình luận
            </div>
            {data.status === 0 ? (
              <div
                onClick={handleOpenSharePost}
                className='hover:text-red-600 dark:hover:text-pink-600 cursor-pointer transition-all'
              >
                {data.share_count} lượt chia sẻ
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='border mt-2 mb-4 dark:border-gray-700 border-red-200 '></div>
      <div className='px-4 md:px-0'>
        <div className='flex justify-around'>
          <div
            onClick={handleLike}
            className='flex cursor-pointer hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 justify-center items-center'
          >
            {data.is_like ? (
              <>
                <AiFillHeart className='mr-1 text-red-500 dark:text-pink-600' size={20} />
                <span className='font-medium '>Đã thích</span>
              </>
            ) : (
              <>
                <CiHeart className='mr-1' size={20} />
                <span className='font-medium'>Thích</span>
              </>
            )}
          </div>
          <div
            onClick={handleOpenComment}
            className='flex cursor-pointer justify-center hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 items-center'
          >
            <LiaComments className='mr-1' size={20} />
            <span className='font-medium'>Bình luận</span>
          </div>
          {data.status === 0 ? (
            <div
              onClick={handleOpenSharePost}
              className='flex cursor-pointer justify-center hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 items-center'
            >
              <PiShareFatLight className='mr-1' size={20} />
              <span className='font-medium'>Chia sẻ</span>
            </div>
          ) : null}
        </div>
      </div>
      {openComment && <Comments post={data} />}
      {openSharePost && <ModalSharePost handleCloseSharePost={handleCloseSharePost} post={data} />}
    </article>
  )
}

function CheckTypeOfPost({ data, handleDeletePost, checkNavigateProfileParentUser, checkNavigateProfileUser }) {
  if (data.type === 0) {
    return (
      <>
        <div className='flex justify-between items-start'>
          <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
            <div className='flex items-center'>
              <div onClick={checkNavigateProfileUser} className='inline-block mr-4'>
                <img
                  className='rounded-full object-cover max-w-none w-12 h-12 md:w-14 md:h-14'
                  src={data.user.avatar === '' ? useravatar : data.user.avatar}
                />
              </div>
              <div className='flex flex-col'>
                <div onClick={checkNavigateProfileUser} className='flex items-center'>
                  <div className='flex items-center gap-2 hover:underline cursor-pointer  text-lg font-bold mr-2'>
                    {data.user.name}
                    {data.user.role === 1 && (
                      <div className='text-blue-400 rounded-full flex justify-center items-center '>
                        <FaCheckCircle size={15} />
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='text-slate-500 dark:text-slate-300'>{moment(data.createdAt).fromNow()}</div>
                  {data.status === 0 && (
                    <div>
                      <MdPublic />
                    </div>
                  )}
                  {data.status === 1 && (
                    <div>
                      <FaUserFriends />
                    </div>
                  )}
                  {data.status === 2 && (
                    <div>
                      <RiGitRepositoryPrivateFill />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ThreeDotPost userID={data.user._id} handleDeletePost={handleDeletePost} post={data} />
        </div>
        <ShowMoreContent className='px-4  text-sm whitespace-pre-line pb-5 md:px-0'>
          <p className=''>{data.content}</p>
        </ShowMoreContent>
        <CheckLengthOfImages images={data.images} />
      </>
    )
  }
  return (
    <>
      <div className='flex justify-between items-start'>
        <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
          <div className='flex items-center'>
            <div onClick={checkNavigateProfileUser} className='inline-block mr-4'>
              <img
                className='rounded-full object-cover max-w-none w-12 h-12 md:w-14 md:h-14'
                src={data.user.avatar === '' ? useravatar : data.user.avatar}
              />
            </div>
            <div className='flex flex-col'>
              <div onClick={checkNavigateProfileUser} className='flex items-center'>
                <div className='flex items-center gap-2 hover:underline cursor-pointer  text-lg font-bold mr-2'>
                  {data.user.name}
                  {data.user.role === 1 && (
                    <div className='text-blue-400 rounded-full flex justify-center items-center '>
                      <FaCheckCircle size={15} />
                    </div>
                  )}
                </div>
              </div>{' '}
              <div className='flex gap-2 items-center'>
                <div className='text-slate-500 dark:text-slate-300'>{moment(data.createdAt).fromNow()}</div>
                {data.status === 0 && (
                  <div>
                    <MdPublic />
                  </div>
                )}
                {data.status === 1 && (
                  <div>
                    <FaUserFriends />
                  </div>
                )}
                {data.status === 2 && (
                  <div>
                    <RiGitRepositoryPrivateFill />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ThreeDotPost userID={data.user._id} handleDeletePost={handleDeletePost} post={data} />
      </div>
      <ShowMoreContent className='px-4 whitespace-pre-line  text-sm pb-5 md:px-0'>
        <p className=''>{data.content}</p>
      </ShowMoreContent>
      <div className='border mt-2 mb-2 dark:border-gray-700 border-red-200 '></div>
      <div className='flex justify-between items-start'>
        <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
          <div className='flex mx-3 items-center'>
            <div onClick={checkNavigateProfileParentUser} className='inline-block mr-4'>
              <img
                className='rounded-full object-cover max-w-none w-10 h-10 md:w-12 md:h-12'
                src={data.parent_user.avatar === '' ? useravatar : data.parent_user.avatar}
              />
            </div>
            <div className='flex flex-col'>
              <div onClick={checkNavigateProfileParentUser} className='flex items-center'>
                <div className='flex items-center gap-2 hover:underline cursor-pointer  text-lg font-bold mr-2'>
                  {data.parent_user.name}
                  {data.parent_user.role === 1 && (
                    <div className='text-blue-400 rounded-full flex justify-center items-center '>
                      <FaCheckCircle size={15} />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='text-slate-500 dark:text-slate-300'>{moment(data.parent_post.createdAt).fromNow()}</div>

                {data.parent_post.status === 0 && (
                  <div>
                    <MdPublic />
                  </div>
                )}
                {data.parent_post.status === 1 && (
                  <div>
                    <FaUserFriends />
                  </div>
                )}
                {data.parent_post.status === 2 && (
                  <div>
                    <RiGitRepositoryPrivateFill />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShowMoreContent className='px-4 whitespace-pre-line text-sm pb-5 md:px-0'>
        <p className=''>{data.parent_post.content}</p>
      </ShowMoreContent>
      <CheckLengthOfImages images={data.parent_images} />
    </>
  )
}

function CheckLengthOfImages({ images }) {
  if (images.length === 0) {
    return <div className='pt-5'></div>
  }
  if (images.length === 1) {
    return (
      <Gallery
        options={{
          showHideAnimationType: 'none',
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          clickToCloseNonZoomable: false,
          secondaryZoomLevel: 4,
          maxZoomLevel: 10,
          counter: false
        }}
      >
        <div className='py-4'>
          <div className='flex'>
            <Item original={images[0]} width='1024' height='768'>
              {({ ref, open }) => (
                <img
                  className='max-w-full rounded-lg'
                  src={images[0]}
                  alt=''
                  referrerPolicy='no-referrer'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          </div>
        </div>
      </Gallery>
    )
  }
  if (images.length === 2) {
    return (
      <Gallery
        options={{
          showHideAnimationType: 'none',
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          clickToCloseNonZoomable: false,
          secondaryZoomLevel: 4,
          maxZoomLevel: 10,
          counter: false
        }}
      >
        <div className='py-4'>
          <div className='flex justify-between gap-1'>
            <div className='flex'>
              <Item original={images[0]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full object-cover rounded-tl-lg'
                    src={images[0]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
            </div>
            <div className='flex'>
              <Item original={images[1]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full object-cover rounded-tr-lg'
                    src={images[1]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
      </Gallery>
    )
  }
  if (images.length === 3) {
    return (
      <Gallery
        options={{
          showHideAnimationType: 'none',
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          clickToCloseNonZoomable: false,
          secondaryZoomLevel: 4,
          maxZoomLevel: 10,
          counter: false
        }}
      >
        <div className='py-4'>
          <div className='flex justify-between gap-1 mb-1'>
            <div className='flex'>
              <Item original={images[0]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='lg:min-w-[10rem] max-w-full object-cover rounded-tl-lg rounded-bl-lg'
                    src={images[0]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} /> */}
            </div>
            <div className='flex'>
              <Item original={images[1]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full lg:min-w-[10rem] object-cover'
                    src={images[1]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover' src={images[1]} /> */}
            </div>
            <div className='flex' href='#'>
              <Item original={images[2]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full lg:min-w-[10rem] object-cover rounded-tr-lg rounded-br-lg'
                    src={images[2]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover rounded-tr-lg' src={images[2]} /> */}
            </div>
          </div>
        </div>
      </Gallery>
    )
  }
  if (images.length === 4) {
    return (
      <Gallery
        options={{
          showHideAnimationType: 'none',
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          clickToCloseNonZoomable: false,
          secondaryZoomLevel: 4,
          maxZoomLevel: 10,
          counter: false
        }}
      >
        <div className='py-4'>
          <div className='flex justify-between gap-1'>
            <div className='flex'>
              <Item original={images[0]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full min-w-[5rem] lg:min-w-[10rem] object-cover rounded-tl-lg rounded-bl-lg'
                    src={images[0]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} /> */}
            </div>
            <div className='flex'>
              <Item original={images[1]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full min-w-[5rem] lg:min-w-[10rem] object-cover'
                    src={images[1]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover' src={images[1]} /> */}
            </div>
            <div className='flex'>
              <Item original={images[2]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full min-w-[5rem] lg:min-w-[10rem] object-cover '
                    src={images[2]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover  rounded-br-lg' src={images[3]} /> */}
            </div>
            <div className='flex'>
              <Item original={images[3]} width='1024' height='768'>
                {({ ref, open }) => (
                  <img
                    className='max-w-full min-w-[5rem] lg:min-w-[10rem] object-cover rounded-tr-lg rounded-br-lg'
                    src={images[3]}
                    alt=''
                    referrerPolicy='no-referrer'
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
              {/* <img className='max-w-full object-cover rounded-tr-lg ' src={images[3]} /> */}
            </div>
          </div>
          <div className='flex justify-between gap-1'></div>
        </div>
      </Gallery>
    )
  }
  return (
    <Gallery
      options={{
        showHideAnimationType: 'none',
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        clickToCloseNonZoomable: false,
        secondaryZoomLevel: 4,
        maxZoomLevel: 10,
        counter: false
      }}
    >
      <div className='py-4'>
        <div className='flex justify-between gap-1 mb-1'>
          <div className='flex'>
            <Item original={images[0]} width='1024' height='768'>
              {({ ref, open }) => (
                <img
                  className='max-w-full lg:min-w-[10rem]  object-cover rounded-tl-lg'
                  src={images[0]}
                  alt=''
                  referrerPolicy='no-referrer'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
            {/* <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} /> */}
          </div>
          <div className='flex'>
            <Item original={images[1]} width='1024' height='768'>
              {({ ref, open }) => (
                <img
                  className='max-w-full lg:min-w-[10rem]  object-cover'
                  src={images[1]}
                  alt=''
                  referrerPolicy='no-referrer'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
            {/* <img className='max-w-full object-cover' src={images[1]} /> */}
          </div>
          <div className='flex'>
            <Item original={images[2]} width='1024' height='768'>
              {({ ref, open }) => (
                <img
                  className='max-w-full lg:min-w-[10rem]  object-cover rounded-tr-lg'
                  src={images[2]}
                  alt=''
                  referrerPolicy='no-referrer'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
            {/* <img className='max-w-full object-cover rounded-tr-lg' src={images[2]} /> */}
          </div>
        </div>
        <div className='flex justify-between gap-1'>
          <div className='flex'>
            <Item original={images[3]} width='1024' height='768'>
              {({ ref, open }) => (
                <img
                  className='max-w-full lg:min-w-[10rem]  object-cover rounded-bl-lg'
                  src={images[3]}
                  alt=''
                  referrerPolicy='no-referrer'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
            {/* <img className='max-w-full object-cover rounded-bl-lg' src={images[3]} /> */}
          </div>
          <div className='flex'>
            <Item original={images[4]} width='1024' height='768'>
              {({ ref, open }) => (
                <img
                  className='max-w-full lg:min-w-[10rem]  object-cover rounded-br-lg'
                  src={images[4]}
                  alt=''
                  referrerPolicy='no-referrer'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
            {/* <img className='max-w-full object-cover rounded-br-lg' src={images[4]} /> */}
          </div>
        </div>
      </div>
    </Gallery>
  )
}
