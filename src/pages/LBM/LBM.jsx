import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLBM } from '../../utils/rules'
import { useContext, useState } from 'react'
import { calculateLBM, saveLBMData } from '../../apis/calculatorApi'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CalculatorModal from '../../components/GlobalComponents/CalculatorModal'
import Loading from '../../components/GlobalComponents/Loading'
import { AppContext } from '../../contexts/app.context'
import { setProfileToLS } from '../../utils/auth'

export default function LBM() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataLBM, setDataLBM] = useState({})
  const { setProfile, profile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLBM),
    defaultValues: {
      weight: profile?.weight || '',
      height: profile?.height || '',
      gender: profile?.gender || 'male'
    }
  })
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const calculateLBMMutation = useMutation({
    mutationFn: (body) => calculateLBM(body)
  })

  const saveLBMMutation = useMutation({
    mutationFn: (body) => saveLBMData(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setDataLBM(data)
    calculateLBMMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setDataLBM((prev) => ({ ...prev, LBM: data.data.result }))
        handleOpenModal()
      },
      onError: () => {
        console.log('error')
      }
    })
  })

  const handleSaveLBMData = () => {
    saveLBMMutation.mutate(dataLBM, {
      onSuccess: (data) => {
        toast.success('Lưu chỉ số LBM thành công')
        setProfile(data?.data.result)
        setProfileToLS(data?.data.result)
        handleCloseModal()
      },
      onError: () => {
        toast.error('Lưu chỉ số LBM thất bại')
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
                    Lean Body Mass là gì? Cách tính LBM và thông tin sức khỏe
                  </h1>
                  <div className='flex items-center'>
                    Thu thập bởi: <span className='font-semibold text-red-600 dark:text-pink-400 ml-1'>Cook</span>
                    <span className='font-semibold'>Healthy</span>
                    <IoTimeOutline className='mr-1 ml-2' /> 02/04/2024
                  </div>
                </header>
                <p className='lead mb-4 font-medium'>
                  Khi tìm hiểu về sức khỏe, bạn đã nghe đến Lean Body Mass là gì hay chưa? Đây là thuật ngữ khá mới cho
                  người chưa tìm hiểu về sức khỏe cơ thể. Bài viết hôm nay sẽ giúp bạn hiểu kỹ hơn về thuật ngữ này nhé!
                  Cùng chúng tôi tìm hiểu nào!
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
                    <Link to='/fitness/fitness-calculator/BMI' className=' hover:underline'>
                      {' '}
                      Tính toán chỉ số BMI
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
                    src='https://havenathletic.com/cdn/shop/articles/Lean_Body_Mass.jpg?crop=center&height=1200&v=1670844982&width=1200'
                    alt=''
                  />
                </div>

                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>1. Lean Body Mass là gì?</h2>
                <p className='mb-1'>
                  - Lean Body Mass là gì? &quot;Lean Body Mass&quot; (LBM) là một thuật ngữ y học dùng để mô tả phần của
                  cơ thể không phải mỡ mà chứa các thành phần khác như cơ bắp, xương, nước và các mô không mỡ. Đây là
                  phần cơ thể quan trọng, cho biết trọng lượng thực sự của cơ thể mà không tính đến mỡ thừa.
                </p>
                <p className='mb-1'>
                  - Khi chúng ta nói về Lean Body Mass, chúng ta nói về trọng lượng của cơ thể mà không tính toán phần
                  mỡ. Nó bao gồm cơ bắp, xương, nước, tất cả những thứ quan trọng giúp cơ thể hoạt động, mạnh mẽ và khỏe
                  mạnh. Lean Body Mass thường được coi là một chỉ số quan trọng trong việc đo lường sức khỏe cơ bản và
                  cũng liên quan đến việc tăng cường cơ bắp và sức mạnh.
                </p>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/qhieBSP3Q7a6UPrtW2k9'
                    alt=''
                  />
                </div>
                <p className='mb-1'>
                  - Trong cơ thể, việc duy trì tỷ lệ LBM (Lean Body Mass) so với cân nặng là quan trọng để đảm bảo sức
                  khỏe. Mức tỷ lệ lý tưởng này dao động từ 70 - 90% đối với cả nam và nữ. Đối với nữ giới, tỷ lệ LBM
                  thường nên ở khoảng 70-85%, trong khi đó, nam giới thường cần tỷ lệ từ 80 - 90% để duy trì sức khỏe
                  tốt.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>2. Công thức tính Lean Body Mass</h2>

                <p className='mt-2'>
                  Cách tính Lean Body Mass có thể sử dụng các phương pháp tính theo các công thức như Boer, James, và
                  Hume. Cân nặng được tính bằng kg và chiều cao tính bằng cm:
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'> Công thức Boer</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nam giới: LBM (kg) = (0.452 × cân nặng) + (0.202 × chiều cao) − 39.3
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nữ giới: LBM (kg) = (0.356 × cân nặng) + (0.265 × chiều cao) − 29.8
                  </li>
                </ul>
                <p>
                  Ví dụ: Giả sử bạn là NAM, cân nặng 75kg - chiều cao 170cm: LBM = (0.452 × 75) + (0.202 × 170) − 39.3 =
                  67.6 (kg) =&gt; Tỷ lệ %LBM/Cân nặng = 67.6/75 × 100 = 90.13%
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'> Công thức James</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nam giới: LBM (kg) = (1.2 × cân nặng) - 116 × (cân nặng/chiều cao)^2
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nữ giới: LBM (kg) = (1.07 × cân nặng) - 148 × (cân nặng/chiều cao)^2
                  </li>
                </ul>
                <p>
                  Ví dụ: Nếu bạn là NỮ, cân nặng 55kg - chiều cao 160cm: LBM = 1.07 × 55 - 148(55/160)^2 = 43.8 (kg)
                  =&gt; Tỷ lệ %LBM/Cân nặng = 43.8/55 × 100 = 79.64%
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'> Công thức Hume</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nam giới: LBM (kg) = (0.32810 × cân nặng) + (0.33929 × chiều cao) - 29.5336
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nữ giới: LBM (kg) = (0.29569 × cân nặng) + (0.41813 × chiều cao) - 43.2933
                  </li>
                </ul>
                <p>
                  Ví dụ: Giả sử bạn là NAM, có chiều cao 175cm - cân nặng 85kg: LBM = (0.32810 × 85) + (0.33929 × 175) -
                  29.5336 = 63.93 (kg) =&gt; Tỷ lệ %LBM/Cân nặng = 63.93/85 × 100 = 75.21%
                </p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://www.wikihow.com/images/thumb/0/07/Determine-Lean-Body-Mass-Step-1.jpg/v4-460px-Determine-Lean-Body-Mass-Step-1.jpg.webp'
                    alt=''
                  />
                </div>

                <h2 className='font-bold text-xl mt-5 mb-3 dark:text-gray-300'>
                  2. Lean Body Mass tác động thế nào đến sức khỏe?
                </h2>
                <p className='mb-2'>
                  Tác động của Lean Body Mass (LBM) đối với sức khỏe được hiểu như việc duy trì khối lượng cơ trong cơ
                  thể. Khi chúng ta bước sang tuổi 40, cơ thể bắt đầu mất cơ bắp và dần tích tụ mỡ. Sự mất mát cơ bắp
                  không chỉ làm giảm sức mạnh, mà còn gây ảnh hưởng lớn đến sức khỏe, đồng thời tăng nguy cơ mắc các
                  bệnh mãn tính. Do đó, duy trì khối lượng cơ bắp là vô cùng quan trọng.
                </p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 mb-1'>
                    Giảm béo phì: LBM liên quan mật thiết đến trao đổi chất cơ bản (BMR) hoặc lượng calo đốt cháy khi
                    nghỉ ngơi. Cơ bắp cần nhiều calo hơn ngay cả khi nghỉ ngơi, giúp đốt cháy calo hiệu quả. Điều này
                    giúp giảm nguy cơ tích tụ mỡ thừa và béo phì, là yếu tố gây ra nhiều bệnh như tim mạch, tiểu đường,
                    gan nhiễm mỡ...
                  </li>
                  <li className='ml-6 mb-1'>
                    Bảo vệ khỏi bệnh tiểu đường và kháng insulin: Cơ bắp quan trọng trong việc loại bỏ glucose khỏi máu,
                    duy trì lượng đường máu ổn định. Có nhiều nghiên cứu chỉ ra rằng LBM có liên quan đến sự nhạy cảm
                    của insulin. Điều này giúp giảm nguy cơ phát triển bệnh tiểu đường.
                  </li>
                  <li className='ml-6 mb-1'>
                    Phục hồi sau ốm đau: LBM giúp cơ thể chống lại tác động của bệnh tật. Các nghiên cứu cho thấy mất cơ
                    bắp ảnh hưởng đến sự tái phát của bệnh ung thư và khả năng phục hồi sau bệnh.
                  </li>
                  <li className='ml-6 mb-1'>
                    Bảo vệ xương: LBM liên quan đến sức khỏe xương, giúp duy trì xương chắc khỏe. Một khối lượng cơ thấp
                    có thể dẫn đến xương yếu và nguy cơ gãy xương tăng.
                  </li>
                </ul>
                <p>
                  Theo dõi Lean Body Mass có thể giúp đảm bảo bạn giảm mỡ thừa mà không mất khối lượng cơ. Việc giảm cơ
                  không mong muốn vì nó làm giảm sức mạnh cơ thể và gây ảnh hưởng đến sức khỏe tổng thể.
                </p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://www.thethaothientruong.vn/uploads/2023/lean-body-mass.jpg'
                    alt=''
                  />
                </div>

                <p className='mb-2'>
                  Vậy là thông qua bài viết này, bạn đã biết khái niệm Lean Body Mass là gì?, cùng với đó là các công
                  tính tính LBM và biết thêm những tác động của LBM đối với sức khỏe chính bản thân mình. Hy vọng, dựa
                  theo bài viết này, bạn sẽ tự tính LBM cho bản thân và gia đình chuẩn xác nhất.
                </p>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 order-first xl:order-last my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán LBM <p className='text-base text-black dark:text-gray-300'>(Theo công thức Hume)</p>
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <form onSubmit={onSubmit} className='p-3'>
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
                title='Nhập chiều cao (cm)'
                type='number'
                name='height'
                register={register}
                errors={errors.height}
                id='height'
                placeholder='Nhập chiều cao của bạn'
              />
              <div className='mb-3'>
                <div className='text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left'>
                  Giới tính của bạn là:
                </div>
                <div className='flex items-center pb-2'>
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      defaultChecked
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
                {calculateLBMMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tính toán</button>
                )}
              </div>
            </form>
            <div>
              {(profile?.LBM || dataLBM.LBM) && (
                <div className='flex mx-4 justify-center '>
                  <div className='mt-5 w-full pb-10'>
                    <div className=' text-gray-700 flex justify-center dark:text-gray-300 font-semibold '>
                      Chỉ số LBM của bạn là: {profile?.LBM || dataLBM.LBM} kg
                    </div>
                    <div className='text-red-700 flex justify-center dark:text-red-300 font-medium text-xs'>
                      Lưu ý: chỉ số LBM cần được cập nhật định kỳ để theo dõi sức khỏe của bạn
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
            title='Chỉ số LBM của bạn'
            helptext='Lưu ý: khi bạn lưu kết quả, các chỉ số liên quan sẽ được cập nhật và lưu lại trong hồ sơ cá nhân của bạn.'
            saveData={handleSaveLBMData}
            isPending={saveLBMMutation.isPending}
            data={calculateLBMMutation.data}
            unit='kg'
          />
        )}
      </div>
    </>
  )
}
