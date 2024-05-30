import { Link } from 'react-router-dom'
import { cutString } from '../../../utils/helper'

export default function SearchImageCard({ recipe }) {
  return (
    <div className='border bg-white shadow-md dark:shadow-orange-900 dark:bg-color-primary border-gray-300 dark:border-gray-800 rounded-xl relative'>
      <div className='md:h-[18vh] xl:h-[22vh] rounded-t-xl scale-100 overflow-hidden'>
        <img
          loading='lazy'
          src={recipe.image}
          alt='recipe'
          className='md:h-full w-full object-cover hover:scale-125 transition duration-300 ease-in-out'
        />
      </div>
      <div className='m-3'>
        <div className='hover:text-red-700 transition-all duration-300 cursor-pointer'>
          <Link to={`/cooking/recipe/${recipe._id}`} className='font-bold block h-12 text-base '>
            {cutString(recipe.title, 40)}
          </Link>
        </div>
      </div>
      <div className='mx-3 mb-8'>
        <p className='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'>{recipe.description}</p>
      </div>
    </div>
  )
}
