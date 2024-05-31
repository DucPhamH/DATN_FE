import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteMealSchedule } from '../../../../apis/mealScheduleApi'
import { queryClient } from '../../../../main'
import toast from 'react-hot-toast'
import DeleteConfirmBox from '../../../../components/GlobalComponents/DeleteConfirmBox'
import { cutString } from '../../../../utils/helper'

export default function MealItem({ meal }) {
  const [openModalMeal, setOpenModalMeal] = useState(false)

  const handleCloseModaldeleteMeal = () => {
    setOpenModalMeal(false)
  }

  const handleOpenModaldeleteMeal = () => {
    setOpenModalMeal(true)
  }
  const deleteMealMutation = useMutation({
    mutationFn: (id) => deleteMealSchedule(id)
  })

  const handleDeleteMeal = () => {
    deleteMealMutation.mutate(meal._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['meal-schedule']
        })
        toast.success('Xóa lịch trình thành công')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{cutString(meal.name, 20)}</div>
        </td>
        {meal.purpose === 0 ? (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>Tăng cân</td>
        ) : meal.purpose === 1 ? (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>Giảm cân </td>
        ) : (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'> Duy trì cân nặng</td>
        )}
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(meal.start_date).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(meal.end_date).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 flex item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/schedule/eat-schedule/${meal._id}`} className='text-indigo-600 hover:text-indigo-900'>
            Xem
          </Link>
          <div onClick={handleOpenModaldeleteMeal} className='ml-2 cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>
          {openModalMeal && (
            <DeleteConfirmBox
              handleDelete={handleDeleteMeal}
              closeModal={handleCloseModaldeleteMeal}
              title='Xác nhận xóa lịch trình'
              subtitle='Bạn có chắc chắn muốn xóa lịch trình này không?'
              isPending={deleteMealMutation.isPending}
            />
          )}
        </td>
      </tr>
    </>
  )
}
