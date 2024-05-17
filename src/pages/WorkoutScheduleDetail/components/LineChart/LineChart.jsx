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
import { Line } from 'react-chartjs-2'
import PaginationMini from '../../../../components/GlobalComponents/PaginationMini/PaginationMini'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getDateWorkoutItem } from '../../../../apis/workoutScheduleApi'
import { useState } from 'react'
import moment from 'moment'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)
export default function LineChart({ workout }) {
  const [query, setQuery] = useState({ page: '1', limit: '7', workout_schedule_id: workout?._id })

  const { data: lineData } = useQuery({
    queryKey: ['line-data', query],
    queryFn: () => {
      return getDateWorkoutItem(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const dataCalo = lineData?.data.result.workoutDate

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ lượng calo đã, đang và dự kiến đốt cháy'
      }
    }
  }
  const labels = dataCalo?.map((item) => moment(item.date).format('DD/MM'))
  const data = {
    labels,
    datasets: [
      {
        label: 'Lượng calo',
        data: dataCalo?.map((item) => item.total_calories),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }
  return (
    <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-2 flex flex-col items-center gap-2 justify-center lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Line options={options} data={data} />
      <div>
        <PaginationMini query={query} pageSize={lineData?.data.result.totalPage} setQuery={setQuery} title='Tuần' />
      </div>
    </div>
  )
}
