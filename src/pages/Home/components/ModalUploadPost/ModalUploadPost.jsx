import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { BsFillImageFill } from 'react-icons/bs'
import { MdEmojiEmotions } from 'react-icons/md'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
export default function ModalUploadPost({ closeModalPost }) {
  const theme = localStorage.getItem('theme')
  const inputRef = useRef(null)
  const [image, setImage] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [content, setContent] = useState('')

  const handleImageClick = () => {
    inputRef.current.click()
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setImage(file)
  }
  // console.log(image)
  const handleUpload = () => {
    var formData = new FormData()
    console.log(image)
    formData.append('postImage', image)
    console.log(formData.append)
    toast.success('Upload bài viết thành công')
    //ghep api o day
  }

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split('-')
    const codeArray = []
    sym.forEach((el) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setContent(content + emoji)
  }

  return (
    <div className='modal-customs'>
      <div className='overlay-customs' onClick={() => closeModalPost()}></div>
      <div className='modal-content min-w-[360px] md:min-w-[400px] dark:bg-gray-900 bg-white'>
        <div className='relative w-full max-w-md max-h-full'>
          <div className='text-center'>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Tạo bài viết</h3>
            <div className='border dark:border-gray-700 border-red-200 '></div>
            <section className='w-full mx-auto items-center '>
              {/* <div className='px-4 py-6'> */}
              <div className='flex mt-2 mb-2 items-center'>
                <a className='inline-block' href='#'>
                  <img className='rounded-full max-w-none w-10 h-10 md:w-10 md:h-10' src={useravatar} />
                </a>
                <div className='flex flex-col justify-center ml-1 items-start'>
                  <div className='flex justify-center items-center'>
                    <a className='inline-block ml-2 text-sm font-bold' href='#'>
                      Phạm Đức
                    </a>
                  </div>
                  <select
                    defaultValue='new'
                    id='sort_by'
                    className='select mt-1 select-xs border-none outline-none bg-white dark:bg-slate-900 dark:border-none'
                  >
                    <option value='global'>Công khai</option>
                    <option value='private'>Chỉ mình tôi</option>
                  </select>
                </div>
              </div>
              <textarea
                autoFocus={true}
                className='textarea-post scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 p-3 bg-white dark:bg-gray-900 '
                placeholder='Đức ơi bạn đang nghĩ gì thế ?'
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
              <div className='flex justify-between mx-2'>
                <div className=''>
                  <BsFillImageFill className='text-2xl text-blue-700 dark:text-blue-300 cursor-pointer' />
                </div>
                <div className='relative'>
                  <MdEmojiEmotions
                    className='text-3xl text-red-500 dark:text-pink-500 cursor-pointer'
                    onClick={() => setShowEmoji(!showEmoji)}
                  />
                  {showEmoji && (
                    <div className='absolute right-8 bottom-0'>
                      <Picker
                        data={data}
                        emojiSize={20}
                        emojiButtonSize={28}
                        onEmojiSelect={addEmoji}
                        maxFrequentRows={0}
                        previewPosition='none'
                        locale='vi'
                        theme={theme === 'dark' ? 'dark' : 'light'}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className='max-w-sm mx-auto overflow-hidden items-center'>
                {/* <div className='flex justify-center items-center' onClick={handleImageClick}>
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
                  </div> */}

                {/* <input
                    id='images'
                    ref={inputRef}
                    onChange={handleImageChange}
                    type='file'
                    className='hidden'
                    accept='image/*'
                  /> */}
                {/* <div className='flex items-center justify-center'>
                    <div className='w-full'>
                      <label
                        onClick={handleUpload}
                        className='w-full transition-all duration-300 text-white bg-red-600 dark:bg-pink-700 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer'
                      >
                        <button className='text-center ml-2'>Tải lên</button>
                      </label>
                    </div>
                  </div> */}
              </div>
              {/* </div> */}
            </section>
            {/* <div className='flex justify-end mt-5'>
              <button
                type='button'
                onClick={() => closeModalPost()}
                className='text-white bg-red-600 dark:bg-pink-700 transition-all duration-300 hover:bg-red-700 border border-red-600 rounded-lg font-medium shadow-md flex items-center px-8 py-1 '
              >
                Đóng
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
