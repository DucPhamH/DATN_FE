import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaBodyFat } from '../../utils/rules'
import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { calculateBodyFat, saveBodyFatData } from '../../apis/calculatorApi'
import toast from 'react-hot-toast'
import CalculatorModal from '../../components/GlobalComponents/CalculatorModal'
import Loading from '../../components/GlobalComponents/Loading'
import { AppContext } from '../../contexts/app.context'
import { setProfileToLS } from '../../utils/auth'

export default function BodyFat() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataBodyFat, setDataBodyFat] = useState({})
  const { setProfile, profile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaBodyFat),
    defaultValues: {
      height: profile?.height || '',
      gender: profile?.gender || 'male',
      waist: profile?.waist || '',
      neck: profile?.neck || '',
      hip: profile?.hip || ''
    }
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const calculateBodyFatMutation = useMutation({
    mutationFn: (body) => calculateBodyFat(body)
  })
  const saveBodyFatMutation = useMutation({
    mutationFn: (body) => saveBodyFatData(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setDataBodyFat(data)
    calculateBodyFatMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setDataBodyFat((prev) => ({ ...prev, body_fat: data.data.result }))
        handleOpenModal()
      },
      onError: () => {
        console.log('error')
      }
    })
  })

  const handleSaveBodyFatData = () => {
    saveBodyFatMutation.mutate(dataBodyFat, {
      onSuccess: (data) => {
        toast.success('Lưu chỉ số body fat thành công')
        setProfile(data?.data.result)
        setProfileToLS(data?.data.result)
        handleCloseModal()
      },
      onError: () => {
        toast.error('Lưu chỉ số body fat thất bại')
      }
    })
  }
  return (
    <>
      <div className='grid xl:mx-4  pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-4'>
          <main className='pt-8 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
              <article className='mx-auto w-full '>
                <header className='mb-3 not-format'>
                  <h1 className='mb-1 text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                    Cách tính body fat trong cơ thể
                  </h1>
                  <div className='flex items-center'>
                    Thu thập bởi: <span className='font-semibold text-red-600 dark:text-pink-400 ml-1'>Cook</span>
                    <span className='font-semibold'>Healthy</span>
                    <IoTimeOutline className='mr-1 ml-2' /> 02/04/2024
                  </div>
                </header>
                <p className='lead mb-4 font-medium'>
                  Body fat là công cụ để tính lượng mỡ thừa trong cơ thể, giúp đánh giá tình trạng thừa cân, béo phì của
                  mỗi người. Ngoài ra, hiện nay giới trẻ còn sử dụng cụm từ body fat để chỉ những cơ thể có “eo bánh mì”
                  quyến rũ. Hãy cùng tham khảo cách tính body fat để xác định cơ thể của bạn thuộc trường hợp nào nhé!
                </p>
                <div className='font-medium'>Xem thêm các công thức tính khác:</div>
                <ul>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link to='/fitness/fitness-calculator/IBW' className=' hover:underline'>
                      {' '}
                      Tính toán chỉ số IBW{' '}
                    </Link>
                  </li>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link to='/fitness/fitness-calculator/LBM' className=' hover:underline'>
                      {' '}
                      Tính toán chỉ số LBM
                    </Link>
                  </li>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link to='/fitness/fitness-calculator/water-need' className=' hover:underline'>
                      {' '}
                      Tính lượng nước uống cần thiết trong 1 ngày
                    </Link>
                  </li>
                </ul>

                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://i.ytimg.com/vi/mwvgCRR-jrY/maxresdefault.jpg'
                    alt=''
                  />
                </div>
                <p className='lead mb-3 font-medium'>
                  Body fat là thuật ngữ được sử dụng để chỉ tỷ lệ lượng mỡ có trong cơ thể so với tổng trọng lượng cơ
                  thể. Nó thường được đo lường dưới dạng phần trăm và là một chỉ số quan trọng để đánh giá sức khỏe và
                  tình trạng thể chất của người. Lượng mỡ trong cơ thể không chỉ đơn thuần là &quot;mỡ xấu,&quot; mà còn
                  bao gồm các loại mỡ có vai trò quan trọng trong các chức năng cơ thể.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>1. Body fat trong cơ thể là gì?</h2>
                <p className='mb-1'>
                  - Body fat là một khái niệm thường được sử dụng để đo lường lượng mỡ có mặt trên cơ thể so với lượng
                  cơ bắp. Nếu tỉ lệ này vượt quá mức tiêu chuẩn, có thể dẫn đến tình trạng thừa cân hoặc béo phì, đây là
                  điều không tốt cho sức khỏe.
                </p>
                <p className='mb-1'>
                  - Theo tạp chí Lifestyle của Mỹ, body fat được hiểu là chỉ số đánh giá tỷ lệ phần trăm mỡ trên cơ thể
                  so với tổng trọng lượng. BMI (Body Mass Index) là một chỉ số mà chuyên gia sức khỏe thường sử dụng để
                  đánh giá tình trạng cơ thể, bao gồm cả mức độ bình thường, suy dinh dưỡng, thừa cân, và béo phì.
                </p>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://i.ytimg.com/vi/RS3JuDwUZMU/maxresdefault.jpg'
                    alt=''
                  />
                </div>
                <p className='mb-1'>
                  Nói chung, lượng mỡ trong cơ thể có thể gây ra những ảnh hưởng xấu đối với sức khỏe và hình thể của
                  người. Các chỉ số về body fat sẽ cung cấp thông tin về tình trạng cơ thể, từ đó giúp xác định liệu cơ
                  thể có ổn định hay không, có cần điều chỉnh lối sống và chế độ dinh dưỡng hay không. Điều này giúp bạn
                  tính toán lượng calo cần giảm bớt thông qua việc tăng cường hoạt động vận động, nhằm đưa cơ thể về
                  trạng thái sức khỏe tốt nhất.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>2. Phân loại body fat</h2>

                <p className='mt-2'>
                  Mặc dù thuật ngữ &quot;fat&quot; thường được hiểu là lượng mỡ trên toàn bộ cơ thể, thực tế, cơ thể con
                  người chúng ta chứa nhiều loại mỡ khác nhau, mỗi loại đóng vai trò riêng và có ảnh hưởng khác nhau đối
                  với sức khỏe. Các loại chính bao gồm tế bào mỡ trắng, mỡ nâu và mỡ màu beige (nâu nhạt và vàng nhạt),
                  được dự trữ dưới dạng mỡ thiết yếu, mỡ dưới da và mỡ nội tạng.
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'>Mỡ trắng (white fat):</p>
                <p className='mt-2'>
                  Mỡ trắng được hình thành từ tế bào mỡ lớn màu trắng, thường được lưu trữ dưới da, xung quanh các nội
                  tạng và ở một số khu vực như cánh tay, mông và đùi. Chúng là nguồn dự trữ năng lượng của cơ thể và
                  đóng vai trò quan trọng trong chức năng của nhiều loại hormone như estrogen, leptin, insulin, cortisol
                  (hormone căng thẳng), và growth hormone (hormone tăng trưởng).
                </p>

                <p className='mt-2 font-medium dark:text-gray-300'>Mỡ nâu (brown fat):</p>
                <p className='mt-2'>
                  Mỡ nâu chủ yếu xuất hiện ở trẻ em, nhưng người lớn vẫn giữ một lượng nhỏ, thường ở cổ và vai. Mỡ nâu
                  giúp đốt cháy axit béo để tạo nhiệt và giữ ấm cơ thể. Sự nghiên cứu về cách kích thích hoạt động của
                  mỡ nâu đang nhận được sự quan tâm lớn để ngăn chặn béo phì.
                </p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://www.healthcourses.com.au/wp-content/uploads/2019/11/brownfatbyRaySoccio750-5.jpg'
                    alt=''
                  />
                </div>
                <p className='mt-2 font-medium dark:text-gray-300'>Mỡ màu beige (beige fat):</p>
                <p className='mt-2'>
                  Beige fat hay còn được gọi là brite fat, là một lĩnh vực nghiên cứu mới với tế bào mỡ hoạt động giữa
                  tế bào mỡ nâu và trắng. Tương tự như mỡ nâu, tế bào màu beige giúp đốt cháy mỡ hiệu quả hơn so với
                  việc dự trữ. Có niềm tin rằng một số hormone và enzyme được kích thích trong điều kiện căng thẳng,
                  lạnh, hoặc tập luyện có thể chuyển đổi mỡ trắng thành mỡ màu beige.
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'>Mỡ thiết yếu (essential fat):</p>
                <p className='mt-2'>
                  Mỡ thiết yếu là một loại mỡ cực kỳ quan trọng cho sự sống còn và sức khỏe của cơ thể. Nó xuất hiện
                  trong các khu vực như não, tủy xương, và dây thần kinh màng che bảo vệ các cơ quan nội tạng. Mỡ thiết
                  yếu đóng vai trò quan trọng trong việc điều chỉ hormone, bao gồm những hormone liên quan đến sinh sản,
                  hấp thụ vitamin và điều chỉnh nhiệt độ.
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'>Mỡ dưới da (subcutaneous fat):</p>
                <p className='mt-2'>
                  Mỡ dưới da là lượng mỡ được tích tụ dưới lớp da và là sự kết hợp của tế bào mỡ nâu, mỡ màu beige và mỡ
                  trắng. Đây là loại mỡ chiếm đa số trên cơ thể và có thể bóp hoặc véo được, đặc biệt là ở cánh tay,
                  vùng bụng, đùi và mông. Việc đo lường subcutaneous fat thường được thực hiện bằng cách sử dụng thước
                  kẹp, sau đó dùng các số liệu này để ước tính tỷ lệ mỡ cơ thể. Lượng mỡ dưới da vừa phải là điều bình
                  thường và có lợi cho sức khỏe, tuy nhiên, sự tích tụ quá mức có thể gây ra mất cân bằng hormone.
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'>Mỡ nội tạng (visceral fat):</p>
                <p className='mt-2'>
                  Mỡ nội tạng thường được biết đến là mỡ bụng, là loại mỡ trắng dự trữ trong bụng, xung quanh các cơ
                  quan nội tạng như gan, thận, tụy, ruột và tim. Mức độ mỡ nội tạng cao có thể tăng nguy cơ mắc các bệnh
                  như tiểu đường, bệnh tim, đột quỵ, và ung thư. Đây là một loại mỡ nguy hiểm mà việc kiểm soát là quan
                  trọng để duy trì sức khỏe.
                </p>

                <h2 className='font-bold text-xl mt-5 mb-3 dark:text-gray-300'>2. Cách tính Body Fat trong cơ thể</h2>
                <p className='mb-2'>
                  Đo lượng mỡ cơ thể là một quá trình quan trọng để đánh giá sức khỏe và tình trạng thể chất.
                </p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 mb-1'>
                    Đo chu vi vòng eo và rốn: Nam và nữ đều cần đo chu vi vòng eo quanh rốn mà không hóp bụng vào.
                  </li>
                  <li className='ml-6 mb-1'>Đo chu vi cổ: Bắt đầu từ dưới thanh quản, không căng cổ lên.</li>
                  <li className='ml-6 mb-1'>
                    Phụ nữ, đo chu vi hông: Đo chu vi của hông để sử dụng trong công thức tính chỉ số mỡ cơ thể.
                  </li>
                </ul>
                <p className='mt-2 font-medium dark:text-gray-300'>Công thức tính chỉ số body fat:</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nam giới: 495/(1.0324 - 0.19077(LOG(eo – cổ)) + 0.15456(LOG(chiều cao))) - 450.
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nữ giới: 495/(1.29579 - 0.35004(LOG(eo + hông – cổ)) + 0.22100(LOG(chiều cao))) - 450.
                  </li>
                </ul>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://img1.wsimg.com/isteam/ip/d2561a12-aed2-4099-ae4e-faa16967cc2d/body%20fat%20measurement%20locations.jpeg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true'
                    alt=''
                  />
                </div>
                <p>
                  Phương pháp cách tính body fat này mang lại cái nhìn tổng quan về lượng mỡ cơ thể, nhưng việc tìm đến
                  chuyên gia y tế là quan trọng để có đánh giá chi tiết và lời khuyên phù hợp với tình trạng sức khỏe và
                  mục tiêu tập luyện của từng người.
                </p>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 order-first xl:order-last my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán Body-Fat{' '}
              <p className='text-base text-black dark:text-gray-300'>(Theo phương trình SI, Metric Units)</p>
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <form onSubmit={onSubmit} className='p-3'>
              <Input
                title='Nhập chiều cao (cm)'
                type='number'
                name='height'
                register={register}
                errors={errors.height}
                id='height'
                placeholder='Nhập chiều cao của bạn'
              />
              <Input
                title='Nhập vòng eo (cm)'
                type='number'
                name='waist'
                register={register}
                errors={errors.waist}
                id='waist'
                placeholder='Nhập vòng eo của bạn'
              />
              <Input
                title='Nhập số đo vòng cổ (cm)'
                type='number'
                name='neck'
                register={register}
                errors={errors.neck}
                id='neck'
                placeholder='Nhập số đo vòng cổ của bạn'
              />
              <Input
                title='Nhập số đo hông (cm)'
                type='number'
                name='hip'
                register={register}
                errors={errors.hip}
                id='hip'
                placeholder='Nhập số đo vòng hông của bạn'
              />

              <div className='mb-3'>
                <div className='text-gray-400 lg:text-red-900 mb-1 dark:text-pink-300 text-left italic'>
                  Giới tính của bạn là:
                </div>
                <div className='flex items-center pb-2'>
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      name='default-radio'
                      value='male'
                      {...register('gender')}
                      id='male'
                      className='radio radio-success'
                    />
                    <label htmlFor='male' className='ms-2 text-sm w-20 font-medium text-gray-900 dark:text-gray-300'>
                      Nam
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      name='default-radio'
                      value='female'
                      {...register('gender')}
                      id='female'
                      className='radio radio-success'
                    />
                    <label htmlFor='female' className='ms-2 text-sm w-20 font-medium text-gray-900 dark:text-gray-300'>
                      Nữ
                    </label>
                  </div>
                </div>
              </div>
              <div className='flex justify-center'>
                {calculateBodyFatMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tính toán</button>
                )}
              </div>
            </form>
            {(profile?.body_fat || dataBodyFat.body_fat) && (
              <div className='flex mx-4 justify-center '>
                <div className='mt-5 w-full pb-10'>
                  <div className=' text-gray-700 flex justify-center dark:text-gray-300 font-semibold '>
                    Chỉ số body fat của bạn là: {profile?.body_fat || dataBodyFat.body_fat} %
                  </div>
                  <div className='text-red-700 flex justify-center dark:text-red-300 font-medium text-xs'>
                    Lưu ý: chỉ số body fat được tính dựa trên công thức chuẩn, chỉ mang tính chất tham khảo
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <CalculatorModal
            closeModal={handleCloseModal}
            title='Chỉ số body fat của bạn'
            saveData={handleSaveBodyFatData}
            helptext='Lưu ý: khi bạn lưu kết quả, các chỉ số liên quan sẽ được cập nhật và lưu lại trong hồ sơ cá nhân của bạn.'
            isPending={saveBodyFatMutation.isPending}
            data={calculateBodyFatMutation.data}
            unit='% body fat'
          />
        )}
      </div>
    </>
  )
}
