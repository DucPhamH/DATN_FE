import { FaLightbulb } from 'react-icons/fa'
import BMI from '../../assets/images/BMI.png'
import calo from '../../assets/images/calo.png'
import bodyFat from '../../assets/images/bodyFat.png'
import BMR from '../../assets/images/BMR.png'
import IBW from '../../assets/images/IBW.png'
import LBM from '../../assets/images/LBM.png'
import caloBurned from '../../assets/images/caloBurned.png'
import waterNeed from '../../assets/images/waterNeed.png'
import FitnessCard from '../../components/CardComponents/FitnessCard'

const fitnessItems = [
  {
    id: 1,
    name: 'Tính chỉ số BMI',
    image: BMI,
    description: 'Body Mass Index Calculator',
    link: '/fitness/fitness-calculator/BMI',
    color: 'bg-orange-500'
  },
  {
    id: 2,
    name: 'Tính chỉ số TDEE',
    image: calo,
    description: 'TDEE Calculator',
    link: '/fitness/fitness-calculator/calories',
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Tính lượng chất béo',
    image: bodyFat,
    description: 'Body Fat Calculator',
    link: '/fitness/fitness-calculator/body-fat',
    color: 'bg-blue-500'
  },
  {
    id: 4,
    name: 'Tính chỉ số BMR',
    image: BMR,
    description: 'Basal Metabolic Rate Calculator',
    link: '/fitness/fitness-calculator/BMR',
    color: 'bg-teal-500'
  },
  {
    id: 5,
    name: 'Tính chỉ số IBW',
    image: IBW,
    description: 'Idea Body Weight Calculator',
    link: '/fitness/fitness-calculator/IBW',
    color: 'bg-red-700'
  },
  {
    id: 6,
    name: 'Tính chỉ số LBM',
    image: LBM,
    description: 'Lean Body Mass Caculator',
    link: '/fitness/fitness-calculator/LBM',
    color: 'bg-blue-300'
  },
  {
    id: 7,
    name: 'Tính lượng Calo đốt cháy',
    image: caloBurned,
    description: 'Calories Burned Calculator',
    link: '/fitness/fitness-calculator/calo-burned',
    color: 'bg-pink-500'
  },
  {
    id: 8,
    name: 'Tính lượng nước uống',
    image: waterNeed,
    description: 'Water Per Day Calculator',
    link: '/fitness/fitness-calculator/water-need',
    color: 'bg-green-800'
  }
]

export default function FitnessCaculator() {
  return (
    <div className='h-full text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mb-2 mx-3'>
        <div className='text-xl font-medium mb-2'>
          <span>Công cụ tính toán </span>
        </div>
        <div className='border-b-[3px] mb-2 w-[10%] border-red-300 '></div>
      </div>
      <div className='mx-3 mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 text-sm font-medium tracking-[0.05rem] text-gray-800 dark:text-gray-400 '>
        <div className='m-1 flex justify-center gap-2'>
          <div className='mt-1'>
            <FaLightbulb />
          </div>
          Công cụ tính chỉ số cơ thể là một công cụ trực tuyến cung cấp cho bạn khả năng đo lường và phân tích các chỉ
          số liên quan đến cơ thể con người, nhằm giúp bạn có thể đánh giá và theo dõi sức khỏe, tình trạng cơ thể, và
          cải thiện chất lượng cuộc sống .
        </div>
        <div className='m-1 flex justify-center gap-2'>
          <div className='mt-1'>
            <FaLightbulb />
          </div>
          Công cụ tính chỉ số cơ thể đóng vai trò quan trọng trong việc đưa ra các khuyến nghị về chế độ ăn uống và
          luyện tập thích hợp. Nhờ tích hợp các thông số này, bạn có thể tạo ra kế hoạch cải thiện sức khỏe và tạo ra
          một phong cách sống cân đối.
        </div>
      </div>
      <div className='grid gap-3 md:gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 pt-10 mx-2'>
        {fitnessItems.map((fitnessItem) => (
          <FitnessCard key={fitnessItem.id} fitnessItem={fitnessItem} />
        ))}
      </div>
    </div>
  )
}
