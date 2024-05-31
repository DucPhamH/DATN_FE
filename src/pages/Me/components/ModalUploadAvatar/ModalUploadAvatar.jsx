import { useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ModalLayout from '../../../../layouts/ModalLayout'
import { updateAvatar } from '../../../../apis/userApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/auth'

export default function ModalUploadAvatar({ closeModalAvatar }) {
  const { setProfile } = useContext(AppContext)
  const inputRef = useRef(null)
  const [image, setImage] = useState('')
  const handleImageClick = () => {
    inputRef.current.click()
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setImage(file)
  }
  const updateAvatarMutation = useMutation({
    mutationFn: (body) => updateAvatar(body)
  })
  // console.log(image)
  const handleUpload = () => {
    var formData = new FormData()
    console.log(image)
    formData.append('image', image)
    console.log(formData)
    updateAvatarMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success('Cập nhật ảnh đại diện thành công')
        console.log(data?.data.result)
        queryClient.invalidateQueries({
          queryKey: ['me']
        })
        setProfile(data?.data.result)
        setProfileToLS(data?.data.result)
        closeModalAvatar()
      },
      onError: () => {
        toast.error('Cập nhật ảnh đại diện thất bại')
      }
    })
    //ghep api o day
  }
  return (
    <ModalLayout
      closeModal={closeModalAvatar}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-[#f7f1db]'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className='px-2 text-center '>
          <h3 className='mb-6 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Chọn ảnh đại diện</h3>
          <section className='w-full mx-auto items-center '>
            <div className='max-w-sm mx-auto dark:bg-slate-950 bg-white rounded-lg shadow-md overflow-hidden items-center'>
              <div className='px-4  py-6'>
                <div className='flex justify-center items-center' onClick={handleImageClick}>
                  {image ? (
                    <img
                      className='h-[16rem] w-[16rem] border border-red-600 mb-5 rounded-full object-contain'
                      src={URL.createObjectURL(image)}
                      alt='avatar'
                    />
                  ) : (
                    <div className='max-w-sm h-[16rem] w-[16rem] flex justify-center mb-4 dark:bg-slate-950  bg-gray-100 border-dashed border-2 border-gray-400 rounded-full items-center mx-auto text-center cursor-pointer'>
                      <label id='images' className='cursor-pointer'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-8 h-8 text-gray-700 dark:text-white mx-auto mb-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                          />
                        </svg>
                        <h5 className='mb-2 text-xl font-bold tracking-tight dark:text-white text-gray-700'>
                          Upload picture
                        </h5>
                        <p className='font-normal text-sm dark:text-white text-gray-400 md:px-6'>
                          Chọn 1 ảnh theo định dạng <b className='dark:text-white text-gray-600'>JPG, PNG</b>.
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                <input
                  id='images'
                  ref={inputRef}
                  onChange={handleImageChange}
                  type='file'
                  className='hidden'
                  accept='image/*'
                />
                <div className='flex items-center justify-center'>
                  {updateAvatarMutation.isPending ? (
                    <div className='w-full cursor-not-allowed'>
                      <label className='w-full transition-all duration-300 text-white bg-slate-400 font-medium rounded-lg text-sm px-5 py-2 flex items-center justify-center mr-2 mb-2'>
                        <svg
                          aria-hidden='true'
                          className='inline w-6 h-6 text-gray-200 cursor-not-allowed animate-spin dark:text-gray-600 fill-pink-600'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                        <button disabled className='text-center cursor-not-allowed ml-2'>
                          Tải lên
                        </button>
                      </label>
                    </div>
                  ) : (
                    <div className='w-full'>
                      <label className='w-full dark:hover:bg-pink-800 transition-all duration-300 text-white bg-red-600 dark:bg-pink-700 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2 flex items-center justify-center mr-2 mb-2 cursor-pointer'>
                        <button onClick={handleUpload} className='text-center ml-2'>
                          Tải lên
                        </button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <div className='flex justify-end mt-5'>
            <button
              type='button'
              onClick={() => closeModalAvatar()}
              className='text-white bg-red-600 dark:bg-pink-700 transition-all duration-300 hover:bg-red-700 border border-red-600 rounded-lg font-medium shadow-md flex items-center px-8 py-1 '
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
