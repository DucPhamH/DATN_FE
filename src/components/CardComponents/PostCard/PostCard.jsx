import React from 'react'
import useravatar from '../../../assets/images/useravatar.jpg'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { PiShareFatLight } from 'react-icons/pi'
import Comments from '../../SocialComponents/Comments'
import { LiaComments } from 'react-icons/lia'
import moment from 'moment'

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
                <div className='text-slate-500 dark:text-slate-300'>{moment(data.createdAt).format('L')}</div>
              </div>
            </div>
          </div>
          <button
            className='flex relative items-center transition-all duration-700 text-2xl px-2 font-medium text-gray-900 rounded-full
         hover:text-red-600 dark:hover:text-red-600  dark:text-white'
            type='button'
          >
            <BiDotsHorizontalRounded />
          </button>
        </div>

        <p className='px-4 md:px-0'>{data.content}</p>
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
              <div className='text-slate-500 dark:text-slate-300'>{moment(data.createdAt).format('L')}</div>
            </div>
          </div>
        </div>
        <button
          className='flex relative items-center transition-all duration-700 text-2xl px-2 font-medium text-gray-900 rounded-full
   hover:text-red-600 dark:hover:text-red-600  dark:text-white'
          type='button'
        >
          <BiDotsHorizontalRounded />
        </button>
      </div>
      <p className='px-4 pb-5 md:px-0'>{data.content}</p>
      <div className='border mt-2 mb-2 dark:border-gray-700 border-red-200 '></div>
      <div className='flex justify-between items-start'>
        <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
          <div className='flex mx-3 items-center'>
            <a className='inline-block mr-4' href='#'>
              <img
                className='rounded-full max-w-none w-10 h-10 md:w-12 md:h-12'
                src={data.parent_user.avatar === '' ? useravatar : data.user.avatar}
              />
            </a>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <a className='inline-block font-bold mr-2' href='#'>
                  {data.parent_user.name}
                </a>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>{moment(data.parent_post.createdAt).format('L')}</div>
            </div>
          </div>
        </div>
      </div>
      <p className='px-4 mx-3 pb-5 md:px-0'>{data.parent_post.content}</p>
      <CheckLengthOfImages images={data.parent_images} />
    </>
  )
}

function CheckLengthOfImages({ images }) {
  console.log(images)
  if (images.length === 0) {
    return <div className='pt-5'></div>
  }
  if (images.length === 1) {
    return (
      <div className='py-4'>
        <a className='flex' href='#'>
          <img className='max-w-full rounded-lg' src={images[0]} />
        </a>
      </div>
    )
  }
  if (images.length === 2) {
    return (
      <div className='py-4'>
        <div className='flex justify-between gap-1'>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} />
          </a>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-tr-lg' src={images[1]} />
          </a>
        </div>
      </div>
    )
  }
  if (images.length === 3) {
    return (
      <div className='py-4'>
        <div className='flex justify-between gap-1 mb-1'>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} />
          </a>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover' src={images[1]} />
          </a>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-tr-lg' src={images[2]} />
          </a>
        </div>
      </div>
    )
  }
  if (images.length === 4) {
    return (
      <div className='py-4'>
        <div className='flex justify-between gap-1'>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} />
          </a>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover' src={images[1]} />
          </a>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-br-lg' src={images[3]} />
          </a>
          <a className='flex' href='#'>
            <img className='max-w-full object-cover rounded-tr-lg' src={images[2]} />
          </a>
        </div>
        <div className='flex justify-between gap-1'></div>
      </div>
    )
  }
  return (
    <div className='py-4'>
      <div className='flex justify-between gap-1 mb-1'>
        <a className='flex' href='#'>
          <img className='max-w-full object-cover rounded-tl-lg' src={images[0]} />
        </a>
        <a className='flex' href='#'>
          <img className='max-w-full object-cover' src={images[1]} />
        </a>
        <a className='flex' href='#'>
          <img className='max-w-full object-cover rounded-tr-lg' src={images[2]} />
        </a>
      </div>
      <div className='flex justify-between gap-1'>
        <a className='flex' href='#'>
          <img className='max-w-full object-cover rounded-bl-lg' src={images[3]} />
        </a>
        <a className='flex' href='#'>
          <img className='max-w-full object-cover rounded-br-lg' src={images[4]} />
        </a>
      </div>
    </div>
  )
}

export default function PostCard({ innerRef, data }) {
  const [openComment, setOpenComment] = React.useState(false)
  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }

  console.log(data)

  return (
    <article className='mb-4 shadow break-inside md:px-6 pt-6 pb-4 md:rounded-md bg-white dark:bg-slate-900 flex flex-col bg-clip-border'>
      <CheckTypeOfPost data={data} />
      <div className='px-4 md:px-0' ref={innerRef}>
        <div className='flex justify-between items-center'>
          <a className='inline-flex items-center' href='#'>
            <AiFillHeart className='mr-1 text-red-500 dark:text-pink-600 ' size={25} />
            <span className='text-lg font-bold'>{data.like_count}</span>
            <span className='ml-3'>Lượt thích</span>
          </a>
          <div className='flex gap-3 items-center'>
            <div>{data.share_count} bình luận</div>
            <div>{data.share_count} lượt chia sẻ</div>
          </div>
        </div>
      </div>
      <div className='border mt-2 mb-4 dark:border-gray-700 border-red-200 '></div>
      <div className='px-4 md:px-0'>
        <div className='flex justify-around'>
          <div className='flex cursor-pointer hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 justify-center items-center'>
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
          <div className='flex cursor-pointer justify-center hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 items-center'>
            <PiShareFatLight className='mr-1' size={20} />
            <span className='font-medium'>Chia sẻ</span>
          </div>
        </div>
      </div>
      {openComment && <Comments />}
    </article>
  )
}
