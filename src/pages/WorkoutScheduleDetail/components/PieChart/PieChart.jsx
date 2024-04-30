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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

export default function PieChart({ workout }) {
  const checkDataCalo = () => {
    if (workout?.calo_target - workout?.total_calo_burn < 0) {
      return workout?.calo_target
    }
    return workout?.calo_target - workout?.total_calo_burn
  }

  const data = {
    labels: ['Lượng calo còn lại', 'Lượng calo đã đạt được'],
    datasets: [
      {
        label: 'Biểu đồ lượng calo',
        data: [checkDataCalo(), workout?.total_calo_burn],
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
        text: 'Biểu đồ lượng calo đạt được'
      }
    }
  }
  return (
    <div className='bg-white mx-2 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 col-span-1 flex justify-center  lg:h-[27rem] overflow-x-auto overflow-y-auto px-10 py-5 my-4 dark:border-none rounded-md dark:bg-color-primary border border-gray-300'>
      <Pie options={options} data={data} />
    </div>
  )
}
