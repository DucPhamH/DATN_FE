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
  const data = {
    labels: ['Lượng calo còn lại', 'Lượng calo đã đạt được'],
    datasets: [
      {
        label: 'Biểu đồ lượng calo',
        data: [workout?.calo_target - workout?.total_calo_burn, workout?.total_calo_burn],
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
  return <Pie options={options} data={data} />
}
