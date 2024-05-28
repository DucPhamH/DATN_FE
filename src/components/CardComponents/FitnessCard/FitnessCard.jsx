import { Link } from 'react-router-dom'

export default function FitnessCard({ fitnessItem }) {
  return (
    <Link
      to={fitnessItem.link}
      className='flex cursor-pointer items-center shadow-md dark:shadow-orange-900 p-4 bg-white rounded-lg  dark:bg-gray-800'
    >
      <div className={`p-3 mr-4 text-white rounded-full dark:text-white ${fitnessItem.color}`}>
        <img className='h-8 w-8' src={fitnessItem.image} alt='finess' />
      </div>
      <div>
        <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>{fitnessItem.name}</p>
        <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>{fitnessItem.description}</p>
      </div>
    </Link>
  )
}
