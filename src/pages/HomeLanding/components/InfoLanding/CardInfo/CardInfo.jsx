import { Link } from 'react-router-dom'
export default function CardInfo({ infoItem }) {
  return (
    <Link
      to='/login'
      className='border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer dark:hover:border-white hover:border-red-500 dark:hover:bg-color-primary hover:bg-yellow-100 ease-in duration-200'
    >
      <div className='bg-color-secondary inline-block rounded-2xl py-5 px-6'>
        <div className='text-white text-4xl'>{infoItem.icon}</div>
      </div>
      <h3 className='text-2xl font-bold py-4'>{infoItem.title}</h3>
      <p className='leading-relaxed text-lg'>{infoItem.description}</p>
    </Link>
  )
}
