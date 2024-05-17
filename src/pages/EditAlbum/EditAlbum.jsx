import { IoMdHome } from 'react-icons/io'
import Input from '../../components/InputComponents/Input'
import TextArea from '../../components/InputComponents/TextArea'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateAlbum } from '../../utils/rules'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Loading from '../../components/GlobalComponents/Loading'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { queryClient } from '../../main'
import EditConfirmBox from '../../components/GlobalComponents/EditConfirmBox'
import { deleteRecipeInAlbumForChef, getAlbumForChef, updateAlbumForChef } from '../../apis/albumApi'
import { omit } from 'lodash'
import { getRecipesForChef } from '../../apis/recipeApi'
import PaginationNotUrl from '../../components/GlobalComponents/PaginationNotUrl'
import { FaPlus } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import DeleteConfirmBox from '../../components/GlobalComponents/DeleteConfirmBox'
import { cutString } from '../../utils/helper'

export default function EditAlbum() {
  const [openEdit, setOpenEdit] = useState(false)
  const [arrayRecipes, setArrayRecipes] = useState([])

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const [query, setQuery] = useState({
    page: 1,
    status: 0
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const { data: albumInfo } = useQuery({
    queryKey: ['album-info', id],
    queryFn: () => {
      return getAlbumForChef(id)
    }
  })
  const album = albumInfo?.data.result[0]

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCreateAlbum),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      category_album: 'DEFAULT'
    }
  })

  const updateAlbumMutation = useMutation({
    mutationFn: (body) => updateAlbumForChef(id, body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    const arrayRecipeId = arrayRecipes.map((item) => item._id)
    console.log(arrayRecipeId)

    const newData = {
      ...data,
      array_recipes_id: arrayRecipeId
    }

    updateAlbumMutation.mutate(newData, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Chỉnh sửa album thành công')
        handleCloseEdit()
        queryClient.invalidateQueries('album-info')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  useEffect(() => {
    if (album) {
      setValue('title', album.title)
      setValue('image', album.image)
      setValue('description', album.description)
      setValue('category_album', album.category_album)
    }
  }, [album, setValue])

  console.log(arrayRecipes)

  const { data, isLoading } = useQuery({
    queryKey: ['recipes-list-chef', query],
    queryFn: () => {
      return getRecipesForChef(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const { register: registerRecipe, handleSubmit: handleSubmitRecipe } = useForm({
    defaultValues: {
      searchRecipe: query.search || ''
    }
  })
  const onSubmitSearch = handleSubmitRecipe((data) => {
    if (data.searchRecipe === '') {
      return setQuery((prev) => omit(prev, ['page', 'search']))
    }
    setQuery((prev) => {
      return omit({ ...prev, search: data.searchRecipe }, ['page'])
    })
  })

  const isEmptyArrayWithEmptyObject = (arr) => {
    // Kiểm tra nếu mảng không rỗng và có đúng một phần tử
    if (Array.isArray(arr) && arr.length === 1) {
      // Kiểm tra phần tử đó có phải là object rỗng không
      const firstElement = arr[0]
      return Object.keys(firstElement).length === 0 && firstElement.constructor === Object
    }
    return false
  }

  return (
    <div className='mb-64'>
      <div className='flex flex-wrap  justify-between items-center pt-3 px-8'>
        <div className='mb-2'>
          <div className='text-xl md:text-2xl font-medium mb-2'>
            <span>Chỉnh sửa album nấu ăn</span>
          </div>
          <div className='border-b-[3px] mb-2 w-[50%] border-red-300 '></div>
        </div>
        <button
          onClick={() => navigate('/chef/album-list')}
          className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <IoMdHome />
            Trở về trang danh sách album
          </div>
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 px-4 gap-4'>
        <div className='blog-view  max-w-3xl w-full pb-16 p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Chỉnh sửa album</h2>
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
            <div className='sm:col-span-2'>
              <Input
                title='Nhập link hình ảnh'
                type='text'
                name='image'
                id='image'
                placeholder='Nhập link hình ảnh bài viết'
                register={register}
                errors={errors.image}
              />
            </div>
            <div className='sm:col-span-2'>
              <div>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn mức độ khó
                </div>

                <select
                  defaultValue='DEFAULT'
                  {...register('category_album')}
                  id='category_album'
                  className='select select-secondary select-sm border bg-white dark:bg-slate-800 dark:border-none'
                >
                  <option value='DEFAULT' disabled>
                    Chọn thể loại
                  </option>
                  <option value='Cho bé'>Cho bé</option>
                  <option value='Cho bà bầu'>Cho bà bầu</option>
                  <option value='Cho người già'>Cho người già</option>
                  <option value='Giảm cân'>Giảm cân</option>
                  <option value='Tăng cân'>Tăng cân</option>
                  <option value='Cho người bệnh'>Cho người bệnh</option>
                  <option value='Thể thao'>Thể thao</option>
                  <option value='Sắc đẹp'>Sắc đẹp</option>
                  <option value='Cho người ăn chay'>Cho người ăn chay</option>
                </select>

                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.category_album?.message}
                </div>
              </div>
            </div>

            {/* Description */}
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

            <div className='sm:col-span-2 mb-10'>
              <div className='w-full flex flex-col'>
                <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Bài viết được thêm
                </label>
                {arrayRecipes.length === 0 ? (
                  <div className='text-gray-500 dark:text-gray-300'>Chưa có bài viết nào được thêm</div>
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên bài viết
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Thể loại
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
                      {arrayRecipes.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {cutString(item.title, 20)}
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>
                                {item.category_recipe}
                              </span>
                            </td>
                            <td className='px-6 py-2 '>
                              <button
                                onClick={() => {
                                  setArrayRecipes((prev) => prev.filter((i) => i._id !== item._id))
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

            {openEdit && (
              <EditConfirmBox
                title='Chỉnh sửa bài viết'
                subtitle='Bạn có chắc chắn muốn chỉnh sửa bài viết này không?'
                handleCreate={onSubmit}
                closeModal={handleCloseEdit}
                isPending={updateAlbumMutation.isPending}
              />
            )}
          </form>
          <button
            onClick={handleOpenEdit}
            className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
          >
            <div className='flex gap-1 items-center justify-center'>Chỉnh sửa bài viết</div>
          </button>
          <div className='sm:col-span-2 mt-10'>
            <div className='w-full flex flex-col'>
              <label className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Bài viết đã thêm
              </label>
              {
                // nếu recipes có dạng mảng rỗng chứa object rỗng thì hiển thị chưa có bài viết nào ví dụ [{}]
                isEmptyArrayWithEmptyObject(album?.recipes) ? (
                  <div className='text-gray-500 dark:text-gray-300'>Chưa có bài viết nào</div>
                ) : (
                  <table className=' w-full shadow-md  divide-y divide-gray-200'>
                    <thead className='bg-gray-50 dark:bg-slate-800 '>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Tên bài viết
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                        >
                          Thể loại
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
                      {album?.recipes?.map((item) => {
                        return <RecipeItemAdded key={item._id} recipe={item} album_id={id} />
                      })}
                    </tbody>
                  </table>
                )
              }
            </div>
          </div>
        </div>

        <div className=' blog-view  max-w-3xl w-full pb-16  dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Xem trước</h2>
          <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
            <main className=' '>
              <div className='mx-4'>
                <div className='font-medium mb-2'></div>
                <div className='mb-2'>
                  <div className='flex flex-wrap gap-1 justify-end  items-center'>
                    <button
                      onClick={() => navigate('/chef/create-recipe')}
                      className='block btn btn-xs md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-xs md:ml-2 md:order-2'
                    >
                      <div className='flex gap-1 items-center justify-center'>
                        <FaPlus /> Thêm{' '}
                      </div>
                    </button>
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
                          {...registerRecipe('searchRecipe')}
                          placeholder='Tìm kiếm bài viết'
                          className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                        />
                        <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                          <AiOutlineSearch />
                        </button>
                      </div>
                    </form>
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
                            Tên bài viết
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                          >
                            Thể loại
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
                        {data?.data?.result.recipes.map((recipe) => {
                          return (
                            <RecipeItem
                              key={recipe._id}
                              recipe={recipe}
                              arrayRecipes={arrayRecipes}
                              setArrayRecipes={setArrayRecipes}
                            />
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
                {data?.data.result.recipes.length === 0 && (
                  <div className='flex justify-center items-center py-4'>
                    <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
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
    </div>
  )
}

const RecipeItem = ({ recipe, arrayRecipes, setArrayRecipes }) => {
  const onSubmit = () => {
    // thêm object bao gồm recipe._id và recipe._title và recipe.category_recipe.name vào arrayRecipes
    // xem xét xem đã tồn tại trong array chưa nếu chưa thì thêm vào còn đã tồn tại thì toast thông báo
    const isExist = arrayRecipes.find((item) => item._id === recipe._id)
    if (!isExist) {
      setArrayRecipes((prev) => [
        ...prev,
        {
          _id: recipe._id,
          title: recipe.title,
          category_recipe: recipe.category_recipe.name
        }
      ])
    } else {
      toast.error('Bài viết đã tồn tại trong album')
    }
  }
  return (
    <tr>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{cutString(recipe.title, 12)}</span>
      </td>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{recipe.category_recipe.name}</span>
      </td>
      <td className='px-6 py-4 '>
        <button
          onClick={onSubmit}
          className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <FaPlus />
          </div>
        </button>
      </td>
    </tr>
  )
}

const RecipeItemAdded = ({ recipe, album_id }) => {
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const deleteRecipeInAlbumMutation = useMutation({
    mutationFn: (body) => deleteRecipeInAlbumForChef(body)
  })

  const handleDeleteRecipeInAlbum = (recipeId) => {
    deleteRecipeInAlbumMutation.mutate(
      { album_id: album_id, recipe_id: recipeId },
      {
        onSuccess: (data) => {
          console.log(data)
          toast.success('Xóa bài viết khỏi album thành công')
          queryClient.invalidateQueries('album-info')
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }
  return (
    <tr key={recipe._id}>
      <td className='px-6 py-2 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{cutString(recipe.title, 12)}</span>
      </td>
      <td className='px-6 py-2 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{recipe.category_recipe.name}</span>
      </td>
      <td className='px-6 py-2 '>
        <button
          onClick={handleOpenDelete}
          className='block btn border-none btn-xs md:inline-block md:w-auto  bg-transparent hover:bg-transparent text-black dark:text-gray-200  rounded-lg font-semibold text-sm md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>X</div>
        </button>
        {openDelete && (
          <DeleteConfirmBox
            title='Xóa bài viết'
            subtitle='Nếu xóa bài viết trong trạng thái đã chấp nhận thì sẽ không thể khôi phục, bạn có chắc chắn muốn xóa không?'
            handleDelete={() => handleDeleteRecipeInAlbum(recipe._id)}
            closeModal={handleCloseDelete}
            isPending={deleteRecipeInAlbumMutation.isPending}
          />
        )}
      </td>
    </tr>
  )
}
