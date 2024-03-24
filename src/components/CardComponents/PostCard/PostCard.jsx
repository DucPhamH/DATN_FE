import React from 'react'
import useravatar from '../../../assets/images/useravatar.jpg'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { PiShareFatLight } from 'react-icons/pi'
import Comments from '../../SocialComponents/Comments'
import { FaRegComment } from 'react-icons/fa'
import { LiaComments } from 'react-icons/lia'

export default function PostCard() {
  const [openComment, setOpenComment] = React.useState(false)
  const handleOpenComment = () => {
    setOpenComment(!openComment)
  }
  return (
    <article className='mb-4 shadow break-inside md:px-6 pt-6 pb-4 md:rounded-md bg-white dark:bg-slate-900 flex flex-col bg-clip-border'>
      <div className='flex justify-between items-start'>
        <div className='flex pb-4 px-4 md:px-0 items-center justify-between'>
          <div className='flex items-center'>
            <a className='inline-block mr-4' href='#'>
              <img className='rounded-full max-w-none w-12 h-12 md:w-14 md:h-14' src={useravatar} />
            </a>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <a className='inline-block text-lg font-bold mr-2' href='#'>
                  Phạm Đức
                </a>
                <span>
                  <svg className='fill-blue-500 dark:fill-slate-50 w-5 h-5' viewBox='0 0 24 24'>
                    <path d='M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'></path>
                  </svg>
                </span>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>01 tháng 1</div>
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

      <p className='px-4 md:px-0'>Tôi đã làm thành công món bún đậu chấm tương ớt</p>

      <div className='py-4'>
        <a className='flex' href='#'>
          <img
            className='max-w-full md:rounded-lg'
            src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg'
          />
        </a>
      </div>
      {/* <div className='py-4'>
        <div className='flex justify-between gap-1 mb-1'>
          <a className='flex' href='#'>
            <img
              className='max-w-full rounded-tl-lg'
              src='https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/157765/Originals/15(1).jpg'
            />
          </a>
          <a className='flex' href='#'>
            <img
              className='max-w-full'
              src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-10.jpg'
            />
          </a>
          <a className='flex' href='#'>
            <img
              className='max-w-full rounded-tr-lg'
              src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-10.jpg'
            />
          </a>
        </div>
        <div className='flex justify-between gap-1'>
          <a className='flex' href='#'>
            <img
              className='max-w-full rounded-bl-lg'
              src='https://images.pexels.com/photos/1429748/pexels-photo-1429748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            />
          </a>
          <a className='flex' href='#'>
            <img
              className='max-w-full rounded-br-lg'
              src='https://images.pexels.com/photos/69020/pexels-photo-69020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            />
          </a>
        </div>
      </div> */}

      <div className='px-4 md:px-0'>
        <div className='flex justify-between items-center'>
          <a className='inline-flex items-center' href='#'>
            <AiFillHeart className='mr-1 text-red-500' size={25} />
            <span className='text-lg font-bold'>69</span>
          </a>
          <div className='flex gap-3 items-center'>
            <div>12 bình luận</div>
            <div>12 lượt chia sẻ</div>
          </div>
        </div>
      </div>
      <div className='border mt-2 mb-4 dark:border-gray-700 border-red-200 '></div>
      <div className='px-4 md:px-0'>
        <div className='flex justify-around'>
          <div className='flex cursor-pointer hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 justify-center items-center'>
            <CiHeart className='mr-1' size={25} />
            <span className='font-medium'>Thích</span>
          </div>
          <div
            onClick={handleOpenComment}
            className='flex cursor-pointer justify-center hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 items-center'
          >
            <LiaComments className='mr-1' size={25} />
            <span className='font-medium'>Bình luận</span>
          </div>
          <div className='flex cursor-pointer justify-center hover:text-red-700 transition-all dark:hover:text-pink-500 duration-150 items-center'>
            <PiShareFatLight className='mr-1' size={25} />
            <span className='font-medium'>Chia sẻ</span>
          </div>
        </div>
      </div>
      {openComment && <Comments />}
    </article>
  )
}
