import useravatar from '../../../../assets/images/useravatar.jpg'
import { MdEmojiEmotions } from 'react-icons/md'
import { useContext, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import moment from 'moment'
import { useMutation } from '@tanstack/react-query'
import { sharePost } from '../../../../apis/postApi'
import toast from 'react-hot-toast'
import postSound from '../../../../assets/sounds/post.mp3'
import { AppContext } from '../../../../contexts/app.context'
import ModalLayout from '../../../../layouts/ModalLayout'
import { SocketContext } from '../../../../contexts/socket.context'
import useSound from 'use-sound'

export default function ModalSharePost({ handleCloseSharePost, post }) {
  const { profile } = useContext(AppContext)
  const { newSocket } = useContext(SocketContext)
  const [play] = useSound(postSound)
  const [showEmoji, setShowEmoji] = useState(false)
  const [selectedValue, setSelectedValue] = useState('0')
  const [content, setContent] = useState('')
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
  }

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split('-')
    const codeArray = []
    sym.forEach((el) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setContent(content + emoji)
  }

  const uploadMutation = useMutation({
    mutationFn: (body) => sharePost(body)
  })

  const handleSharePost = () => {
    const body = {
      content: content,
      privacy: selectedValue,
      parent_id: post.type === 0 ? post._id : post.parent_post._id
    }

    uploadMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Chia sẻ bài viết thành công')
        newSocket.emit('share post', {
          content: 'Đã chia sẻ bài viết của bạn',
          to: post.user._id,
          name: profile.name,
          avatar: profile.avatar
        })
        play()
        setContent('')
        handleCloseSharePost()
      },
      onError: () => {
        console.log('error')
      }
    })
  }
  const theme = localStorage.getItem('theme')
  return (
    <ModalLayout
      closeModal={handleCloseSharePost}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Chia sẻ bài viết</h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseSharePost}
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
                    {profile.name}
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

            <div className='flex justify-end  mx-2'>
              <div className='relative'>
                <MdEmojiEmotions
                  className='text-3xl text-red-500 dark:text-pink-500 cursor-pointer'
                  onClick={() => setShowEmoji(!showEmoji)}
                />
                {showEmoji && (
                  <div className='absolute right-8 bottom-[-6rem]'>
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
            <CheckTypeOfPost post={post} />
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
                    <button onClick={handleSharePost} className='text-center ml-2'>
                      Chia sẻ
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

function CheckTypeOfPost({ post }) {
  if (post.type === 0) {
    return (
      <>
        <div className='flex justify-between items-start'>
          <div className='flex pb-4 px-4 md:px-0'>
            <div className='flex items-center'>
              <a className='inline-block mr-2' href='#'>
                <img
                  className='rounded-full max-w-none w-7 h-7 md:w-9 md:h-9'
                  src={post.user.avatar === '' ? useravatar : post.user.avatar}
                />
              </a>
              <div className='flex flex-col items-start'>
                <div className='flex items-center'>
                  <a className='inline-block text-xs font-bold mr-2' href='#'>
                    {post.user.name}
                  </a>
                </div>
                <div className='text-slate-500 text-xs dark:text-slate-300'>{moment(post.createdAt).format('L')}</div>
              </div>
            </div>
          </div>
        </div>

        <p className='px-4  truncate line-clamp-2 whitespace-pre-line text-sm md:px-0'>{post.content}</p>

        <CheckLengthOfImages images={post.images} />
      </>
    )
  }
  return (
    <>
      <div className='flex justify-between items-start'>
        <div className='flex pb-4 px-4 md:px-0'>
          <div className='flex mx-3 items-center'>
            <a className='inline-block mr-2' href='#'>
              <img
                className='rounded-full max-w-none w-7 h-7 md:w-9 md:h-9'
                src={post.parent_user.avatar === '' ? useravatar : post.parent_user.avatar}
              />
            </a>
            <div className='flex flex-col items-start'>
              <div className='flex items-center'>
                <a className='inline-block text-xs font-bold mr-2' href='#'>
                  {post.parent_user.name}
                </a>
              </div>
              <div className='text-slate-500 text-xs dark:text-slate-300'>
                {moment(post.parent_post.createdAt).format('L')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className='px-4 h-10 line-clamp-3 whitespace-pre-line text-sm md:px-0'>{post.parent_post.content}</p>

      <CheckLengthOfImages images={post.parent_images} />
    </>
  )
}

function CheckLengthOfImages({ images }) {
  if (images.length === 0) {
    return <div className='pt-5'></div>
  }
  return (
    <div className='py-4 w-[100%] h-[10rem] md:h-[16rem] overflow-hidden'>
      <a className='flex w-[100%] h-[10rem] md:h-[16rem]' href='#'>
        <img className='w-full object-cover rounded-lg' src={images[0]} />
      </a>
    </div>
  )
}
