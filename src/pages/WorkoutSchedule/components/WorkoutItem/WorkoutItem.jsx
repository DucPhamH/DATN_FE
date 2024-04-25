import { cutString } from '../../../../helpers/cutString'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function WorkoutItem({ workout }) {
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
        <td className='px-6 py-4 flex item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/schedule/ex-schedule/${workout._id}`} className='text-indigo-600 hover:text-indigo-900'>
            Xem
          </Link>
          <div className='ml-2 cursor-pointer text-red-600 hover:text-red-900'>Xóa</div>
        </td>
      </tr>
    </>
  )
}
