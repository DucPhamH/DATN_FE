import useravatar from '../../../assets/images/useravatar.jpg'

export default function ToastCustorm({ t, name, content, avatar }) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-xs w-full bg-white dark:bg-color-primary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5'>
            <img className='h-10 w-10 rounded-full' src={avatar === '' ? useravatar : avatar} alt='' />
          </div>
          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-gray-900 dark:text-white'>{name}</p>
            <p className='mt-1 text-sm text-gray-500'>{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
