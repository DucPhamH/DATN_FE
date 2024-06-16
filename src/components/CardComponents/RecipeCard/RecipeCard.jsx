import moment from 'moment'
import { AiFillHeart, AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import { bookmarkRecipe, likeRecipe, unbookmarkRecipe, unlikeRecipe } from '../../../apis/recipeApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../main'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { cutString } from '../../../utils/helper'
import useSound from 'use-sound'
import like from '../../../assets/sounds/like.mp3'
export default function RecipeCard({ recipe }) {
  const location = useLocation()

  const [play] = useSound(like)

  const checkRefetchApi = () => {
    if (location.pathname === '/cooking/recipe') {
      return queryClient.invalidateQueries({
        queryKey: ['recipes-list-user']
      })
    }
    if (location.pathname.includes('/album')) {
      return queryClient.invalidateQueries({
        queryKey: ['recipes-list-album']
      })
    }
    if (location.pathname.includes('/cooking')) {
      return queryClient.invalidateQueries({
        queryKey: ['recipes-list-user']
      })
    }
    if (location.pathname.includes('/bookmark')) {
      return queryClient.invalidateQueries({
        queryKey: ['bookmark']
      })
    }
    if (location.pathname.includes('/me')) {
      return queryClient.invalidateQueries({
        queryKey: ['me-recipe']
      })
    }
    if (location.pathname.includes('/user')) {
      return queryClient.invalidateQueries({
        queryKey: ['user-recipe']
      })
    }
    if (location.pathname.includes('/search')) {
      return queryClient.invalidateQueries({
        queryKey: ['search-all']
      })
    }

    // return queryClient.invalidateQueries(['userPost', data.user._id])
  }
  const likeMutation = useMutation({
    mutationFn: (body) => likeRecipe(body)
  })

  const unlikeMutation = useMutation({
    mutationFn: (body) => unlikeRecipe(body)
  })

  const bookmarkMutation = useMutation({
    mutationFn: (body) => bookmarkRecipe(body)
  })

  const unbookmarkMutation = useMutation({
    mutationFn: (body) => unbookmarkRecipe(body)
  })

  const handleLike = () => {
    if (recipe.is_liked) {
      unlikeMutation.mutate(
        { recipe_id: recipe._id },
        {
          onSuccess: () => {
            checkRefetchApi()
          }
        }
      )
    } else {
      likeMutation.mutate(
        { recipe_id: recipe._id },
        {
          onSuccess: () => {
            play()
            checkRefetchApi()
          }
        }
      )
    }
  }

  const handleBookmark = () => {
    if (recipe.is_bookmarked) {
      unbookmarkMutation.mutate(
        { recipe_id: recipe._id },
        {
          onSuccess: () => {
            checkRefetchApi()
            toast.success('Bỏ lưu thành công')
          }
        }
      )
    } else {
      bookmarkMutation.mutate(
        { recipe_id: recipe._id },
        {
          onSuccess: () => {
            checkRefetchApi()
            toast.success('Lưu vào mục yêu thích thành công')
          }
        }
      )
    }
  }

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
          {recipe.type === 0 ? (
            <span className='block text-gray-400 text-xs'>Người viết: {recipe.user.name}</span>
          ) : (
            <span className=' block text-xs text-gray-400'>
              Người viết: <span className='text-red-500'>Cook</span>Healthy
            </span>
          )}

          <span className='block text-gray-400 text-xs'>
            Ngày viết: {moment(recipe.createdAt).format('MM/DD/YYYY')}
          </span>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center pt-3'>
            <span onClick={handleLike}>
              {!recipe.is_liked ? (
                <CiHeart
                  className='mr-0.5 font-medium hover:text-red-800 cursor-pointer transition-all text-red-500 dark:text-pink-500 dark:hover:text-pink-300'
                  size={25}
                />
              ) : (
                <AiFillHeart
                  className='mr-0.5 text-red-500 hover:text-red-800 cursor-pointer transition-all dark:text-pink-500'
                  size={25}
                />
              )}
            </span>
            {/* <AiFillHeart className='mr-0.5 text-red-500' size={25} /> */}
            <span className=' text-red-700 text-xs font-medium dark:text-gray-300'>
              {recipe.total_likes} lượt thích
            </span>
          </div>
          <div className='flex items-center pt-3'>
            <BsFillLightningChargeFill className='mr-0.5 text-yellow-500' />
            {recipe.difficult_level === 0 ? (
              <span className='text-xs font-medium dark:text-gray-300'>Dễ</span>
            ) : recipe.difficult_level === 1 ? (
              <span className='text-xs font-medium dark:text-gray-300'>Trung bình</span>
            ) : (
              <span className='text-xs font-medium dark:text-gray-300'>Khó</span>
            )}
          </div>
        </div>
      </div>
      <div className='bg-yellow-100 flex justify-center items-center text-gray-600 absolute p-1.5 text-sm rounded-full top-0 left-0 m-2'>
        <AiOutlineClockCircle size={20} />
        <span className='ml-1'>{recipe.time} phút</span>
      </div>
      <span className='absolute top-[-6px] right-0' onClick={handleBookmark}>
        {recipe.is_bookmarked ? (
          <div className='hover:text-yellow-600 cursor-pointer transition-all text-yellow-500'>
            <BsFillBookmarkFill className='' size={25} />
          </div>
        ) : (
          <div className='text-gray-300 hover:text-yellow-500 cursor-pointer transition-all'>
            <BsFillBookmarkFill className='' size={25} />
          </div>
        )}
      </span>
    </div>
  )
}
