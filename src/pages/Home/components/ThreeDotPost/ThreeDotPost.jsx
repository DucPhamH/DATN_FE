import { useContext, useEffect, useRef, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AppContext } from '../../../../contexts/app.context'
import DeleteConfirmBox from '../../../../components/GlobalComponents/DeleteConfirmBox'
import ModalReportPost from '../ModalReportPost'

export default function ThreeDotPost({ userID, handleDeletePost, isPending, post }) {
  const { profile } = useContext(AppContext)
  const [isMenu, setIsMenu] = useState(false)
  const [openDeleteBox, setOpenDeleteBox] = useState(false)
  const [openReportBox, setOpenReportBox] = useState(false)
  const ref = useRef()
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenu(false)
    }
  }
  const handleOpenDeleteBox = () => {
    setOpenDeleteBox(true)
  }
  const handleCloseDeleteBox = () => {
    setOpenDeleteBox(false)
  }

  const handleOpenReportBox = () => {
    setOpenReportBox(true)
  }

  const handleCloseReportBox = () => {
    setOpenReportBox(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div ref={ref}>
        <button
          className='flex relative items-center transition-all duration-700 text-2xl py-1 px-2 font-medium text-gray-900 rounded-full
         hover:text-red-600 dark:hover:text-red-600 md:mr-0  dark:text-white'
          type='button'
          onClick={() => setIsMenu(!isMenu)}
        >
          <BiDotsHorizontalRounded />
        </button>

        {isMenu && (
          <div className='z-10 absolute right-0 xl:right-[35%] bg-white divide-y divide-gray-100 text-sm rounded-lg shadow w-36 dark:bg-slate-800 dark:divide-gray-600'>
            <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-slate-800 dark:divide-gray-600'>
              <div className='py-2 text-gray-700 dark:text-gray-200'>
                {profile._id === userID ? (
                  <div onClick={handleOpenDeleteBox}>
                    <div className='flex cursor-pointer justify-between items-center  px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Xóa bài viết
                    </div>
                  </div>
                ) : (
                  <div onClick={handleOpenReportBox}>
                    <span className='flex cursor-pointer justify-between items-center px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Báo cáo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {openDeleteBox && (
        <DeleteConfirmBox
          title='Xóa bài viết'
          subtitle='Bạn có chắc chắn muốn xóa bài viết này không?'
          handleDelete={handleDeletePost}
          closeModal={handleCloseDeleteBox}
          isPending={isPending}
        />
      )}
      {openReportBox && <ModalReportPost handleCloseReportPost={handleCloseReportBox} post={post} />}
    </>
  )
}
