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
import moment from 'moment'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)
export default function LineChart({ profile }) {
  // const dataCalo = lineData?.data.result.workoutDate

  const weightArray = profile?.pre_weight

  // lấy 7 ngày gần nhất tương ứng với 7 vị trí cuối cùng của mảng
  const last7Days = weightArray?.slice(weightArray.length - 10, weightArray.length)

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ theo dõi cân nặng 10 ngày gần nhất'
      }
    }
  }
  const labels = last7Days?.map((item) => moment(item.date).format('DD/MM'))
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cân nặng (kg)',
        data: last7Days?.map((item) => item.weight),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)'
      }
    ]
  }
  return (
    <div className='bg-white mx-2 mb-10 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-2 flex flex-col items-center gap-2 justify-center lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Line options={options} data={data} />
    </div>
  )
}
