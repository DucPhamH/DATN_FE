import RecipeCard from '../../components/CardComponents/RecipeCard'
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai'
import { FaLightbulb } from 'react-icons/fa'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import useQueryConfig from '../../hooks/useQueryConfig'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { getCategoryRecipes, getListRecipesForUser } from '../../apis/recipeApi'

export default function Recipe() {
  const navigate = useNavigate()
  const queryConfig = omit(useQueryConfig(), ['page'])

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category-recipe'],
    queryFn: () => {
      return getCategoryRecipes()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const fetchRecipes = async ({ pageParam }) => {
    return await getListRecipesForUser({ page: pageParam, ...queryConfig })
  }

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['recipes-list-user', queryConfig],
    queryFn: fetchRecipes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // const nextPage = lastPage.data.result.blogs.length ? allPages.length + 1 : undefined
      const nextPage = lastPage.data.result.page + 1
      if (nextPage > lastPage.data.result.totalPage) return undefined
      return nextPage
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  const handleChangeSort = (e) => {
    navigate({
      pathname: '/cooking/recipe',
      search: createSearchParams({
        ...queryConfig,
        sort: e.target.value
      }).toString()
    })
  }

  const handleChangeDifficultLevel = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...omit(queryConfig, ['difficult_level'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...queryConfig,
          difficult_level: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeProcessingFood = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...omit(queryConfig, ['processing_food'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...queryConfig,
          processing_food: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeRegion = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...omit(queryConfig, ['region'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...queryConfig,
          region: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeIntervalTime = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...omit(queryConfig, ['interval_time'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...queryConfig,
          interval_time: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...omit(queryConfig, ['category_recipe_id'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...queryConfig,
          category_recipe_id: e.target.value
        }).toString()
      })
    }
  }

  const handleChangeType = (e) => {
    if (e.target.value === 'all') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...omit(queryConfig, ['type'])
        }).toString()
      })
    } else {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams({
          ...queryConfig,
          type: e.target.value
        }).toString()
      })
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchRecipes: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.searchRecipes === '') {
      navigate({
        pathname: '/cooking/recipe',
        search: createSearchParams(
          omit({ ...queryConfig }, [
            'status',
            'category_recipe_id',
            'page',
            'difficult_level',
            'region',
            'processing_food',
            'interval_time',
            'search',
            'type'
          ])
        ).toString()
      })
      return
    }
    navigate({
      pathname: '/cooking/recipe',
      search: createSearchParams(
        omit({ ...queryConfig, search: data.searchRecipes }, [
          'status',
          'category_recipe_id',
          'page',
          'difficult_level',
          'region',
          'processing_food',
          'interval_time',
          'type'
        ])
      ).toString()
    })
  })
  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      <div className='grid mx-2 md:gap-10 grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-3 '>
          <div className=''>
            <div className='mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Bài viết nấu ăn</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
              {checkTime()}
            </div>
            <div className='flex items-center justify-end'>
              <form onSubmit={onSubmitSearch} className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'>
                <div className='relative'>
                  <input
                    autoComplete='off'
                    type='search'
                    id='search_input'
                    {...register('searchRecipes')}
                    placeholder='Tìm kiếm bài viết'
                    className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                  />
                  <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                    <AiOutlineSearch />
                  </button>
                </div>
              </form>
              <div
                onClick={() => navigate('/search-image')}
                className=' hover:text-red-600 h-[34px] w-[34px] flex items-center justify-center ml-2 border bg-white p-1 rounded-lg dark:bg-slate-800 dark:border-none cursor-pointer'
              >
                <AiOutlineCamera size={30} />
              </div>
            </div>
            <div className='flex mt-2 justify-end '>
              <div className='flex flex-wrap gap-2 md:gap-3 xl:justify-end items-center'>
                <select
                  onChange={handleChangeSort}
                  defaultValue={queryConfig.sort}
                  id='sort'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='desc'>Mới nhất</option>
                  <option value='asc'>Lâu nhất</option>
                </select>
                <select
                  defaultValue={queryConfig.processing_food || 'all'}
                  onChange={handleChangeProcessingFood}
                  id='status'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Cách làm</option>
                  <option value='Lẩu'>Lẩu</option>
                  <option value='Xào'>Xào</option>
                  <option value='Nướng'>Nướng</option>
                  <option value='Hấp'>Hấp</option>
                  <option value='Chiên'>Chiên</option>
                  <option value='Kho'>Kho</option>
                  <option value='Hầm'>Hầm</option>
                  <option value='Gỏi/Trộn'>Gỏi/Trộn</option>
                  <option value='Canh/Súp'>Canh/Súp</option>
                  <option value='Quay'>Quay</option>
                  <option value='Om/Rim'>Om/Rim</option>
                  <option value='Rang'>Rang</option>
                  <option value='Đồ sống'>Đồ sống</option>
                  <option value='Khác'>Khác</option>
                </select>
                <select
                  defaultValue={queryConfig.region || 'all'}
                  onChange={handleChangeRegion}
                  id='status'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Vùng miền</option>
                  <option value='0'>Miền Bắc</option>
                  <option value='1'>Miền Trung</option>
                  <option value='2'>Miền Nam</option>
                  <option value='3'>Món Á</option>
                  <option value='4'>Món Âu</option>
                </select>
                <select
                  defaultValue={queryConfig.interval_time || 'all'}
                  onChange={handleChangeIntervalTime}
                  id='status'
                  className='select  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Thời gian</option>
                  <option value='0'>Dưới 15 phút</option>
                  <option value='1'>Từ 15 đến 30 phút</option>
                  <option value='2'>Từ 30 đến 60 phút</option>
                  <option value='3'>Từ 60 đến 120 phút</option>
                  <option value='4'>Trên 120 phút</option>
                </select>
                <select
                  defaultValue={queryConfig.difficult_level || 'all'}
                  onChange={handleChangeDifficultLevel}
                  id='status'
                  className='select select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Độ khó</option>
                  <option value='0'>Dễ</option>
                  <option value='1'>Trung bình</option>
                  <option value='2'>Khó</option>
                </select>
                <select
                  defaultValue={queryConfig.type || 'all'}
                  onChange={handleChangeType}
                  id='status'
                  className='select my-2  select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='all'>Bài viết</option>
                  <option value='0'>Đầu bếp</option>
                  <option value='1'>CookHealthy</option>
                </select>

                {isLoadingCategory ? (
                  <Loading className='flex ml-4' />
                ) : (
                  <select
                    defaultValue={queryConfig.category_recipe_id || 'all-category'}
                    onChange={handleChangeCategory}
                    id='category'
                    className='select select-sm bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='all-category'>Tất cả thể loại</option>
                    {category?.data?.result.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                )}
              </div>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
              {data?.pages?.map((dataRecipes) =>
                dataRecipes.data.result.recipes.map((recipe) => {
                  return <RecipeCard key={recipe._id} recipe={recipe} />
                })
              )}
            </div>
          )}
          <div className='w-full'>
            <button
              className='btn w-full mt-4 hover:bg-red-800 mb-6 text-xl bg-red-900 dark:bg-pink-700 dark:disabled:bg-slate-700 dark:disabled:text-gray-400 disabled:text-black text-gray-200'
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Đang tải ...' : hasNextPage ? 'Xem thêm kết quả khác' : 'Không còn bài viết nào'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const checkTime = () => {
  var day = new Date()
  var hr = day.getHours()
  if (hr >= 0 && hr < 12) {
    return (
      <>
        <div className=' mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Bữa sáng khởi động quá trình trao đổi chất, giúp đốt cháy calo, nó cũng cung cấp năng lượng cần để hoàn
            thành công việc. Đó là một trong những lý do tại sao bữa sáng được xem là bữa ăn quan trọng nhất trong ngày.
          </div>
        </div>
      </>
    )
  } else if (hr == 12) {
    return (
      <>
        <div className=' mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Nghiên cứu cho thấy, bữa trưa tốt nhất là nên được ăn sau không quá 4 tiếng so với bữa sáng. Bữa trưa chiếm
            đến 40% khẩu phần ăn trong ngày, cung cấp nhiều nguồn năng lượng nhất, nên dù bạn đã ăn bữa sáng thật no thì
            cũng không thể bỏ qua một bữa trưa để nạp năng lượng cho ngày dài còn lại.
          </div>
        </div>
      </>
    )
  } else if (hr >= 12 && hr <= 17) {
    return (
      <>
        <div className=' mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Vào thời gian này, năng lượng được cung cấp từ thực phẩm của bữa trưa đã tiêu hao gần hết. Bổ sung dinh
            dưỡng bằng 1 bữa ăn nhẹ buổi chiều sẽ giúp bạn làm việc có hiệu quả hơn vào cuối giờ chiều.
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className=' mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
          <div className='m-1 flex justify-center gap-2'>
            <div className='mt-1'>
              <FaLightbulb />
            </div>
            Khi ăn tối sớm, dạ dày của bạn sẽ có nhiều thời gian hơn để tiêu hóa thức ăn. Quá trình xử lý thức ăn kéo
            dài sẽ giúp các dưỡng chất được hấp thu vào cơ thể tốt hơn. Các chuyên gia dinh dưỡng khuyên rằng thời gian
            lý tưởng nhất cho bữa tối là trước 19h.
          </div>
        </div>
      </>
    )
  }
}
