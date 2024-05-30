import { useNavigate } from 'react-router-dom'
import MotionWrapper from '../../../../layouts/MotionWrapper'
import useQueryConfig from '../../../../hooks/useQueryConfig'
import { omit } from 'lodash'
import OtpInput from 'react-otp-input'
import { useState } from 'react'
import { sendOtp, verifyOtp } from '../../../../apis/authApi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Loading from '../../../../components/GlobalComponents/Loading'

export default function InputConfirm() {
  const queryConfig = omit(useQueryConfig(), ['page', 'sort'])
  console.log(queryConfig)
  const navigate = useNavigate()

  const [otp, setOtp] = useState('')
  const sendOtpMutation = useMutation({
    mutationFn: (body) => sendOtp(body)
  })

  const confirmOtpMutation = useMutation({
    mutationFn: (body) => verifyOtp(body)
  })

  const onConfirm = () => {
    if (otp.length !== 4) {
      toast.error('Bạn cần nhập đúng 4 ký tự')
      return
    }
    confirmOtpMutation.mutate(
      {
        email: queryConfig.email,
        otp_code: otp
      },
      {
        onError: (errors) => {
          console.log(errors)
        },
        onSuccess: (data) => {
          console.log(data)
          toast.success('Xác nhận mã OTP thành công')
          navigate(
            `/forgot-password/change-password?email=${data.data.result.email}&otp_code=${data.data.result.otp_code}`
          )
        }
      }
    )
  }

  const onSubmit = () => {
    sendOtpMutation.mutate(
      {
        email: queryConfig.email
      },
      {
        onError: (errors) => {
          console.log(errors)
          toast.error('Có lỗi xảy ra, vui lòng thử lại')
        },
        onSuccess: (data) => {
          console.log(data)
          toast.success('Gửi mã OTP thành công')
          navigate(`/forgot-password/confirm-otp?email=${data.data.result}`)
        }
      }
    )
  }
  console.log(otp)
  return (
    <MotionWrapper
      variants={{
        offscreen: {
          opacity: 0,
          y: 30
        },
        onscreen: {
          opacity: 1,
          y: 0
        }
      }}
    >
      <div className='flex justify-center'>
        <form className='px-10 rounded-lg shadow-md py-10 bg-white  mt-[5rem]'>
          <div className='text-center mb-5'>
            <h1 className='block text-2xl font-bold text-gray-800 '>Xác nhận OTP</h1>
          </div>
          <div className='flex justify-center  gap-2 mb-6'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              className='otp-input'
              inputStyle={{
                border: '1px solid transparent',
                borderRadius: '8px',
                width: '54px',
                height: '54px',
                fontSize: '20px',
                color: '#000',
                fontWeight: '400',
                caretColor: 'blue',
                backgroundColor: '#F3F4F6',
                margin: '0 4px'
              }}
              focusStyle={{
                border: '1px solid #CFD3DB',
                outline: 'none'
              }}
              separator={<span style={{ width: '8px' }}></span>}
              shouldAutoFocus={true}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className='flex items-center justify-center'>
            {confirmOtpMutation.isPending ? (
              <button disabled className='bg-red-700 w-24 hover:bg-red-600 text-white font-bold rounded-lg btn'>
                <Loading classNameSpin='inline  w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
              </button>
            ) : (
              <button
                onClick={onConfirm}
                className='bg-red-700 w-24 hover:bg-red-600 text-white font-bold rounded-lg btn '
                type='button'
              >
                Xác nhận
              </button>
            )}

            {sendOtpMutation.isPending ? (
              <button className='inline-block w-24 cursor-not-allowed align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4'>
                <Loading classNameSpin='inline  w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className='inline-block w-24 cursor-pointer align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4 '
                type='button'
              >
                Gửi lại mã
              </button>
            )}
          </div>
        </form>
      </div>
    </MotionWrapper>
  )
}
