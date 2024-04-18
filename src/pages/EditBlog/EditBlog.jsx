import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import { modules, formats } from '../../services/editorToolbar'
import { IoMdHome } from 'react-icons/io'
import Input from '../../components/InputComponents/Input'
import TextArea from '../../components/InputComponents/TextArea'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateBlog } from '../../utils/rules'
import { useQuery } from '@tanstack/react-query'
import { getBlogForChef, getCategoryBlogs, updateBlogForChef } from '../../apis/blogApi'
import Loading from '../../components/GlobalComponents/Loading'
import { FaRegComment } from 'react-icons/fa'
import { LiaEyeSolid } from 'react-icons/lia'
import useravatar from '../../assets/images/useravatar.jpg'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { queryClient } from '../../main'
import EditConfirmBox from '../../components/GlobalComponents/EditConfirmBox'

export default function EditBlog() {
  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['blog-info', id],
    queryFn: () => {
      return getBlogForChef(id)
    }
  })
  const blog = data?.data.result[0]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCreateBlog),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      category_blog_id: 'DEFAULT',
      content: ''
    }
  })
  console.log(id)

  const editBlogMutation = useMutation({
    mutationFn: (body) => updateBlogForChef(id, body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    editBlogMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Chỉnh sửa bài viết thành công')
        handleCloseEdit()
        queryClient.invalidateQueries('blog-info')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  useEffect(() => {
    if (blog) {
      setValue('title', blog.title)
      setValue('image', blog.image)
      setValue('description', blog.description)
      setValue('content', blog.content)
      setValue('category_blog_id', blog.category_blog._id)
    }
  }, [blog, setValue])
  const onEditorStateChange = (editorState) => {
    setValue('content', editorState)
  }
  const titleWatch = watch('title')
  const imageWatch = watch('image')
  const descriptionWatch = watch('description')
  const content = watch('content')

  const { data: category, isFetching } = useQuery({
    queryKey: ['category-blog'],
    queryFn: () => {
      return getCategoryBlogs()
    }
  })

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center pt-3 px-8'>
        <div className='mb-2'>
          <div className='text-xl md:text-2xl font-medium mb-2'>
            <span>Chỉnh sửa blog dinh dưỡng</span>
          </div>
          <div className='border-b-[3px] mb-2 w-[50%] border-red-300 '></div>
        </div>
        <button
          onClick={() => navigate('/chef/blog-list')}
          className='block btn btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
        >
          <div className='flex gap-1 items-center justify-center'>
            <IoMdHome />
            Trở về trang chính
          </div>
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 px-4 gap-4'>
        <div className='blog-view  max-w-3xl w-full pb-16 p-5 dark:text-gray-400  font-Roboto  bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <h2 className='text-xl font-bold border-b border-gray-400 pb-2 mb-5 '>Tạo blog</h2>
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
            <div className='sm:col-span-2 pb-2'>
              <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                Chọn 1 thể loại blog
              </div>

              {isFetching ? (
                <Loading className='flex' />
              ) : (
                <select
                  defaultValue='DEFAULT'
                  {...register('category_blog_id')}
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
                {errors.category_blog_id?.message}
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
            {/* Content */}
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
                isPending={editBlogMutation.isPending}
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

        <div className=' blog-view  max-w-3xl w-full pb-16  dark:text-gray-400  font-Roboto lg:pb-24 bg-white dark:bg-color-primary my-6  border border-gray-200 rounded-lg shadow mx-auto'>
          <h2 className='text-xl font-bold border-b m-5 border-gray-400 pb-2 mb-5 '>Xem trước</h2>
          <div className='grid gap-4 sm:grid-cols-1 sm:gap-6 '>
            <main className=' '>
              <div className='flex justify-between items-center px-3 xl:px-5 '>
                <article className='mx-auto w-full '>
                  <header className='mb-3 not-format'>
                    <h1 className='mb-1 text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                      {titleWatch === '' ? 'Tiêu đề bài viết' : titleWatch}
                    </h1>
                    <div className='border-b-[1px] my-3 border-red-300 '></div>
                  </header>

                  <p className='lead mb-3 font-medium'>
                    {descriptionWatch === '' ? 'Mô tả bài viết' : descriptionWatch}
                  </p>
                  {imageWatch === '' ? (
                    <div>Link ảnh bài viết</div>
                  ) : (
                    <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                      <img className='object-cover rounded-md w-[100%]' src={imageWatch} alt='' />
                    </div>
                  )}

                  <div className='custorm-blog'>
                    {content === '' ? <div>Nội dung bài viết</div> : <div>{parse(content)}</div>}
                  </div>
                </article>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
