import { useMutation } from '@tanstack/react-query'
import { reportPost } from '../../../../apis/postApi'
import toast from 'react-hot-toast'
import ModalLayout from '../../../../layouts/ModalLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextArea from '../../../../components/InputComponents/TextArea'
import { schemaCreateReport } from '../../../../utils/rules'

export default function ModalReportPost({ handleCloseReportPost, post }) {
  console.log(post)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCreateReport),
    defaultValues: {
      reason: ''
    }
  })
  const reportMutation = useMutation({
    mutationFn: (body) => reportPost(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const body = {
      post_id: post._id,
      ...data
    }
    reportMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Báo cáo bài viết thành công, hãy đợi quản trị viên xử lý')
        reset()
        handleCloseReportPost()
      },
      onError: () => {
        console.log('error')
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseReportPost}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Báo cáo bài viết</h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseReportPost}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>
          <div className='border dark:border-gray-700 border-red-200 '></div>
          <form onSubmit={onSubmit} className='w-full mt-3 mx-auto items-center'>
            <TextArea
              title='Lý do báo cáo'
              name='reason'
              id='reason'
              placeholder='Nhập lý do báo cáo'
              register={register}
              errors={errors.reason}
            />
            <div className='flex items-center mt-4 justify-center'>
              {reportMutation.isPending ? (
                <div className='w-full cursor-not-allowed'>
                  <label className='w-full transition-all duration-300 text-white bg-slate-400 font-medium rounded-lg text-sm px-5 py-2 flex items-center justify-center mr-2 mb-2'>
                    <svg
                      aria-hidden='true'
                      className='inline w-6 h-6 text-gray-200 cursor-not-allowed animate-spin dark:text-gray-600 fill-pink-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <button disabled className='text-center cursor-not-allowed ml-2'>
                      Đang báo cáo
                    </button>
                  </label>
                </div>
              ) : (
                <div className='w-full'>
                  <label className='w-full dark:hover:bg-pink-800 transition-all duration-300 text-white bg-red-600 dark:bg-pink-700 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2 flex items-center justify-center mr-2 mb-2 cursor-pointer'>
                    <button className='text-center ml-2'>Báo cáo</button>
                  </label>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </ModalLayout>
  )
}
