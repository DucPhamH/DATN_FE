import { useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function InputEmoji({ content, setContent, handleCreateComment }) {
  const theme = localStorage.getItem('theme')
  const [showEmoji, setShowEmoji] = useState(false)

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split('-')
    const codeArray = []
    sym.forEach((el) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setContent(content + emoji)
  }

  return (
    <form onSubmit={(e) => handleCreateComment(e)} className='relative'>
      <input
        className='pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20'
        type='text'
        placeholder='Viết bình luận'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <span className='flex cursor-pointer hover:text-red-600 absolute right-3 top-2/4 -mt-3 items-center'>
        <svg
          onClick={() => setShowEmoji(!showEmoji)}
          className='mr-2'
          style={{ width: 26, height: 26 }}
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z'
          ></path>
        </svg>
        <svg
          onClick={(e) => handleCreateComment(e)}
          className='fill-blue-500 dark:fill-slate-50'
          style={{ width: 24, height: 24 }}
          viewBox='0 0 24 24'
        >
          <path d='M2,21L23,12L2,3V10L17,12L2,14V21Z' />
        </svg>
      </span>
      {showEmoji && (
        <div className='absolute right-20 bottom-0'>
          <Picker
            data={data}
            emojiSize={15}
            emojiButtonSize={25}
            onEmojiSelect={addEmoji}
            maxFrequentRows={0}
            previewPosition='none'
            locale='vi'
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </div>
      )}
    </form>
  )
}
