import React, { useState } from 'react'
import useravatar from '../../../assets/images/useravatar.jpg'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { PiShareFatLight } from 'react-icons/pi'
import { LiaComments } from 'react-icons/lia'
import moment from 'moment'
import { likePost, unlikePost } from '../../../apis/postApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../main'
import Comments from '../../../pages/Home/components/Comments'
import ModalSharePost from '../../../pages/Home/components/ModalSharePost'
import ShowMoreContent from '../../GlobalComponents/ShowMoreContent/ShowMoreContent'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import ThreeDotPost from '../../../pages/Home/components/ThreeDotPost'

export default function PostCardInfo({ data }) {
  const [openComment, setOpenComment] = useState(false)
  const [openSharePost, setOpenSharePost] = useState(false)

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
            queryClient.invalidateQueries('newsFeed')
          }
        }
      )
    } else {
      likeMutation.mutate(
        { post_id: data._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('newsFeed')
          }
        }
      )
    }
  }

  return (
    <article className='mb-4 shadow break-inside md:px-6 pt-6 pb-4 md:rounded-md bg-white dark:dark:bg-color-primary flex flex-col bg-clip-border'>
      <CheckTypeOfPost data={data} />
      <div className='px-4 md:px-0'>
        <div className='flex justify-between items-center'>
          <div className='inline-flex items-center'>
            <AiFillHeart className='mr-1 text-red-500 dark:text-pink-600 ' size={20} />
            <span className='font-bold'>{data.like_count}</span>
            <span className='ml-1 md:ml-2'>Lượt thích</span>
          </div>
          <div className='flex gap-3 items-center'>
            <div>{data.comment_count} bình luận</div>
            <div>{data.share_count} lượt chia sẻ</div>
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
          <div
            onClick={handleOpenSharePost}
            className='flex cursor-pointer justify-center hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 items-center'
          >
            <PiShareFatLight className='mr-1' size={20} />
            <span className='font-medium'>Chia sẻ</span>
          </div>
        </div>
      </div>
      {openComment && <Comments post={data} />}
      {openSharePost && <ModalSharePost handleCloseSharePost={handleCloseSharePost} post={data} />}
    </article>
  )
}

function CheckTypeOfPost({ data }) {
  if (data.type === 0) {
    return (
      <>
        <div className='flex justify-between items-start'>
          <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
            <div className='flex items-center'>
              <a className='inline-block mr-4' href='#'>
                <img
                  className='rounded-full max-w-none w-12 h-12 md:w-14 md:h-14'
                  src={data.user.avatar === '' ? useravatar : data.user.avatar}
                />
              </a>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <a className='inline-block text-lg font-bold mr-2' href='#'>
                    {data.user.name}
                  </a>
                </div>
                <div className='text-slate-500 dark:text-slate-300'>
                  {moment(data.createdAt).startOf('D').fromNow()}
                </div>
              </div>
            </div>
          </div>
          <ThreeDotPost userID={data.user._id} />
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
            <a className='inline-block mr-4' href='#'>
              <img
                className='rounded-full max-w-none w-12 h-12 md:w-14 md:h-14'
                src={data.user.avatar === '' ? useravatar : data.user.avatar}
              />
            </a>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <a className='inline-block text-lg font-bold mr-2' href='#'>
                  {data.user.name}
                </a>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>{moment(data.createdAt).startOf('D').fromNow()}</div>
            </div>
          </div>
        </div>
        <ThreeDotPost userID={data.user._id} />
      </div>
      <ShowMoreContent className='px-4 whitespace-pre-line  text-sm pb-5 md:px-0'>
        <p className=''>{data.content}</p>
      </ShowMoreContent>
      <div className='border mt-2 mb-2 dark:border-gray-700 border-red-200 '></div>
      <div className='flex justify-between items-start'>
        <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
          <div className='flex mx-3 items-center'>
            <a className='inline-block mr-4' href='#'>
              <img
                className='rounded-full max-w-none w-10 h-10 md:w-12 md:h-12'
                src={data.parent_user.avatar === '' ? useravatar : data.parent_user.avatar}
              />
            </a>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <a className='inline-block font-bold mr-2' href='#'>
                  {data.parent_user.name}
                </a>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>
                {moment(data.parent_post.createdAt).startOf('D').fromNow()}
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
                    className='max-w-full object-cover rounded-tl-lg'
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
                    className='max-w-full object-cover'
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
                    className='max-w-full object-cover rounded-tr-lg'
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
                    className='max-w-full object-cover rounded-tl-lg'
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
                    className='max-w-full object-cover'
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
                    className='max-w-full object-cover '
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
                    className='max-w-full object-cover rounded-tr-lg'
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
                  className='max-w-full object-cover rounded-tl-lg'
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
                  className='max-w-full object-cover'
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
                  className='max-w-full object-cover rounded-tr-lg'
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
                  className='max-w-full object-cover rounded-bl-lg'
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
                  className='max-w-full object-cover rounded-br-lg'
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