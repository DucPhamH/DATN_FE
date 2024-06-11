import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schemaSearchImage } from '../../utils/rules'
import Loading from '../../components/GlobalComponents/Loading'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import SearchImageCard from '../../components/CardComponents/SearchImageCard'
import { IoMdHome } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export default function SearchImage() {
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaSearchImage),
    defaultValues: {
      image: ''
    }
  })
  const imageWatch = watch('image')

  console.log(imageWatch)

  //https://cookhealthyimage.io.vn/search
  //http://127.0.0.1:5000/search
  const searchImageMutation = useMutation({
    mutationFn: (body) =>
      axios.post('http://127.0.0.1:5000/search', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  })
  const onSubmit = handleSubmit((data) => {
    var formData = new FormData()
    console.log(data)
    const newData = {
      image: data.image[0]
    }

    console.log(newData)

    formData.append('query_img', newData.image)

    searchImageMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data.data)
        setRecipes(data.data.scores)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })
  console.log(recipes)
  return (
    <div className='  text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2 '>
        <div className=''>
          <div className='flex flex-wrap justify-between items-center pt-3'>
            <div className='mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Trang tìm kiếm hình ảnh</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[50%] border-red-300 '></div>
            </div>
            <button
              onClick={() => navigate('/cooking/recipe')}
              className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
            >
              <div className='flex gap-1 items-center justify-center'>
                <IoMdHome />
                Trở về trang nấu ăn
              </div>
            </button>
          </div>

          <div className='flex w-full flex-wrap gap-10'>
            <form onSubmit={onSubmit} className='mt-5'>
              <div className='sm:col-span-2'>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Chọn 1 ảnh món ăn bạn muốn tìm kiếm
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
              {searchImageMutation.isPending ? (
                <button
                  disabled
                  className='block btn  btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                </button>
              ) : (
                <button className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm  md:order-2'>
                  Tìm kiếm
                </button>
              )}
            </form>
            {!imageWatch || imageWatch.length === 0 ? (
              <div className=''></div>
            ) : (
              <div className='flex h-32 w-44 border'>
                <img className='object-cover h-32 w-44 rounded-md ' src={URL.createObjectURL(imageWatch[0])} alt='' />
              </div>
            )}
          </div>
          {searchImageMutation.isPending ? (
            <Loading />
          ) : (
            <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
              {recipes.map((recipe) => (
                <SearchImageCard recipe={recipe} key={recipe._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
