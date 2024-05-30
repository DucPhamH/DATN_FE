import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { deleteWorkoutSchedule } from '../../../../apis/workoutScheduleApi'
import { queryClient } from '../../../../main'
import toast from 'react-hot-toast'
import { useState } from 'react'
import DeleteConfirmBox from '../../../../components/GlobalComponents/DeleteConfirmBox'
import { cutString } from '../../../../utils/helper'

export default function WorkoutItem({ workout }) {
  const [openModalWorkout, setOpenModalWorkout] = useState(false)

  const handleCloseModaldeleteWorkout = () => {
    setOpenModalWorkout(false)
  }

  const handleOpenModaldeleteWorkout = () => {
    setOpenModalWorkout(true)
  }
  const deleteWorkOutMutation = useMutation({
    mutationFn: (id) => deleteWorkoutSchedule(id)
  })

  const handleDeleteWorkout = () => {
    deleteWorkOutMutation.mutate(workout._id, {
      onSuccess: () => {
        queryClient.invalidateQueries('workout-schedule')
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
          <div className='text-sm text-gray-500'>{cutString(workout.name, 20)}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>{workout.calo_target} cal</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(workout.start_date).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(workout.end_date).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 flex gap-2 item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/schedule/ex-schedule/${workout._id}`} className='text-indigo-600 hover:text-indigo-900'>
            Xem
          </Link>
          <div onClick={handleOpenModaldeleteWorkout} className=' cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>
          {openModalWorkout && (
            <DeleteConfirmBox
              handleDelete={handleDeleteWorkout}
              closeModal={handleCloseModaldeleteWorkout}
              title='Xác nhận xóa lịch trình'
              subtitle='Bạn có chắc chắn muốn xóa lịch trình này không?'
              isPending={deleteWorkOutMutation.isPending}
            />
          )}
        </td>
      </tr>
    </>
  )
}
