import { Link, useParams } from 'react-router-dom'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import { FaArrowCircleRight, FaComment, FaEye } from 'react-icons/fa'
import moment from 'moment'
import parse from 'html-react-parser'
import { bookmarkRecipe, getRecipeForUser, likeRecipe, unbookmarkRecipe, unlikeRecipe } from '../../apis/recipeApi'
import { MdPerson } from 'react-icons/md'
import { AiFillHeart, AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillBookmarkFill, BsFillLightningChargeFill } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import Comments from './components/Comments/Comments'
import { queryClient } from '../../main'
import toast from 'react-hot-toast'
import IngerdientItem from './components/IngerdientItem/IngerdientItem'
import useSound from 'use-sound'
import like from '../../assets/sounds/like.mp3'

export default function RecipeDetail() {
  const { id } = useParams()
  const [play] = useSound(like)
  const { data, isLoading } = useQuery({
    queryKey: ['recipe-info-user', id],
    queryFn: () => {
      return getRecipeForUser(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 20
  })
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
    if (data?.data.result.recipe[0].is_liked) {
      unlikeMutation.mutate(
        { recipe_id: data?.data.result.recipe[0]._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['recipe-info-user']
            })
          }
        }
      )
    } else {
      likeMutation.mutate(
        { recipe_id: data?.data.result.recipe[0]._id },
        {
          onSuccess: () => {
            play()
            queryClient.invalidateQueries({
              queryKey: ['recipe-info-user']
            })
          }
        }
      )
    }
  }

  const handleBookmark = () => {
    if (data?.data.result.recipe[0].is_bookmarked) {
      unbookmarkMutation.mutate(
        { recipe_id: data?.data.result.recipe[0]._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['recipe-info-user']
            })
            toast.success('Bỏ lưu thành công')
          }
        }
      )
    } else {
      bookmarkMutation.mutate(
        { recipe_id: data?.data.result.recipe[0]._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['recipe-info-user']
            })
            toast.success('Lưu vào mục yêu thích thành công')
          }
        }
      )
    }
  }

  return (
    <div className=''>
      <div className=''>
        {isLoading ? (
          <div className='mt-24'>
            <Loading />
          </div>
        ) : (
          <div className='relative'>
            <div className='bg-cover bg-center text-center overflow-hidden'>
              <img
                className='object-cover relative lg:rounded-md max-h-[15rem] md:max-h-[26rem] w-[100%]'
                src={data?.data.result.recipe[0].image}
                alt='image'
              />
              <div className='bg-yellow-100 flex font-medium justify-center items-center text-gray-600 absolute p-1.5 text-sm rounded-full top-0 left-0 m-3'>
                <AiOutlineClockCircle size={20} />
                <span className='ml-1'>{data?.data.result.recipe[0].time} phút</span>
              </div>
            </div>
            <div className='max-w-6xl mx-auto'>
              <div className=' bg-white dark:bg-color-primary rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal'>
                <div className='bg-white dark:bg-color-primary relative top-0 lg:-mt-32 py-5 px-3 md:p-5 sm:px-10'>
                  <span onClick={handleBookmark} className='absolute top-[-6px] right-0'>
                    {data?.data.result.recipe[0].is_bookmarked ? (
                      <div className='hover:text-yellow-600 cursor-pointer transition-all text-yellow-500'>
                        <BsFillBookmarkFill className='' size={40} />
                      </div>
                    ) : (
                      <div className='text-gray-300 hover:text-yellow-500 cursor-pointer transition-all'>
                        <BsFillBookmarkFill className='' size={40} />
                      </div>
                    )}
                  </span>
                  <header className='not-format'>
                    <div>
                      <span className='font-medium flex items-center flex-wrap mb-3 md:gap-2 md:mb-0 text-gray-500'>
                        <span className='mr-2'>{moment(data?.data.result.recipe[0].createdAt).format('LLLL')}</span>

                        <div className='flex text-sm text-blue-400 gap-2'>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                            {data?.data.result.recipe[0].category_recipe.name}
                          </span>{' '}
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                            {data?.data.result.recipe[0].processing_food}
                          </span>{' '}
                          {data?.data.result.recipe[0].region === 0 ? (
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              Miền bắc
                            </span>
                          ) : data?.data.result.recipe[0].region === 1 ? (
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              Miền trung
                            </span>
                          ) : data?.data.result.recipe[0].region === 2 ? (
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              Miền nam
                            </span>
                          ) : data?.data.result.recipe[0].region === 3 ? (
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              Món Á
                            </span>
                          ) : (
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                              Món Âu
                            </span>
                          )}
                        </div>
                      </span>

                      <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                        {data?.data.result.recipe[0].title}
                      </h1>
                      <div className='flex flex-wrap items-center pb-5  gap-2 justify-between'>
                        <div className='pt-3 text-sm flex gap-2 flex-wrap'>
                          <div className='flex font-medium pr-3 text-gray-500  border-r-2 flex-row items-center'>
                            <MdPerson className='text-lg text-green-500 mr-1' />
                            {data?.data.result.recipe[0].type === 0 ? (
                              <span className=''>{data?.data.result.recipe[0].user.name}</span>
                            ) : (
                              <span className=' block text-gray-500'>
                                <span className='text-red-500'>Cook</span>Healthy
                              </span>
                            )}
                          </div>
                          <div className='flex flex-row items-center text-gray-500 font-medium pr-3 border-r-2  '>
                            <BsFillLightningChargeFill className=' text-yellow-500 mr-1' />
                            {data?.data.result.recipe[0].difficult_level === 0 ? (
                              <span className=''>Dễ</span>
                            ) : data?.data.result.recipe[0].difficult_level === 1 ? (
                              <span className=''>Trung bình</span>
                            ) : (
                              <span className=''>Khó</span>
                            )}
                          </div>
                          <div className='flex flex-row items-center text-gray-500 font-medium pr-3 border-r-2  '>
                            <FaEye className='text-blue-400 mr-1' />
                            <span className=''> {data?.data.result.recipe[0].user_view} lượt xem</span>
                          </div>
                          <div className='flex flex-row items-center text-gray-500 font-medium pr-3 border-r-2 '>
                            <BsFillBookmarkFill className='text-yellow-500 mr-1' />
                            <span className=''> {data?.data.result.recipe[0].total_bookmarks} lượt lưu</span>
                          </div>
                          <div className='flex flex-row items-center text-gray-500 font-medium pr-3 border-r-2 '>
                            <AiFillHeart className='text-red-400 mr-1' />
                            <span className=''> {data?.data.result.recipe[0].total_likes} lượt thích</span>
                          </div>
                          <div className='flex pr-3 flex-row text-gray-500 font-medium items-center'>
                            <FaComment className='text-blue-400 mr-1' />
                            {data?.data.result.recipe[0].total_comments} bình luận
                          </div>
                        </div>
                        <span onClick={handleLike}>
                          {!data?.data.result.recipe[0].is_liked ? (
                            <button className='block btn btn-xs  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
                              <div className='flex text-xs justify-center gap-1 items-center'>
                                <AiFillHeart /> <div>Thích</div>
                              </div>
                            </button>
                          ) : (
                            <button className='block btn btn-xs  md:inline-block md:w-auto  bg-blue-400 hover:bg-blue-500 border-none text-white rounded-lg font-semibold text-sm  md:order-2'>
                              <div className='flex text-xs justify-center gap-1 items-center'>
                                <FaCheckCircle /> <div>Bỏ thích</div>
                              </div>
                            </button>
                          )}
                        </span>
                      </div>
                    </div>
                  </header>
                  {data?.data.result.recipe[0].unit === '' ? null : (
                    <div className='flex gap-2 flex-wrap mb-10 items-center'>
                      <div className='bg-yellow-50 flex font-medium justify-center items-center text-gray-600  p-1.5 text-sm rounded-full'>
                        <span className='ml-1'>
                          {data?.data.result.recipe[0].energy} calories trên {data?.data.result.recipe[0].quantity}{' '}
                          {data?.data.result.recipe[0].unit}
                        </span>
                      </div>
                      <div className='bg-yellow-50 flex font-medium justify-center items-center text-gray-600  p-1.5 text-sm rounded-full'>
                        <span className='ml-1'>{data?.data.result.recipe[0].protein} gram protein</span>
                      </div>
                      <div className='bg-yellow-50 flex font-medium justify-center items-center text-gray-600  p-1.5 text-sm rounded-full'>
                        <span className='ml-1'>{data?.data.result.recipe[0].fat} gram chất béo</span>
                      </div>
                      <div className='bg-yellow-50 flex font-medium justify-center items-center text-gray-600  p-1.5 text-sm rounded-full'>
                        <span className='ml-1'>{data?.data.result.recipe[0].carbohydrate} gram carbohydrate</span>
                      </div>
                    </div>
                  )}

                  <p className='lead mb-3 whitespace-pre-line font-medium'>{data?.data.result.recipe[0].description}</p>
                  <div className='border rounded-md w-full shadow-md mb-4 bg-[#fef8f8] dark:bg-gray-900 dark:border-none to-gray-300 p-3'>
                    <div className='font-medium'>Gợi ý dành cho bạn:</div>
                    <ul>
                      {data?.data.result.arrayRecipes.map((recipe) => {
                        return (
                          <li key={recipe._id} className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                            <div>
                              <FaArrowCircleRight size={18} className='text-xl' />
                            </div>

                            <Link to={`/cooking/recipe/${recipe._id}`} className=' hover:underline'>
                              {recipe.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  {data?.data.result.recipe[0].video === '' ? null : (
                    <div className=''>
                      <div className='w-full mb-4 lg:h-[30rem]'>
                        <iframe
                          className='w-full h-[20rem]  rounded-md lg:h-[30rem] shadow-md border '
                          src={
                            data?.data.result.recipe[0].video.includes('watch?v=')
                              ? data?.data.result.recipe[0].video.replace('watch?v=', 'embed/')
                              : data?.data.result.recipe[0].video
                          }
                          title='YouTube video player'
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                  {/* nếu có mảng ingredients thì hiển thị nếu ko có mảng hoặc mảng rỗng thì ẩn */}
                  {data?.data.result.recipe[0]?.ingredients?.length === 0 ||
                  data?.data.result.recipe[0]?.ingredients === undefined ? null : (
                    <>
                      <div className=' border-[2px] mb-2 mt-4 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                        <table className=' w-full shadow-md  divide-y divide-gray-200'>
                          <thead className='bg-gray-50 dark:bg-slate-800 '>
                            <tr>
                              <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                              >
                                Tên nguyên liệu
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                              >
                                Năng lượng
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                              >
                                Protein
                              </th>

                              <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                              >
                                Chất béo
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                              >
                                Carbohydrate
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                            {data?.data.result.recipe[0]?.ingredients.map((ingerdient) => {
                              return <IngerdientItem key={ingerdient._id} ingredient={ingerdient} />
                            })}
                          </tbody>
                        </table>
                      </div>
                      <span className='w-full text-gray-400 mb-6 text-sm leading-4 font-medium flex items-center justify-center'>
                        Bảng giá trị dinh dưỡng trên 100g nguyên liệu tạo nên món ăn
                      </span>
                    </>
                  )}
                  <div className='custorm-blog '>{parse(data?.data.result.recipe[0]?.content)}</div>
                </div>
                <Comments recipe={data?.data.result.recipe[0]} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
