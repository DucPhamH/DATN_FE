import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schemaWaterPerDay } from '../../utils/rules'
import { useContext, useState } from 'react'
import { calculateWaterIntake } from '../../apis/calculatorApi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CalculatorModal from '../../components/GlobalComponents/CalculatorModal'
import Loading from '../../components/GlobalComponents/Loading'
import { AppContext } from '../../contexts/app.context'

export default function WaterPerDay() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { profile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaWaterPerDay),
    defaultValues: {
      weight: profile?.weight || '',
      time: ''
    }
  })
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const calculateWaterMutation = useMutation({
    mutationFn: (body) => calculateWaterIntake(body)
  })

  const [dataWater, setDataWater] = useState({})
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setDataWater(data)
    calculateWaterMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        handleOpenModal()
        setDataWater((prev) => ({ ...prev, water: data.data.result }))
        toast.success('Tính toán lượng nước cần uống thành công')
      },
      onError: () => {
        console.log('error')
      }
    })
  })
  return (
    <>
      <div className='grid xl:mx-4  pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-4'>
          <main className='pt-8 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
              <article className='mx-auto w-full '>
                <header className='mb-3 not-format'>
                  <h1 className='mb-1 text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                    Cách tính lượng nước cần uống mỗi ngày của cơ thể và lưu ý khi uống
                  </h1>
                  <div className='flex items-center'>
                    Thu thập bởi: <span className='font-semibold text-red-600 dark:text-pink-400 ml-1'>Cook</span>
                    <span className='font-semibold'>Healthy</span>
                    <IoTimeOutline className='mr-1 ml-2' /> 02/04/2024
                  </div>
                </header>
                <p className='lead mb-4 font-medium'>
                  Nước là thành phần cơ bản và không thể thiếu trong quá trình trao đổi của cơ thể con người. Việc đảm
                  bảo uống đủ lượng nước hàng ngày có thể giúp cải thiện sức khỏe, tăng cường năng lượng và duy trì cân
                  nặng. Tuy nhiên, uống bao nhiêu nước mới là đủ, tham khảo bài viết dưới đây để biết cách tính lượng
                  nước cần uống.
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
                    <Link to='/fitness/fitness-calculator/body-fat' className=' hover:underline'>
                      {' '}
                      Tính toán lượng chất béo trong cơ thể
                    </Link>
                  </li>
                </ul>

                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://image.sggp.org.vn/w1000/Uploaded/2024/fwcgmzsfdazs/2023_12_15/1-1441.jpg.webp'
                    alt=''
                  />
                </div>

                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>
                  1. Cách tính lượng nước cần uống mỗi ngày của cơ thể
                </h2>
                <p className='mb-1'>
                  Hầu hết chúng ta thường được khuyên nên uống 2 lít nước/ngày, tuy nhiên đây chỉ là con số trung bình.
                  Lượng nước uống cơ bản hàng ngày được tính theo công thức sau:
                </p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Lượng nước uống cơ bản hàng ngày (lít) = cân nặng (kg) x 0.03 lít
                  </li>
                </ul>
                <p className='mb-1'>
                  Ví dụ, đối với người 60kg cân nặng thì lượng nước cơ bản cần uống mỗi ngày là: 60 (kg) x 0.03 lít =
                  1.8 lít. Vậy mỗi ngày bạn cần bổ sung cho cơ thể 1.8 lít tương đương 1800ml nước.
                </p>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://cdn.tgdd.vn//News/1163869//cach-tinh-chinh-xac-luong-nuoc-can-uong-moi-ngay-cua-co-the-1-800x450.jpg'
                    alt=''
                  />
                </div>
                <p className='mb-1'>
                  Theo Hệ thống Đại học Missouri - Mỹ, những người có cường độ luyện tập thể dục cao nên uống thêm 12 oz
                  (khoảng 360ml) nước cho mỗi 30 phút khi luyện tập. Như vậy, công thức tính lượng nước cần uống khi vận
                  động như sau:
                </p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    [Cân nặng(kg) + (Thời gian luyện tập/30 phút x 12 oz)] x 0.03 lít = Lượng nước (lít).
                  </li>
                </ul>
                <p className='mb-1'>
                  Ví dụ, với 60kg cân nặng như trên và bạn tập thể dục 60 phút mỗi ngày, ta sẽ có: [60kg (60/30 phút x
                  12 oz)] x 0.03 lít = (60 + 24) x 0.03 = 2.52 lít nước/ngày.
                </p>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://cdn.tgdd.vn//News/1163869//cach-tinh-chinh-xac-luong-nuoc-can-uong-moi-ngay-cua-co-the-2-800x450.jpg'
                    alt=''
                  />
                </div>
                <p className='mb-1'>Lượng nước mỗi nhóm tuổi cần uống cụ thể như sau:</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Trẻ em cân nặng 1 - 10kg: Mỗi ngày cần bổ sung 100ml nước/kg cân nặng
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Trẻ em cân nặng 11 - 20kg: Mỗi ngày cần bổ sung 1.000ml nước và thêm 50ml đối với mỗi 1kg tăng thêm.
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Trẻ em nặng từ 21kg trở lên: Mỗi ngày cần bổ sung 1.500ml và thêm 20ml đối với mỗi 1kg tăng thêm.
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Trẻ vị thành niên 10 - 18 tuổi: Mỗi ngày cần bổ sung 40ml nước/kg cân nặng.
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Người trưởng thành 19 - 30 tuổi và có hoạt động thể lực nặng: Mỗi ngày cần bổ sung khoảng 40ml
                    nước/kg cân nặng.
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Người lớn 19 - 55 tuổi, hoạt động thể lực ở mức trung bình: Mỗi ngày cần bổ sung khoảng 35ml nước/kg
                    cân nặng.
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Người trưởng thành trên 55 tuổi: Mỗi ngày cần bổ sung khoảng 30ml nước/kg cân nặng..
                  </li>
                </ul>

                <h2 className='font-bold text-xl mt-5 mb-3 dark:text-gray-300'>2. Các lưu ý khi uống nước</h2>
                <p className='mb-2'>
                  Trên thực tế, có 4 yếu tố ảnh hưởng đến lượng nước bạn cần bổ sung mỗi ngày, cụ thể:
                </p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 mb-1'>
                    Hoạt động thể chất: Vận động thường xuyên giúp cơ thể đổ mồ hôi, do đó bạn cần uống nước để bù đắp
                    lượng nước mà cơ thể đã bài tiết ra ngoài qua mồ hôi. Bạn nên chú ý uống đủ nước trước, trong, sau
                    khi luyện tập và bổ sung thêm nước điện giải nếu đang luyện tập trong cường độ cao.
                  </li>
                  <li className='ml-6 mb-1'>
                    Yếu tố môi trường: Nhiệt độ và độ ẩm tăng cao cũng ảnh hưởng đến lượng nước bạn cần bổ sung mỗi
                    ngày. Những ngày thời tiết nóng ẩm, mồ hôi bài tiết nhiều hơn nên bạn cần uống nhiều nước hơn.
                  </li>
                  <li className='ml-6 mb-1'>
                    Vấn đề sức khỏe: Tình trạng nôn mửa, sốt, tiêu chảy,... khiến cơ thể bạn mất nhiều nước và chất điện
                    giải hơn. Do đó, điều bạn cần làm là bù nước bằng đường uống, sử dụng dung dịch oresol để bù lại
                    lượng nước và chất điện giải đã mất.
                  </li>
                  <li className='ml-6 mb-1'>
                    Mang thai hoặc cho con bú: Phụ nữ trong thời kỳ mang thai hoặc cho con bú cần bổ sung nước cho cơ
                    thể nhiều hơn các đối tượng khác. Văn phòng Sức khỏe Phụ nữ khuyến cáo rằng mỗi ngày, phụ nữ mang
                    thai nên bổ sung khoảng 10 cốc (tương đương 2,4 lít) nước trong khi phụ nữ đang cho con bú nên bổ
                    sung khoảng 13 cốc (tương đương 3,1 lít) nước mỗi ngày.
                  </li>
                </ul>

                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://primer.vn/wp-content/uploads/2023/07/luong-nuoc-uong-moi-ngay-theo-can-nang-2.jpg'
                    alt=''
                  />
                </div>
                <h2 className='font-bold text-xl mt-5 mb-3 dark:text-gray-300'>3. Thời điểm bạn nên uống nước</h2>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://cdn.tgdd.vn//News/1163869//cach-tinh-chinh-xac-luong-nuoc-can-uong-moi-ngay-cua-co-the-5-800x450.jpg'
                    alt=''
                  />
                </div>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 mb-1'>
                    Khi thức dậy: Buổi sáng là một trong những thời điểm lý tưởng để bạn bắt đầu uống nước. Sau một thời
                    gian dài không ăn uống, cơ thể của bạn cần được cung cấp nước. Đặc biệt, uống một cốc nước lọc vắt
                    thêm nửa quả chanh vào buổi sáng giúp tăng cường vitamin C, kali và chất chống oxy hóa cho cơ thể.
                  </li>
                  <li className='ml-6 mb-1'>
                    Bất cứ khi nào bạn đổ mồ hôi: Bất kỳ hoạt động nào cũng có thể khiến cơ thể bạn đổ mồ hôi: Dù là tắm
                    nước nóng hay tiếp xúc cơ thể với ánh nắng mặt trời trong một thời gian dài. Đổ mồ hôi để giúp cơ
                    thể hạ nhiệt khiến bạn mau khát hơn, do đó bạn cần uống nhiều nước để bù lại lượng nước đã mất.
                  </li>
                  <li className='ml-6 mb-1'>
                    Khi tập thể dục: Tập luyện thể thao với cường độ cao khiến cơ thể bạn đổ nhiều mồ hôi hơn. Bạn nên
                    bổ sung cho cơ thể 150 - 300ml nước sau khoảng 10 - 15 phút hoạt động thể chất.
                  </li>
                  <li className='ml-6 mb-1'>
                    Trước bữa ăn: Uống nước trước bữa ăn có thể giúp bạn giảm cân hiệu quả. Một nghiên cứu cho thấy
                    những người bổ sung 500ml nước lọc trước bữa ăn, sau 12 tuần, họ giảm 1.5kg so với những người không
                    làm điều này.
                  </li>
                  <li className='ml-6 mb-1'>
                    Khi bạn cần tập trung: Thời điểm đầu giờ chiều là lúc cơ thể bạn dễ bị hao hụt năng lượng và sự tập
                    trung nhất. Lúc này, thay vì uống cà phê, bạn nên uống nước lọc (có thể thêm một chút chanh) để cải
                    thiện tâm trạng và sự tập trung của bạn.
                  </li>
                </ul>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 order-first xl:order-last my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán lượng nước uống
              <p className='text-base text-black dark:text-gray-300'></p>
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <form noValidate onSubmit={onSubmit} className='p-3'>
              <Input
                title='Nhập cân nặng (kg)'
                type='number'
                name='weight'
                register={register}
                errors={errors.weight}
                id='weight'
                placeholder='Nhập cân nặng của bạn'
              />
              <Input
                title='Nhập thời gian tập luyện (phút)'
                type='number'
                name='time'
                register={register}
                errors={errors.time}
                id='time'
                placeholder='Nhập thời gian tập luyện của bạn'
              />

              <div className='flex justify-center'>
                {calculateWaterMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tính toán</button>
                )}
              </div>
            </form>
            <div>
              {dataWater.water && (
                <div className='flex mx-4 justify-center '>
                  <div className='mt-5 w-full pb-10'>
                    <div className=' text-gray-700 flex justify-center dark:text-gray-300 font-semibold '>
                      Bạn cần tiêu thụ: {dataWater.water} lít nước mỗi ngày
                    </div>
                    <div className='text-red-700 flex justify-center dark:text-red-300 font-medium text-xs'>
                      Lưu ý: Đây chỉ là một con số ước lượng, bạn cần tư vấn thêm từ chuyên gia dinh dưỡng để có lượng
                      nước cần uống chính xác.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isModalOpen && (
          <CalculatorModal
            closeModal={handleCloseModal}
            title='Lượng nước cần uống mỗi ngày'
            helptext='Lưu ý: Đây chỉ là một con số ước lượng, bạn cần tư vấn thêm từ chuyên gia dinh dưỡng để có lượng nước cần uống chính xác.'
            isPending={calculateWaterMutation.isLoading}
            data={calculateWaterMutation.data}
            unit='lít'
          />
        )}
      </div>
    </>
  )
}
