import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'

import { IoMdHome } from 'react-icons/io'
import Input from '../../components/InputComponents/Input'
import TextArea from '../../components/InputComponents/TextArea'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUpdateRecipe } from '../../utils/rules'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { queryClient } from '../../main'
import EditConfirmBox from '../../components/GlobalComponents/EditConfirmBox'
import { getCategoryRecipes, getRecipeForChef, updateRecipeForChef } from '../../apis/recipeApi'
import { formats, modules } from '../../constants/editorToolbar'

export default function EditRecipe() {
  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isFetching: isFetchingRecipe } = useQuery({
    queryKey: ['recipe-info', id],
    queryFn: () => {
      return getRecipeForChef(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })
  const recipe = data?.data.result[0]
  // console.log(recipe)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaUpdateRecipe),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      category_recipe_id: 'DEFAULT',
      content: '',
      video: '',
      time: '',
      difficult_level: 'DEFAULT',
      region: 'DEFAULT',
      processing_food: 'DEFAULT'
    }
  })
  // console.log(id)

  const editRecipeMutation = useMutation({
    mutationFn: (body) => updateRecipeForChef(id, body)
  })
  const onSubmit = handleSubmit((data) => {
    if (data.image === '' || data.image === undefined || data.image === null || data.image.length === 0) {
      delete data.image
    }

    console.log(data)

    var formData = new FormData()

    for (const key in data) {
      if (key === 'image') {
        if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key][0])
        }
      } else {
        formData.append(key, data[key])
      }
    }

    editRecipeMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Chỉnh sửa bài viết thành công')
        handleCloseEdit()
        queryClient.invalidateQueries({
          queryKey: ['recipe-info']
        })
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  useEffect(() => {
    if (recipe) {
      setValue('title', recipe.title)
      setValue('description', recipe.description)
      setValue('content', recipe.content)
      setValue('video', recipe.video)
      setValue('category_recipe_id', recipe.category_recipe._id)
      setValue('time', recipe.time)
      setValue('difficult_level', recipe.difficult_level)
      setValue('region', recipe.region)
      setValue('processing_food', recipe.processing_food)
    }
  }, [recipe, setValue])

  const onEditorStateChange = (editorState) => {
    setValue('content', editorState)
  }
  const content = watch('content')
  const descriptionWatch = watch('description')
  const titleWatch = watch('title')
  const imageWatch = watch('image')

  const { data: category, isFetching } = useQuery({
    queryKey: ['category-recipe'],
    queryFn: () => {
      return getCategoryRecipes()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center pt-3 px-8'>
        <div className='mb-2'>
          <div className='text-xl md:text-2xl font-medium mb-2'>
            <span>Chỉnh sửa bài viết nấu ăn</span>
          </div>
          <div className='border-b-[3px] mb-2 w-[50%] border-red-300 '></div>
        </div>
        <button
          onClick={() => navigate('/chef/recipe-list')}
          className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <IoMdHome />
            Trở về trang danh sách bài viết nấu ăn
          </div>
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 px-4 gap-4'>
        <div className='blog-view  max-w-3xl w-full pb-16 p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Chỉnh sửa bài viết</h2>
          <form onSubmit={onSubmit} noValidate>
            <div className='grid gap-4 sm:grid-cols-2 sm:gap-2'>
              <div className='sm:col-span-2'>
                <Input
                  title='Nhập tiêu đề'
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Nhập tiêu đề bài viết'
                  register={register}
                  errors={errors.title}
                />
              </div>
            </div>
            <div className='sm:col-span-2 pb-2'>
              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Chọn 1 ảnh bài viết (định dạng ảnh jpeg)
              </div>
              <input
                className='file-input file-input-sm file-input-bordered file-input-ghost w-full max-w-xs'
                type='file'
                accept='image/jpeg'
                {...register('image')}
              />

              <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                {errors.image?.message}
              </div>
            </div>
            <div className='sm:col-span-2'>
              <Input
                title='Nhập link video (nếu có)'
                type='text'
                name='video'
                id='video'
                placeholder='Nhập link video bài viết'
                register={register}
                errors={errors.video}
              />
            </div>
            <div className='sm:col-span-2'>
              <Input
                title='Thời gian nấu'
                type='number'
                name='time'
                id='time'
                placeholder='Nhập thời gian nấu'
                register={register}
                errors={errors.time}
              />
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn mức độ khó
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('difficult_level')}
                  id='difficult_level'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn mức độ khó
                  </option>
                  <option value='0'>Dễ</option>
                  <option value='1'>Trung bình</option>
                  <option value='2'>Khó</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.difficult_level?.message}
                </div>
              </div>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn vùng miền
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('region')}
                  id='region'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn vùng miền
                  </option>
                  <option value='0'>Miền Bắc</option>
                  <option value='1'>Miền Trung</option>
                  <option value='2'>Miền Nam</option>
                  <option value='3'>Món Á</option>
                  <option value='4'>Món Âu</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.region?.message}
                </div>
              </div>
            </div>
            <div className='sm:col-span-2 flex flex-wrap items-center gap-2 md:gap-5 pb-2'>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn 1 thể loại nấu ăn
                </div>

                {isFetching ? (
                  <Loading className='flex' />
                ) : (
                  <select
                    defaultValue='DEFAULT'
                    {...register('category_recipe_id')}
                    id='category'
                    className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                  >
                    <option value='DEFAULT' disabled>
                      Chọn 1 thể loại
                    </option>
                    {category?.data?.result.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                )}

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.category_recipe_id?.message}
                </div>
              </div>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn cách chế biến
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('processing_food')}
                  id='processing_food'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn cách chế biến
                  </option>
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

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.processing_food?.message}
                </div>
              </div>
            </div>

            <div className='sm:col-span-2'>
              <TextArea
                title='Nhập mô tả'
                placeholder='Nhập mô tả bài viết'
                name='description'
                id='description'
                register={register}
                errors={errors.description}
              />
            </div>
            <div className='sm:col-span-2 pb-2'>
              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Nhập nội dung bài viết
              </div>
              <ReactQuill
                className=''
                theme='snow'
                value={content}
                onChange={onEditorStateChange}
                modules={modules}
                formats={formats}
              />
              <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                {errors.content?.message}
              </div>
            </div>
            {openEdit && (
              <EditConfirmBox
                title='Chỉnh sửa bài viết'
                subtitle='Bạn có chắc chắn muốn chỉnh sửa bài viết này không?'
                handleCreate={onSubmit}
                closeModal={handleCloseEdit}
                isPending={editRecipeMutation.isPending}
              />
            )}
          </form>
          <button
            onClick={handleOpenEdit}
            className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
          >
            <div className='flex gap-1 items-center justify-center'>Chỉnh sửa bài viết</div>
          </button>
        </div>
        {isFetchingRecipe ? (
          <Loading />
        ) : (
          <div className=' blog-view  max-w-3xl w-full pb-16  dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
            <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Xem trước</h2>
            <div className='relative'>
              <div className='w-full mx-auto'>
                <div className=' bg-white dark:bg-color-primary rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal'>
                  <div className='bg-white dark:bg-color-primary relative px-5'>
                    {!imageWatch || imageWatch.length === 0 ? (
                      <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                        <img
                          className='object-cover max-h-[15rem] md:max-h-[26rem] rounded-md w-[100%]'
                          src={recipe.image}
                          alt=''
                        />
                      </div>
                    ) : (
                      <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                        <img
                          className='object-cover max-h-[15rem] md:max-h-[26rem] rounded-md w-[100%]'
                          src={URL.createObjectURL(imageWatch[0])}
                          alt=''
                        />
                      </div>
                    )}
                    <header className='not-format'>
                      <div>
                        <h1 className='mb-1 text-2xl xl:text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                          {titleWatch === '' ? 'Tiêu đề bài viết' : titleWatch}
                        </h1>
                      </div>
                    </header>
                    <p className='lead mb-3 whitespace-pre-line font-medium'>
                      {descriptionWatch === '' ? 'Mô tả bài viết' : descriptionWatch}
                    </p>

                    <div className='custorm-blog '>
                      {content === '' ? <div>Nội dung bài viết</div> : <div>{parse(content)}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
