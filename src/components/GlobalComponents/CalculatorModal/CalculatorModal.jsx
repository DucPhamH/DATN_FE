import { FaCheck } from 'react-icons/fa6'
import ModalLayout from '../../../layouts/ModalLayout'
import Loading from '../Loading'
import { useLocation } from 'react-router-dom'

export default function CalculatorModal({
  closeModal,
  title,
  subtitle,
  helptext = '',
  isPending,
  type = 'submit',
  data,
  unit = '',
  saveData = () => {}
}) {
  const location = useLocation()

  return (
    <ModalLayout
      closeModal={closeModal}
      className='modal-content min-w-[360px]  md:min-w-[450px] md:max-w-[500px] dark:bg-gray-900 bg-white'
    >
      <>
        <div className='md:flex items-center p-3'>
          <div className='flex justify-center'>
            <div className='rounded-full border border-gray-300 flex items-center justify-center w-14 h-14 flex-shrink-0'>
              <div className=' text-red-900 dark:text-pink-500 text-3xl'>
                <FaCheck />
              </div>
            </div>
          </div>

          <div className='mt-4 md:mt-0 md:ml-2 text-center md:text-left'>
            <p className='font-bold'>
              {title}:{' '}
              <span>
                {data?.data.result} {unit}
              </span>
            </p>
            <p className='text-sm text-gray-800 dark:text-gray-400 mt-1'>{subtitle}</p>
            <p className='text-xs mt-3  text-red-600 font-medium dark:text-gray-400'>{helptext}</p>
          </div>
        </div>
        <div className='text-center md:text-right mt-4 md:flex md:justify-end'>
          {location.pathname === '/fitness/fitness-calculator/water-need' ||
          location.pathname === '/fitness/fitness-calculator/calo-burned' ? null : (
            <>
              {isPending ? (
                <button
                  disabled
                  className='block btn w-full btn-sm md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                </button>
              ) : (
                <button
                  type={type}
                  onClick={saveData}
                  className='block btn btn-sm w-full md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
                >
                  Lưu
                </button>
              )}
            </>
          )}
          <button
            onClick={closeModal}
            className='block btn btn-sm w-full text-gray-700 hover:bg-slate-300 dark:text-gray-700 md:inline-block md:w-auto  bg-gray-200 rounded-lg font-semibold text-sm mt-4
md:mt-0 md:order-1'
          >
            Hủy
          </button>
        </div>
      </>
    </ModalLayout>
  )
}
