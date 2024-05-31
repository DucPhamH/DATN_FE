import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { omit } from 'lodash'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import Loading from '../../../../components/GlobalComponents/Loading'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import Input from '../../../../components/InputComponents/Input'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaAddItemMeal, schemaAddQuantityMeal } from '../../../../utils/rules'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import PaginationNotUrl from '../../../../components/GlobalComponents/PaginationNotUrl'
import { getCategoryIngredients, getIngredients } from '../../../../apis/ingredientApi'
import ModalLayout from '../../../../layouts/ModalLayout'
import { createMealItem } from '../../../../apis/mealScheduleApi'
import { queryClient } from '../../../../main'
export default function CreateItemSchedule({ meal }) {
  const [mealState, setMealState] = useState([])
  const [timeMeal, setTimeMeal] = useState(meal?.start_date ? new Date(meal?.start_date) : new Date())

  const [query, setQuery] = useState({
    page: '1'
  })

  const { data: categoryData } = useQuery({
    queryKey: ['ingredient-category'],
    queryFn: () => {
      return getCategoryIngredients()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['list-ingredients', query],
    queryFn: () => {
      return getIngredients(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { register: registerIngredients, handleSubmit: handleSubmitIngredients } = useForm({
    defaultValues: {
      searchIngredients: query.search || ''
    }
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      meal_name: '',
      quantity: '',
      unit: 'DEFAULT',
      energy: '',
      protein: '',
      fat: '',
      carb: ''
    },
    resolver: yupResolver(schemaAddItemMeal)
  })

  const handleChangeTime = (e) => {
    setTimeMeal(e)
  }

  const onSubmit = handleSubmit((data) => {
    // thêm id ngẫu nhiên của workout vào data
    const dataWithId = {
      ...data,
      id: uuidv4(),
      energy: parseFloat((data.quantity * data.energy).toFixed(1)),
      protein: parseFloat((data.quantity * data.protein).toFixed(1)),
      fat: parseFloat((data.quantity * data.fat).toFixed(1)),
      carb: parseFloat((data.quantity * data.carb).toFixed(1))
    }
    setMealState((prev) => [...prev, dataWithId])
    reset()
  })

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      setQuery((prev) => {
        return omit(prev, ['ingredient_category_ID'])
      })
    } else {
      setQuery((prev) => {
        return { ...prev, ingredient_category_ID: e.target.value }
      })
    }
  }

  const onSubmitSearch = handleSubmitIngredients((data) => {
    if (data.searchIngredients === '') {
      return setQuery((prev) => omit(prev, ['ingredient_category_ID', 'page', 'search']))
    }
    setQuery((prev) => {
      return omit({ ...prev, search: data.searchIngredients }, ['ingredient_category_ID', 'page'])
    })
  })

  const createMealItemMutation = useMutation({
    mutationFn: (body) => createMealItem(body)
  })

  const onSubmitAddActivity = (e) => {
    e.preventDefault()

    if (mealState.length === 0) {
      toast.error('Chưa có món ăn nào được thêm')
      return
    }
    // thêm thời gian tập luyện vào mảng và loại bỏ id
    const arrayMealItems = mealState.map((item) => {
      return {
        meal_name: item.meal_name,
        quantity: item.quantity,
        unit: item.unit,
        energy: item.energy,
        protein: item.protein,
        fat: item.fat,
        carb: item.carb,
        meal_schedule_id: meal._id,
        current_date: timeMeal
      }
    })

    // call api add activity

    createMealItemMutation.mutate(arrayMealItems, {
      onSuccess: async (data) => {
        console.log(data)
        toast.success('Thêm hoạt động thành công')
        setMealState([])
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['date-meal-items']
          }),
          queryClient.invalidateQueries({
            queryKey: ['line-data-meal']
          })
        ])
      },
      onError: () => {
        console.log('error')
      }
    })
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 mx-2 gap-2'>
      <div className=' max-w-3xl w-full p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary   border border-gray-200 rounded-lg shadow mx-auto'>
        <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Thêm ngày ăn uống</h2>
        <form noValidate onSubmit={onSubmitAddActivity} className=''>
          <div className='grid gap-4 sm:grid-cols-2 sm:gap-2'>
            <div className='sm:col-span-2'>
              <div className='w-full  flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Nhập ngày ăn uống
                </label>
                <DatePicker
                  className='bg-white  border-gray-300 border p-1 rounded-lg dark:bg-gray-900 dark:text-gray-300 text-gray-900'
                  minDate={meal?.start_date}
                  maxDate={meal?.end_date}
                  selected={timeMeal}
                  onChange={handleChangeTime}
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <div className='w-full  flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Hoạt động được thêm
                </label>
                {mealState.length === 0 ? (
                  <div className='text-gray-500 dark:text-gray-300'>Chưa có hoạt động nào được thêm</div>
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên hoạt động
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Lượng calories
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Số lượng
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Xóa
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                      {mealState.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.meal_name}
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.energy} cal
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.unit === 'gram'
                                  ? parseFloat(item.quantity * 100).toFixed(1) + ' gram'
                                  : item.quantity + ' ' + item.unit}
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <button
                                onClick={() => {
                                  setMealState((prev) => prev.filter((i) => i.id !== item.id))
                                }}
                                className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
                              >
                                <div className='flex gap-1 items-center justify-center'>X</div>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {createMealItemMutation.isPending ? (
            <button disabled className='block my-5 btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
              <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
            </button>
          ) : (
            <button className='btn my-5 btn-sm text-white hover:bg-red-900 bg-red-800'> Lưu</button>
          )}
        </form>
        <form onSubmit={onSubmit} className='mt-10' noValidate>
          <p className='text-sm my-3 font-semibold border-t border-gray-400 pt-2 mt-5 italic'>
            Chú ý: nếu bạn không tìm thấy món ăn nào phù hợp, vui lòng nhập vào form bên dưới
          </p>
          <Input
            title='Nhập tên món ăn'
            type='text'
            name='meal_name'
            id='meal_name'
            register={register}
            errors={errors.meal_name}
            placeholder='Nhập tên món ăn'
          />
          <div className='flex flex-wrap gap-2 items-center'>
            <Input
              title='Nhập số lượng'
              type='number'
              name='quantity'
              register={register}
              errors={errors.quantity}
              id='quantity'
              placeholder='Nhập số lượng'
            />
            <div className='mb-2'>
              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Nhập đơn vị
              </div>
              <select
                defaultValue='DEFAULT'
                {...register('unit')}
                className='select select-sm mb-1 border border-gray-300 bg-white dark:bg-slate-800 dark:border-none'
              >
                <option value='DEFAULT'>Nhập đơn vị</option>
                <option value='gram'>gram</option>
                <option value='ml'>ml</option>
                <option value='cái'>cái</option>
                <option value='đĩa'>đĩa</option>
                <option value='ổ'>ổ</option>
                <option value='lát'>lát</option>
                <option value='gói'>gói</option>
                <option value='tách/chén'>tách/chén</option>
                <option value='cốc/ly'>cốc/ly</option>
                <option value='lon'>lon</option>
                <option value='tô/bát'>tô/bát</option>
                <option value='hũ/hộp'>hũ/hộp</option>
                <option value='chai'>chai</option>
                <option value='cuốn'>cuốn</option>
                <option value='viên'>viên</option>
                <option value='trái/quả'>trái/quả</option>
              </select>

              <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                {errors.unit?.message}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 items-center'>
            <Input
              title='Nhập lượng calories'
              type='number'
              register={register}
              errors={errors.energy}
              name='energy'
              id='energy'
              placeholder='Nhập lượng calories'
            />
            <Input
              title='Nhập lượng protein'
              type='number'
              register={register}
              errors={errors.protein}
              name='protein'
              id='protein'
              placeholder='Nhập lượng protein'
            />
          </div>
          <div className='flex flex-wrap gap-2 items-center'>
            <Input
              title='Nhập lượng fat'
              type='number'
              register={register}
              errors={errors.fat}
              name='fat'
              id='fat'
              placeholder='Nhập lượng fat'
            />

            <Input
              title='Nhập lượng carb'
              type='number'
              register={register}
              errors={errors.carb}
              name='carb'
              id='carb'
              placeholder='Nhập lượng carb'
            />
          </div>
          <button className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
            <div className='flex gap-1 items-center justify-center'>Thêm hoạt động</div>
          </button>
        </form>
      </div>

      <div className=' blog-view  max-w-3xl w-full dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary border border-gray-200 rounded-lg shadow mx-auto'>
        <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>
          Bảng tham khảo món ăn: (giá trị dinh dưỡng trên 100g)
        </h2>
        <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
          <main className=' '>
            <div className='mx-1'>
              <div className='font-medium mb-2'></div>
              <div className='mb-2'>
                <div className='flex flex-wrap gap-3  items-center'>
                  <form
                    id='form-activity'
                    onSubmit={onSubmitSearch}
                    noValidate
                    className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'
                  >
                    <div className='relative'>
                      <input
                        autoComplete='off'
                        type='search'
                        id='search_input'
                        {...registerIngredients('searchIngredients')}
                        placeholder='Tìm kiếm bài viết'
                        className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                      />
                      <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                        <AiOutlineSearch />
                      </button>
                    </div>
                  </form>

                  <select
                    defaultValue={query.ingredient_category_ID || 'all-category'}
                    onChange={handleChangeCategory}
                    id='category'
                    className='select select-sm my-2  bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='all-category'>Tất cả thể loại</option>
                    {categoryData?.data?.result.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className='border-[2px] my-3 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                {isLoading ? (
                  <Loading className='w-full my-3 flex justify-center' />
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên hoạt động
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Lượng calories
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Thêm
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                      {data?.data?.result.ingredients.map((ingredient) => {
                        return (
                          <IngredientItem key={ingredient._id} ingredient={ingredient} setMealState={setMealState} />
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              {data?.data.result.ingredients.length === 0 && (
                <div className='flex justify-center items-center py-4'>
                  <div className='text-gray-500 dark:text-gray-300'>Không có món ăn nào</div>
                </div>
              )}
              {data?.data.result.totalPage > 1 && (
                <div className='flex justify-center mb-5 items-center'>
                  <PaginationNotUrl pageSize={data?.data.result.totalPage} query={query} setQuery={setQuery} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

const IngredientItem = ({ ingredient, setMealState }) => {
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      quantity: ''
    },
    resolver: yupResolver(schemaAddQuantityMeal)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // newQuantity là bằng quantity / 100 và chuyển đổi thành số thập phân
    const newQuantity = parseFloat(data.quantity) / 100
    console.log(newQuantity)

    const dataWithId = {
      id: uuidv4(),
      meal_name: ingredient.name,
      quantity: newQuantity,
      unit: 'gram',
      energy: parseFloat((ingredient.energy * newQuantity).toFixed(1)),
      protein: parseFloat((ingredient.protein * newQuantity).toFixed(1)),
      fat: parseFloat((ingredient.fat * newQuantity).toFixed(1)),
      carb: parseFloat((ingredient.carbohydrate * newQuantity).toFixed(1))
    }
    console.log(dataWithId)

    setMealState((prev) => [...prev, dataWithId])
    setOpenModal(false)
    reset()
  })
  return (
    <tr>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{ingredient.name}</span>
      </td>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{ingredient.energy} cal</span>
      </td>
      <td className='px-6 py-4 '>
        <button
          onClick={() => {
            setOpenModal(true)
          }}
          className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <FaPlus />
          </div>
        </button>
        {openModal && (
          <ModalLayout
            closeModal={() => setOpenModal(false)}
            className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
          >
            <div className='relative w-full max-w-md max-h-full'>
              <div className=''>
                <div className='flex justify-between'>
                  <div className='px-3 py-1'></div>
                  <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>
                    Thêm lượng đồ ăn
                  </h3>
                  <div className='text-2xl font-semibold'>
                    <span
                      onClick={() => setOpenModal(false)}
                      className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
                    >
                      &times;
                    </span>
                  </div>
                </div>

                <div className='border dark:border-gray-700 border-red-200 '></div>
                <section className='w-full mx-auto items-center '>
                  <form onSubmit={onSubmit} noValidate className='p-3'>
                    <Input
                      title='Nhập lượng ăn (gram)'
                      type='number'
                      name='quantity'
                      id='quantity'
                      register={register}
                      errors={errors.quantity}
                      placeholder='Nhập lượng ăn'
                    />

                    <div className='flex justify-center'>
                      <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Thêm món ăn</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </ModalLayout>
        )}
      </td>
    </tr>
  )
}
