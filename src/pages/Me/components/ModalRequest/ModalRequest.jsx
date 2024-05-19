import { useForm } from 'react-hook-form'
import ModalLayout from '../../../../layouts/ModalLayout'
import Loading from '../../../../components/GlobalComponents/Loading'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { formats, modules } from '../../../../services/editorToolbar'
import Input from '../../../../components/InputComponents/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRequestUpgrade } from '../../../../utils/rules'
import { toast } from 'react-toastify'

export default function ModalRequest({ handleCloseModalRequest, updateRequest }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaRequestUpgrade),
    defaultValues: {
      reason: '',
      proof: ''
    }
  })
  const onEditorStateChange = (editorState) => {
    setValue('reason', editorState)
  }

  const reason = watch('reason')

  console.log(reason)

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    // bỏ đi confirm_password

    updateRequest.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Yêu cầu nâng cấp lên đầu bếp thành công, hãy đợi email phản hồi từ chúng tôi')
        handleCloseModalRequest()
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalRequest}
      className='modal-content overflow-y-auto max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Nâng cấp lên đầu bếp</h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalRequest}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>

          <div className='border dark:border-gray-700 border-red-200 '></div>
          <section className='w-full mx-auto items-center '>
            <form noValidate onSubmit={onSubmit} className='p-3'>
              <div className='sm:col-span-2'>
                <Input
                  title='Nhập link minh chứng kinh nghiệm của bạn'
                  type='text'
                  name='proof'
                  id='proof'
                  placeholder='VD: https://www.facebook.com/...'
                  register={register}
                  errors={errors.proof}
                />
              </div>
              <div className='sm:col-span-2 pb-2'>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Hãy viết lý do bạn muốn nâng cấp lên đầu bếp
                </div>
                <ReactQuill
                  className='text-black dark:text-gray-200'
                  theme='snow'
                  value={reason}
                  onChange={onEditorStateChange}
                  modules={modules}
                  formats={formats}
                />
                <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'>
                  {errors.reason?.message}
                </div>
              </div>

              <div className='flex justify-center'>
                {updateRequest.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'>Gửi lên hệ thống</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
