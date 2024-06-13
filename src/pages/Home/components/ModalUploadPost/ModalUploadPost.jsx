import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { BsFillImageFill } from 'react-icons/bs'
import { MdEmojiEmotions } from 'react-icons/md'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useMutation } from '@tanstack/react-query'
import { createPost } from '../../../../apis/postApi'
import ModalLayout from '../../../../layouts/ModalLayout'
import useSound from 'use-sound'
import post from '../../../../assets/sounds/post.mp3'

import * as nsfwjs from 'nsfwjs'

export default function ModalUploadPost({ closeModalPost, profile }) {
  const theme = localStorage.getItem('theme')
  const inputRef = useRef(null)
  const [play] = useSound(post)
  const [image, setImage] = useState([])
  const [selectedValue, setSelectedValue] = useState(0)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [content, setContent] = useState('')

  const handleImageClick = () => {
    inputRef.current.click()
  }
  const handleImageChange = (e) => {
    setImage((prev) => [...prev, ...e.target.files])
  }
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
  }
  const handleDeleteImage = (index) => {
    setImage((prev) => prev.filter((_, i) => i !== index))
  }
  const uploadMutation = useMutation({
    mutationFn: (body) => createPost(body)
  })
  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split('-')
    const codeArray = []
    sym.forEach((el) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setContent(content + emoji)
  }

  useEffect(() => {
    if (image.length > 5) {
      setImage((prev) => prev.slice(0, 5))
    }
  }, [image])

  const processImage = async (image) => {
    const reader = new FileReader()
    const img = await new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(image)
    })
    const imageElement = new Image()
    imageElement.src = img

    return new Promise((resolve, reject) => {
      imageElement.onload = async () => {
        try {
          const model = await nsfwjs.load('/model/')
          const predictions = await model.classify(imageElement)
          resolve(predictions)
        } catch (error) {
          reject(error)
        }
      }
      imageElement.onerror = (error) => {
        reject(error)
      }
    })
  }

  const classifyImages = async (images) => {
    try {
      const results = await Promise.all(images.map((image) => processImage(image)))
      return results
    } catch (error) {
      console.error('Error processing images:', error)
    }
  }

  const handleUpload = async () => {
    if (image.length > 0) {
      const result = await classifyImages(image)

      console.log(result)

      // result có dạng [ [{}], [{}], [{}] ]

      // check xem có ảnh nào bị flagged không
      // nếu có thì return
      const flagged = result
        ?.map((predictions) =>
          predictions.some(
            (prediction) =>
              (prediction.className === 'Sexy' ||
                prediction.className === 'Porn' ||
                prediction.className === 'Hentai') &&
              prediction.probability > 0.6
          )
        )
        .some((isFlagged) => isFlagged)

      console.log(flagged)

      if (flagged) {
        return toast.error('Ảnh của bạn có chứa nội dung nhạy cảm')
      }
    }

    var formData = new FormData()
    if (content === '' && image.length === 0) {
      return toast.error('Nội dung hoặc ảnh không được để trống')
    }
    for (let i = 0; i < image.length; i++) {
      const file = image[i]
      formData.append('image', file)
    }
    formData.append('content', content)
    formData.append('privacy', selectedValue)
    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Upload bài viết thành công')
        setContent('')
        setImage([])
        play()
        // queryClient.invalidateQueries({ queryKey: ['newFeeds'] })
        closeModalPost()
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <ModalLayout
      closeModal={closeModalPost}
      className='modal-content min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className='text-center'>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Tạo bài viết</h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={closeModalPost}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>

          <div className='border dark:border-gray-700 border-red-200 '></div>
          <section className='w-full mx-auto items-center '>
            <div className='flex mt-2 mb-2 items-center'>
              <a className='inline-block' href='#'>
                <img
                  className='rounded-full max-w-none w-10 h-10 md:w-10 md:h-10'
                  src={profile.avatar === '' ? useravatar : profile.avatar}
                />
              </a>
              <div className='flex flex-col justify-center ml-1 items-start'>
                <div className='flex justify-center items-center'>
                  <a className='inline-block ml-2 text-sm font-bold' href='#'>
                    {profile?.name}
                  </a>
                </div>
                <select
                  defaultValue='0'
                  id='sort_by'
                  className='select mt-1 select-xs border-none outline-none bg-white dark:bg-slate-900 dark:border-none'
                  onChange={handleSelectChange}
                >
                  <option value='0'>Công khai</option>
                  <option value='1'>Chỉ người theo dõi</option>
                  <option value='2'>Chỉ mình tôi</option>
                </select>
              </div>
            </div>
            <textarea
              autoFocus={true}
              className='textarea-post text-sm placeholder:text-base scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 p-3 bg-white dark:bg-gray-900 '
              placeholder={`${profile.name.split(' ').slice(-1).join('')} ơi, bạn đang nghĩ gì thế?`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            {showImagePopup && (
              <div className='max-w-sm my-1 mx-auto overflow-hidden items-center'>
                <div className='flex justify-center items-center'>
                  {image.length !== 0 ? (
                    <div className='grid grid-cols-3 gap-2'>
                      {image.map((img, index) => (
                        <div className='relative' key={index}>
                          <img
                            className='h-[6.5rem] w-[6.5rem] md:h-[7rem] md:w-[7rem] border object-contain'
                            src={URL.createObjectURL(img)}
                            alt='avatar'
                          />
                          <div onClick={() => handleDeleteImage(index)} className='flex justify-center items-center'>
                            <span className=' absolute font-semibold text-white top-0 right-0 m-1 hover:bg-slate-600 transition-all bg-slate-700 cursor-pointer rounded-full px-2'>
                              &times;
                            </span>
                          </div>
                        </div>
                      ))}
                      {image.length < 5 && (
                        <div
                          onClick={handleImageClick}
                          className=' h-[6.5rem] w-[6.5rem] md:h-[7rem] md:w-[7rem] flex justify-center dark:bg-slate-950  bg-gray-100 border-dashed border-2 border-gray-400  items-center  text-center cursor-pointer'
                        >
                          <label id='images' className='cursor-pointer'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-7 h-7 text-gray-700 dark:text-white mx-auto mb-4'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                              />
                            </svg>
                            <h5 className=' text-xs font-bold tracking-tight dark:text-white text-gray-700'>
                              Thêm ảnh
                            </h5>
                          </label>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='max-w-sm h-[14rem] w-[22rem] flex justify-center dark:bg-slate-950  bg-gray-100 border-dashed border-2 border-gray-400  items-center mx-auto text-center cursor-pointer'>
                      <label onClick={handleImageClick} id='images' className='cursor-pointer'>
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
                        <p className='font-normal text-sm dark:text-white text-gray-400'>
                          Chọn 1 đến 5 ảnh theo định dạng <b className='dark:text-white text-gray-600'>JPG, PNG</b>.
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
                  multiple
                  accept='image/jpeg, image/png'
                />
              </div>
            )}
            <div className='flex justify-between mx-2'>
              <div className='' onClick={() => setShowImagePopup(!showImagePopup)}>
                <BsFillImageFill className='text-2xl text-blue-700 dark:text-blue-300 cursor-pointer' />
              </div>
              <div className='relative'>
                <MdEmojiEmotions
                  className='text-3xl  text-red-500 dark:text-pink-500 cursor-pointer'
                  onClick={() => setShowEmoji(!showEmoji)}
                />
                {showEmoji && (
                  <div className='absolute right-8 bottom-[-4rem]'>
                    <Picker
                      data={data}
                      emojiSize={18}
                      emojiButtonSize={25}
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
            <div className='border dark:border-gray-700 my-2 border-red-200 '></div>
            <div className='flex items-center justify-center'>
              {uploadMutation.isPending ? (
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
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
