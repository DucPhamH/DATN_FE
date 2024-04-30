import { IoIosWarning } from 'react-icons/io'
import Loading from '../Loading'
import ModalLayout from '../../../layouts/ModalLayout'

export default function EditConfirmBox({ title, subtitle, type = 'submit', handleCreate, closeModal, isPending }) {
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
          <p className='font-bold'>{title}</p>
          <p className='text-sm text-gray-800 dark:text-gray-400 mt-1'>{subtitle}</p>
        </div>
      </div>
      <div className='text-center md:text-right mt-4 md:flex md:justify-end'>
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
            onClick={handleCreate}
            className='block btn btn-sm w-full md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
          >
            Chỉnh sửa
          </button>
        )}

        <button
          onClick={closeModal}
          className='block btn btn-sm w-full text-gray-700 hover:bg-slate-300 dark:text-gray-700 md:inline-block md:w-auto  bg-gray-200 rounded-lg font-semibold text-sm mt-4
    md:mt-0 md:order-1'
        >
          Hủy
        </button>
      </div>
    </ModalLayout>
  )
}
