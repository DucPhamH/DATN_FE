import BMI from '../../assets/images/BMI.png'
import calo from '../../assets/images/calo.png'
import bodyFat from '../../assets/images/bodyFat.png'
import BMR from '../../assets/images/BMR.png'
import IBW from '../../assets/images/IBW.png'
import LBM from '../../assets/images/LBM.png'
import { currentAccount } from '../../apis/userApi'
import { useQuery } from '@tanstack/react-query'
import Counup from '../../components/GlobalComponents/Countup'
import Loading from '../../components/GlobalComponents/Loading'
import { Link } from 'react-router-dom'
import LineChart from './components/LineChart/LineChart'

export default function FitnessCalculatorHistory() {
  const { data: userData, isFetching } = useQuery({
    queryKey: ['me'],
    queryFn: () => {
      return currentAccount()
    }
  })
  console.log(userData)
  const user = userData?.data.result[0]
  // nếu các chỉ số đêu null thì không hiển thị
  if (
    user?.BMI === null &&
    user?.BMR === null &&
    user?.TDEE === null &&
    user?.body_fat === null &&
    user?.LBM === null &&
    user?.IBW === null
  ) {
    return (
      <div className='h-full mb-[30rem] text-gray-900 dark:text-gray-300 py-4 mx-3'>
        <div className='mx-2'>
          <div className='text-xl font-medium mb-2'>
            <span>Lịch sử tính toán</span>
          </div>
          <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
        </div>
        <div className='flex justify-center items-center mt-10'>
          <p className='text-lg font-semibold'>Chưa có dữ liệu</p>
        </div>
      </div>
    )
  }

  const checkNoteBMI = () => {
    if (user?.BMI < 18.5) {
      return 'Bạn đang quá gầy, hãy ăn uống điều độ nhé !'
    } else if (user?.BMI >= 18.5 && user?.BMI < 24.9) {
      return 'Bạn đang ở mức cân đối, hãy duy trì nhé !'
    } else if (user?.BMI >= 25 && user?.BMI < 29.9) {
      return 'Bạn đang thừa cân, hãy giảm cân nhé !'
    } else {
      return 'Bạn đang béo phì, hãy giảm cân nhé !'
    }
  }

  const checkNoteBodyFat = () => {
    if (user?.gender === 'male') {
      return 'Đối với nam giới không tập luyện nên giữ mức tổng % body fat ở khoảng 14 - 24%'
    }
    return 'Đối với nữ giới không tập luyện nên duy trì mức tổng % body fat ở khoảng 21 - 31% .'
  }

  const calculatePercentLBM = () => {
    const result = parseFloat((user.LBM / user.weight) * 100).toFixed(1)

    if (result < 70) {
      return `Kết quả của bạn là ${result}%, bạn đang quá gầy, hãy ăn uống điều độ nhé !`
    }
    if (result >= 70 && result < 90) {
      return `Kết quả của bạn là ${result}%, bạn đang ở mức cân đối, hãy duy trì nhé !`
    }
    if (result >= 90 && result < 100) {
      return `Kết quả của bạn là ${result}%, bạn đang thừa cân, hãy giảm cân nhé !`
    }
  }

  return (
    <div className='h-full mb-[30rem] text-gray-900 dark:text-gray-300 py-4 mx-3'>
      <div className='mx-2'>
        <div className='text-xl font-medium mb-2'>
          <span>Lịch sử tính toán</span>
        </div>
        <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div className='my-10'>
          <div>
            <LineChart profile={userData?.data.result[0]} />
          </div>
          <div className='flex w-full items-center justify-center'>
            <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2'>
              {user.BMI !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-orange-500 left-4 -top-6'>
                    <img src={BMI} className='h-8 w-8' alt='BMI' />
                  </div>
                  <Link
                    to='/fitness/fitness-calculator/BMI'
                    className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'
                  >
                    Cập nhật
                  </Link>
                  <div className='mt-8'>
                    <p className='text-2xl font-semibold my-2'>
                      BMI <span className='text-base'>(Body Mass Index)</span>
                    </p>
                    <div>
                      <div className='flex space-x-2 text-gray-400 text-sm'>
                        <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                        <p>{user.height} cm</p>
                      </div>
                      <div className='flex space-x-2 text-gray-400 text-sm my-2'>
                        <span className='text-black dark:text-gray-300 font-medium'>Cân nặng:</span>
                        <p>{user.weight} kg</p>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between gap-4'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>{checkNoteBMI()}</p>
                      </div>
                      <div className='my-2 min-w-[80px]'>
                        <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.BMI} title='kg/m^2' />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {user.BMR !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center bg-teal-500 absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6'>
                    <img src={BMR} className='h-8 w-8' alt='BMR' />
                  </div>
                  <Link
                    to='/fitness/fitness-calculator/BMR'
                    className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'
                  >
                    Cập nhật
                  </Link>
                  <div className='mt-8'>
                    <p className='text-2xl font-semibold my-2'>
                      BMR <span className='text-base'>(Basal Metabolic Rate)</span>
                    </p>
                    <div className='flex gap-x-4 flex-wrap'>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                          <p>{user.height} cm</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium '>Tuổi:</span>
                          <p>{user.age}</p>
                        </div>
                      </div>
                      <div className='text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Cân nặng:</span>
                          <p>{user.weight} kg</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Giới tính:</span>
                          <p>{user.gender}</p>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between gap-4'>
                      <div className='my-2 '>
                        <p className='font-semibold text-base mb-2'>Có thể bạn chưa biết</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Nếu bạn ăn uống dưới BMR, tức là không nạp đủ năng lượng mỗi ngày có thể cản trở các quá trình
                          hoạt động cơ bản của cơ thể.
                        </p>
                      </div>
                      <div className='my-2  min-w-[80px]'>
                        <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.BMR} title='cal' />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {user.TDEE !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center bg-green-500 absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6'>
                    <img src={calo} className='h-8 w-8' alt='TDEE' />
                  </div>
                  <Link
                    to='/fitness/fitness-calculator/calories'
                    className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'
                  >
                    Cập nhật
                  </Link>
                  <div className='mt-8'>
                    <p className='text-2xl font-semibold my-2'>
                      TDEE <span className='text-base'>(Total Daily Energy Expenditure)</span>
                    </p>
                    <div className='flex gap-x-4 flex-wrap '>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                          <p>{user.height} cm</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium '>Tuổi:</span>
                          <p>{user.age}</p>
                        </div>
                      </div>
                      <div className='text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Cân nặng:</span>
                          <p>{user.weight} kg</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Giới tính:</span>
                          <p>{user.gender}</p>
                        </div>
                      </div>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Mức độ hoạt động:</span>
                          <p>
                            {user.activity_level === 1.2
                              ? 'Không có hoặc ít vận động'
                              : user.activity_level === 1.375
                              ? 'Nhẹ: 1-3 ngày/tuần'
                              : user.activity_level === 1.55
                              ? 'Vừa phải: 3-5 ngày/tuần'
                              : user.activity_level === 1.725
                              ? 'Năng động: 6-7 ngày/tuần'
                              : 'Cực kỳ năng động, thể dục 2 lần/ngày'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between gap-4'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Có thể bạn chưa biết</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn muốn giảm cân, hãy ăn ít calo hơn TDEE, bạn muốn tăng cân, hãy ăn nhiều calo hơn TDEE.
                        </p>
                      </div>
                      <div className='my-2  min-w-[80px]'>
                        <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.TDEE} title='cal' />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {user.body_fat !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center bg-blue-500 absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6'>
                    <img src={bodyFat} className='h-8 w-8' alt='body_fat' />
                  </div>
                  <Link
                    to='/fitness/fitness-calculator/body-fat'
                    className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'
                  >
                    Cập nhật
                  </Link>
                  <div className='mt-8'>
                    <p className='text-2xl font-semibold my-2'>
                      Body Fat <span className='text-base'></span>
                    </p>
                    <div className='flex gap-x-4 flex-wrap '>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                          <p>{user.height} cm</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium '>Vòng cổ:</span>
                          <p>{user.neck} cm</p>
                        </div>
                      </div>
                      <div className='text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Vòng eo:</span>
                          <p>{user.waist} cm</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Giới tính:</span>
                          <p>{user.gender}</p>
                        </div>
                      </div>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Vòng hông:</span>
                          <p>{user.hip} cm</p>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between gap-4'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'> Có thể bạn chưa biết</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>{checkNoteBodyFat()}</p>
                      </div>
                      <div className='my-2 min-w-[80px]'>
                        <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.body_fat} title='%' />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {user.LBM !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center bg-blue-300 absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6'>
                    <img src={LBM} className='h-8 w-8' alt='LBM' />
                  </div>
                  <Link
                    to='/fitness/fitness-calculator/LBM'
                    className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'
                  >
                    Cập nhật
                  </Link>
                  <div className='mt-8'>
                    <p className='text-2xl font-semibold my-2'>
                      LBM <span className='text-base'>(Lean Body Mass)</span>
                    </p>
                    <div className='flex gap-x-4 flex-wrap '>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                          <p>{user.height} cm</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium '>Cân nặng:</span>
                          <p>{user.weight} kg</p>
                        </div>
                      </div>
                      <div className='text-gray-400 text-sm'>
                        <div className='flex space-x-2 '>
                          <span className='text-black dark:text-gray-300 font-medium'>Giới tính:</span>
                          <p>{user.gender}</p>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between gap-4'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>{calculatePercentLBM()}</p>
                      </div>
                      <div className='my-2  min-w-[80px]'>
                        <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.LBM} title='kg' />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {user.IBW !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center bg-red-700 absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6'>
                    <img src={IBW} className='h-8 w-8' alt='IBW' />
                  </div>
                  <Link
                    to='/fitness/fitness-calculator/IBW'
                    className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'
                  >
                    Cập nhật
                  </Link>
                  <div className='mt-8'>
                    <p className='text-2xl font-semibold my-2'>
                      IBW <span className='text-base'>(Idea Body Weight)</span>
                    </p>
                    <div className='flex gap-x-4 flex-wrap '>
                      <div className=' text-gray-400 text-sm'>
                        <div className='flex space-x-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Chiều cao:</span>
                          <p>{user.height} cm</p>
                        </div>
                        <div className='flex space-x-2 my-2'>
                          <span className='text-black dark:text-gray-300 font-medium'>Giới tính:</span>
                          <p>{user.gender}</p>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between gap-4'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Có thể bạn chưa biết</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Giữ ổn định được mức cân nặng của bạn ở mức hợp lý không chỉ giúp bạn giảm thiếu được những
                          nguy cơ gây hại cho sức khỏe của chính mình mà còn giúp bạn trông cân đối hơn.
                        </p>
                      </div>
                      <div className='my-2  min-w-[80px]'>
                        <p className='font-semibold text-base mb-2'>Kết quả</p>
                        <Counup number={user.IBW} title='kg' />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
