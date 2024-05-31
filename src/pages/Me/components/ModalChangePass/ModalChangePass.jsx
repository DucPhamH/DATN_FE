import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ModalLayout from '../../../../layouts/ModalLayout'
import { useMutation } from '@tanstack/react-query'
import Loading from '../../../../components/GlobalComponents/Loading'
import { schemaChangePassword } from '../../../../utils/rules'
import toast from 'react-hot-toast'
import { changePassword } from '../../../../apis/userApi'

import InputPass from '../../../../components/InputComponents/InputPass'

export default function ModalChangePass({ handleCloseModalUpdatePass }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaChangePassword),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  })

  const updatePassMutation = useMutation({
    mutationFn: (body) => changePassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    // bỏ đi confirm_password

    const newData = {
      old_password: data.old_password,
      new_password: data.new_password
    }

    updatePassMutation.mutate(newData, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Cập nhật thông tin cá nhân thành công')
        handleCloseModalUpdatePass()
      },
      onError: (error) => {
        console.log(error)
        setError('old_password', {
          type: 'manual',
          message: error?.response.data.message
        })
        setError('new_password', {
          type: 'manual',
          message: error?.response.data.errors.new_password.msg
        })
      }
    })
  })

  return (
    <ModalLayout
      closeModal={handleCloseModalUpdatePass}
      className='modal-content max-h-[90%] min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
    >
      <div className='relative w-full max-w-md max-h-full'>
        <div className=''>
          <div className='flex justify-between'>
            <div className='px-3 py-1'></div>
            <h3 className=' mb-2 font-medium text-lg md:text-xl text-black dark:text-gray-200'>Đổi mật khẩu</h3>
            <div className='text-2xl font-semibold'>
              <span
                onClick={handleCloseModalUpdatePass}
                className=' hover:bg-slate-100 transition-all dark:hover:bg-slate-700 cursor-pointer rounded-full px-3 py-1'
              >
                &times;
              </span>
            </div>
          </div>

          <div className='border dark:border-gray-700 border-red-200 '></div>
          <section className='w-full mx-auto items-center '>
            <form noValidate onSubmit={onSubmit} className='p-3'>
              <InputPass
                title='Nhập mật khẩu cũ'
                type='password'
                name='old_password'
                id='old_password'
                register={register}
                errors={errors.old_password}
                placeholder='Nhập mật khẩu cũ'
              />

              <InputPass
                title='Nhập mật khẩu mới'
                type='password'
                name='new_password'
                id='new_password'
                register={register}
                errors={errors.new_password}
                placeholder='Nhập mật khẩu mới'
              />

              <InputPass
                title='Nhập lại mật khẩu mới'
                type='password'
                name='confirm_password'
                id='confirm_password'
                register={register}
                errors={errors.confirm_password}
                placeholder='Nhập lại mật khẩu mới'
              />

              <div className='flex justify-center'>
                {updatePassMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'>Đổi mật khẩu</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </ModalLayout>
  )
}
