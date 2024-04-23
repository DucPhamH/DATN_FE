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
          <div className='flex w-full items-center justify-center'>
            <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2'>
              {user.BMI !== null && (
                <div className='relative dark:bg-gray-900  bg-white py-6 px-6 rounded-3xl w-full my-4 shadow-xl'>
                  <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-orange-500 left-4 -top-6'>
                    <img src={BMI} className='h-8 w-8' alt='BMI' />
                  </div>
                  <span className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'>
                    Cập nhật
                  </span>
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
                    <div className='flex justify-between'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn đang quá gầy, hãy ăn uống điều độ nhé !
                        </p>
                      </div>
                      <div className='my-2'>
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
                  <span className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'>
                    Cập nhật
                  </span>
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
                    <div className='flex justify-between'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn đang quá gầy, hãy ăn uống điều độ nhé !
                        </p>
                      </div>
                      <div className='my-2'>
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
                  <span className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'>
                    Cập nhật
                  </span>
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
                          <p>{user.activity_level}</p>
                        </div>
                      </div>
                    </div>

                    <div className='border-t-2 dark:border-gray-500' />
                    <div className='flex justify-between'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn đang quá gầy, hãy ăn uống điều độ nhé !
                        </p>
                      </div>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Kết quả tính toán</p>
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
                  <span className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'>
                    Cập nhật
                  </span>
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
                    <div className='flex justify-between'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn đang quá gầy, hãy ăn uống điều độ nhé !
                        </p>
                      </div>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Kết quả tính toán</p>
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
                  <span className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'>
                    Cập nhật
                  </span>
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
                    <div className='flex justify-between'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn đang quá gầy, hãy ăn uống điều độ nhé !
                        </p>
                      </div>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Kết quả tính toán</p>
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
                  <span className='flex items-center absolute right-4 top-4 text-sm font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition-all'>
                    Cập nhật
                  </span>
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
                    <div className='flex justify-between'>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Lưu ý</p>
                        <p className='text-sm font-medium text-red-700 dark:text-pink-300'>
                          Bạn đang quá gầy, hãy ăn uống điều độ nhé !
                        </p>
                      </div>
                      <div className='my-2'>
                        <p className='font-semibold text-base mb-2'>Kết quả tính toán</p>
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
