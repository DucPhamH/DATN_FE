import { useContext, useEffect, useRef, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AppContext } from '../../../../contexts/app.context'
import DeleteConfirmBox from '../../../../components/GlobalComponents/DeleteConfirmBox'

export default function ThreeDotComment({ userID, handleDeletePost, isPending }) {
  const { profile } = useContext(AppContext)
  const [isMenu, setIsMenu] = useState(false)
  const [openDeleteBox, setOpenDeleteBox] = useState(false)
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div ref={ref}>
        {profile._id === userID ? (
          <>
            <button
              className='flex relative items-center transition-all duration-700 text-2xl py-1 px-2 font-medium text-gray-900 rounded-full
         hover:text-red-600 dark:hover:text-red-600 md:mr-0  dark:text-white'
              type='button'
              onClick={() => setIsMenu(!isMenu)}
            >
              <BiDotsHorizontalRounded />
            </button>

            {isMenu && (
              <div className='z-10 absolute right-0 xl:right-[10%] bg-white divide-y divide-gray-100 text-sm rounded-lg shadow w-36 dark:bg-slate-800 dark:divide-gray-600'>
                <div className='z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-slate-800 dark:divide-gray-600'>
                  <div className='py-2 text-gray-700 dark:text-gray-200'>
                    <div onClick={handleOpenDeleteBox}>
                      <div className='flex cursor-pointer justify-between items-center  px-4 py-2 transition-all duration-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        Xóa bình luận
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='w-10'></div>
        )}
      </div>

      {openDeleteBox && (
        <DeleteConfirmBox
          title='Xóa bình luận'
          subtitle='Bạn có chắc chắn muốn xóa bình luận này không?'
          handleDelete={handleDeletePost}
          closeModal={handleCloseDeleteBox}
          isPending={isPending}
        />
      )}
    </>
  )
}
