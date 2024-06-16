import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { getMealItem } from '../../../../apis/mealScheduleApi'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

export default function PieChart({ meal, profile }) {
  const { data: mealItem } = useQuery({
    queryKey: [
      'meal-item',
      {
        meal_schedule_id: meal._id,
        date: moment(new Date()).format('YYYY-MM-DD')
      }
    ],
    queryFn: () => {
      return getMealItem({
        meal_schedule_id: meal._id,
        date: moment(new Date()).format('YYYY-MM-DD')
      })
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const item = mealItem?.data.result[0] ? mealItem?.data.result[0].total_calories : 0

  const data = {
    labels: ['Lượng calo đã nạp trong ngày', 'Lượng calo còn lại trong ngày'],
    datasets: [
      {
        label: 'Biểu đồ lượng calo',
        data: [item, profile?.TDEE - item],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Biểu đồ lượng calo đã nạp và còn lại trong ngày ${moment(new Date()).format('DD/MM')}`
      }
    }
  }
  return (
    <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-1 flex flex-col justify-center  lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Pie options={options} data={data} />
      <div>
        <h1 className='text-center text-gray-500 mt-5 font-semibold'>
          {item === 0 ? 'Bạn chưa nạp calo trong hôm nay' : `Lượng calo đã nạp: ${item}/${profile?.TDEE} calories`}
        </h1>
      </div>
    </div>
  )
}
