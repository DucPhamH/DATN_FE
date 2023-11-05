import { FaLightbulb } from 'react-icons/fa'
import BMI from '../../assets/images/BMI.png'
import calo from '../../assets/images/calo.png'
import bodyFat from '../../assets/images/bodyFat.png'
import BMR from '../../assets/images/BMR.png'
import IBW from '../../assets/images/IBW.png'
import LBM from '../../assets/images/LBM.png'
import caloBurned from '../../assets/images/caloBurned.png'
import waterNeed from '../../assets/images/waterNeed.png'
export default function FitnessCaculator() {
  return (
    <div>
      <div className='h-full text-gray-900 dark:text-white py-6 mx-3'>
        <h2 className='text-2xl font-semibold mx-3 text-red-700 dark:text-gray-300'>Công cụ tính toán</h2>
        <div className='mx-3 mt-4  dark:bg-gray-900 rounded-lg bg-white p-3 italic tracking-[0.05rem] text-gray-800 dark:text-gray-400 font-normal'>
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
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-orange-500  rounded-full dark:text-orange-100 bg-orange-500'>
              <img className='h-8 w-8' src={BMI} alt='BMI' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính chỉ số BMI</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>
                Body Mass Index Caculator
              </p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-green-500  rounded-full dark:text-green-100 bg-green-500'>
              <img className='h-8 w-8' src={calo} alt='calo' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính chỉ số Calo</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>Calories Caculator</p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-blue-500 rounded-full dark:text-blue-100 bg-blue-500'>
              <img className='h-8 w-8' src={bodyFat} alt='bodyfat' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính lượng chất béo</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>Body Fat Caculator</p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-teal-500 rounded-full dark:text-teal-100 bg-teal-500'>
              <img className='h-8 w-8' src={BMR} alt='BMR' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính chỉ số BMR</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>
                Basal Metabolic Rate Caculator
              </p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-teal-500 rounded-full dark:text-teal-100 bg-red-700'>
              <img className='h-8 w-8' src={IBW} alt='IBW' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính chỉ số IBW</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>
                Idea Wody Weight Caculator
              </p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-orange-500 rounded-full dark:text-orange-100 bg-blue-300'>
              <img className='h-8 w-8' src={LBM} alt='LBM' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính chỉ số LBM</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>
                Lean Body Mass Caculator
              </p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-orange-500 rounded-full dark:text-orange-100 bg-pink-500'>
              <img className='h-8 w-8' src={caloBurned} alt='LBM' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính lượng Calo đốt cháy</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>
                Calories Burned Caculator
              </p>
            </div>
          </div>
          <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
            <div className='p-3 mr-4 text-orange-500 rounded-full dark:text-orange-100 bg-green-800'>
              <img className='h-8 w-8' src={waterNeed} alt='waterNeed' />
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>Tính lượng nước uống</p>
              <p className='text-xs font-semibold line-clamp-1 text-gray-600 dark:text-gray-400'>
                Water Per Day Caculator
              </p>
            </div>
          </div>
        </div>
        <div className='flex justify-end mx-3 items-center'>
          <button className='px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 hover:bg-red-600 border border-transparent rounded-lg '>
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  )
}
