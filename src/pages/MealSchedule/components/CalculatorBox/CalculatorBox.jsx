import { IoIosWarning } from 'react-icons/io'
import ModalLayout from '../../../../layouts/ModalLayout'
import { Link, useNavigate } from 'react-router-dom'

export default function CalculatorBox({ closeModal }) {
  const navigate = useNavigate()
  return (
    <ModalLayout
      closeModal={closeModal}
      className='modal-content min-w-[360px]  md:min-w-[450px] md:max-w-[500px] dark:bg-gray-900 bg-white'
    >
      <div className='md:flex items-center p-3'>
        <div className='flex justify-center'>
          <div className='rounded-full border border-gray-300 flex items-center justify-center w-14 h-14 flex-shrink-0'>
            <div className=' text-red-900 dark:text-pink-500 text-3xl'>
              <IoIosWarning />
            </div>
          </div>
        </div>
        <div className='mt-4 md:mt-0 md:ml-2 text-center md:text-left'>
          <p className='font-bold'>Chú ý: Bạn cần tính toán 2 chỉ số BMI và TDEE để thực hiện chức năng này</p>
          <p className='text-sm text-gray-800 dark:text-gray-400 mt-1'>
            Đi đến trang:{' '}
            <Link
              to='/fitness/fitness-calculator/BMI'
              className='text-blue-400 font-medium underline hover:text-blue-500 transition-all'
            >
              Tính toán BMI
            </Link>{' '}
            hoặc{' '}
            <Link
              to='/fitness/fitness-calculator/calories'
              className='text-blue-400 font-medium underline hover:text-blue-500 transition-all'
            >
              Tính toán TDEE
            </Link>
          </p>
        </div>
      </div>
      <div className='text-center md:text-right mt-4 md:flex md:justify-end'>
        <button
          onClick={() => navigate('/fitness/fitness-calculator')}
          className='block btn btn-sm w-full md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
        >
          Đi đến trang tính toán
        </button>
      </div>
    </ModalLayout>
  )
}
