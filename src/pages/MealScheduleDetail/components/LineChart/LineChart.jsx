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
import moment from 'moment'
import { getDateMealItem } from '../../../../apis/mealScheduleApi'
import { useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)
export default function LineChart({ meal }) {
  const [query, setQuery] = useState({ page: '1', limit: '7', meal_schedule_id: meal?._id })

  const { data: lineData } = useQuery({
    queryKey: ['line-data-meal', query],
    queryFn: () => {
      return getDateMealItem(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  const dataCalo = lineData?.data.result.mealDate

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ lượng dinh dưỡng đã, đang và dự kiến tiêu thụ'
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
      },
      {
        label: 'Lượng protein',
        data: dataCalo?.map((item) => item.total_protein),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      },
      {
        label: 'Lượng carb',
        data: dataCalo?.map((item) => item.total_carb),
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.5)'
      },
      {
        label: 'Lượng fat',
        data: dataCalo?.map((item) => item.total_fat),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }
    ]
  }
  return (
    <div className='bg-white  mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-2 flex flex-col items-center gap-2 justify-center lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Line options={options} data={data} />
      <div>
        <PaginationMini query={query} pageSize={lineData?.data.result.totalPage} setQuery={setQuery} title='Tuần' />
      </div>
    </div>
  )
}
