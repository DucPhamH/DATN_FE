import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaBMI } from '../../utils/rules'
import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { calculateBMI, saveBMIData } from '../../apis/calculatorApi'
import toast from 'react-hot-toast'
import CalculatorModal from '../../components/GlobalComponents/CalculatorModal'
import Loading from '../../components/GlobalComponents/Loading'
import { AppContext } from '../../contexts/app.context'
import { setProfileToLS } from '../../utils/auth'
import { convertCentimeterToMeter } from '../../utils/helper'

export default function BMI() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataBMI, setDataBMI] = useState({})
  const { setProfile, profile } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaBMI),
    defaultValues: {
      weight: profile?.weight || '',
      height: profile?.height || ''
    }
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const calculateBMIMutation = useMutation({
    mutationFn: (body) => calculateBMI(body)
  })

  const saveBMIMutation = useMutation({
    mutationFn: (body) => saveBMIData(body)
  })

  const onSubmit = handleSubmit((data) => {
    // data dạng object chứa các giá trị height, weight
    console.log(data)
    const newData = {
      ...data,
      height: convertCentimeterToMeter(data.height)
    }
    setDataBMI(newData)
    console.log(newData)
    calculateBMIMutation.mutate(newData, {
      onSuccess: (data) => {
        // set tiếp giá trị BMI vào dataBMI
        setDataBMI((prev) => ({ ...prev, BMI: data.data.result }))
        handleOpenModal()
      },
      onError: () => {
        console.log('error')
      }
    })
  })

  // lấy kết quả BMI và các chỉ số height, weight để lưu vào database\

  const handleSaveBMIData = () => {
    // setDataBMI dạng object chứa các giá trị height, weight, BMI
    saveBMIMutation.mutate(dataBMI, {
      onSuccess: (data) => {
        toast.success('Lưu chỉ số BMI thành công')
        setProfile(data?.data.result)
        setProfileToLS(data?.data.result)
        handleCloseModal()
      },
      onError: () => {
        toast.error('Lưu chỉ số BMI thất bại')
      }
    })
  }
  const checkNoteBMI = () => {
    if ((profile?.BMI || dataBMI.BMI) < 18.5) {
      return 'Bạn đang quá gầy, hãy ăn uống điều độ nhé !'
    } else if ((profile?.BMI || dataBMI.BMI) >= 18.5 && (profile?.BMI || dataBMI.BMI) < 24.9) {
      return 'Bạn đang ở mức cân đối, hãy duy trì nhé !'
    } else if ((profile?.BMI || dataBMI.BMI) >= 25 && (profile?.BMI || dataBMI.BMI) < 29.9) {
      return 'Bạn đang thừa cân, hãy giảm cân nhé !'
    } else {
      return 'Bạn đang béo phì, hãy giảm cân nhé !'
    }
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
                    CÁCH TÍNH VÀ Ý NGHĨA CỦA CHỈ SỐ BMI TRONG ĐÁNH GIÁ TÌNH TRẠNG CƠ THỂ
                  </h1>
                  <div className='flex items-center'>
                    Thu thập bởi: <span className='font-semibold text-red-600 dark:text-pink-400 ml-1'>Cook</span>
                    <span className='font-semibold'>Healthy</span>
                    <IoTimeOutline className='mr-1 ml-2' /> 02/04/2024
                  </div>
                </header>
                <div className='font-medium'>Xem thêm các công thức tính khác:</div>
                <ul>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link to='/fitness/fitness-calculator/BMR' className=' hover:underline'>
                      Tính chỉ số BMR
                    </Link>
                  </li>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link to='/fitness/fitness-calculator/calories' className=' hover:underline'>
                      Tìm hiểu và tính toán chỉ số Calo
                    </Link>
                  </li>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link to='/fitness/fitness-calculator/body-fat' className=' hover:underline'>
                      Tính toán lượng chất béo trong cơ thể
                    </Link>
                  </li>
                </ul>
                <p className='lead mb-3 font-medium'>
                  Chỉ số BMI thường được sử dụng để xác định tình trạng cơ thể ở mức bình thường, suy dinh dưỡng hay béo
                  phì. Chỉ số này tính dựa trên chiều cao và cân nặng cơ thể, giúp chúng ta có cái nhìn khách quan nhất
                  về tình trạng cân nặng bản thân.
                </p>

                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>1. Chỉ số BMI là gì?</h2>
                <p>
                  Dưới đây là bảng thống kê phân loại mức độ gầy - béo dựa trên chỉ số BMI theo cả số liệu của Tổ chức y
                  tế thế giới (WHO) dành cho người Châu Âu lẫn số liệu của Hiệp hội đái đường các nước Châu Á dành cho
                  người Châu Á.
                </p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://cdn.tgdd.vn//News/1180083//cach-tinh-ti-le-co-the-giup-ban-xac-dinh-voc-dang-cua-minh-chuan-khong3-800x450.jpg'
                    alt=''
                  />
                </div>

                <p className='mt-2 font-medium dark:text-gray-300'>Cụ thể cách tính như sau: </p>
                <div className='mb-3 mx-5'>
                  <p className='italic'>
                    <span className='font-medium text-red-700 dark:text-sky-300'>BMI = Cân nặng/ (Chiều cao)^2</span>{' '}
                  </p>
                  <p className='dark:text-gray-300'>(Trong đó chiều cao tính đơn vị mét, cân nặng tính theo kg.)</p>
                </div>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://cdn.tgdd.vn/Files/2020/08/10/1278602/cach-tinh-chi-so-bmi-cua-co-the-1_800x450.jpg'
                    alt=''
                  />
                </div>

                <p>
                  Chỉ số BMI càng cao thì lượng mỡ trong cơ thể càng nhiều, dẫn tới nhiều nguy cơ phát sinh bệnh lý, vấn
                  đề sức khỏe nghiêm trọng. Các bệnh thường gặp ở người cân nặng quá khổ là{' '}
                  <span className='font-medium dark:text-gray-300'>
                    béo phì, huyết áp cao, bệnh tim mạch, tiểu đường,…
                  </span>{' '}
                  Ngược lại nếu chỉ số BMI thấp, người bệnh cũng có nguy cơ gặp phải các vấn đề{' '}
                  <span className='font-medium dark:text-gray-300'>thiếu máu, miễn dịch kém hay loãng xương.</span>{' '}
                </p>

                <p>
                  Chỉ các đối tượng có cân nặng ổn định bình thường thì chỉ số tính BMI mới phản ánh chính xác. Vì thế
                  không nên tính chỉ số BMI và đánh giá với trẻ dưới 18 tuổi, người già, phụ nữ mang thai, vận động
                  viên. Mặc dù chỉ số này đã được nhà bác học Adolphe Quetelet đưa ra từ năm 1832 nhưng đến nay, nó vẫn
                  được sử dụng trong y tế và sức khỏe, áp dụng rộng rãi trên toàn thế giới.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>2. Ý nghĩa của chỉ số BMI</h2>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://shopmyphamhn.com/ckfinder/userfiles/images/257209067_140025038360142_8998998080792324161_n.jpg'
                    alt=''
                  />
                </div>
                <p>
                  Như vậy, với người Việt Nam, chỉ số BMI lý tưởng là từ 18,5 - 22,9. Nếu chỉ BMI dưới 18.5 thì đây là
                  dấu hiệu bạn bị thiếu cân, cần tập thể thao và thực hiện chế độ ăn uống nghỉ ngơi tốt. Chỉ số BMI lớn
                  hơn 23 được coi là thừa cân, song tình trạng không quá trầm trọng nên bạn có thể tập luyện thể thao và
                  giảm cân tự nhiên trong vòng một vài tháng là có thể có vóc dáng lý tưởng.
                </p>
                <h2 className='font-bold text-lg my-3 dark:text-gray-300'>2.1. Chỉ số BMI chuẩn cho nam giới</h2>
                <p className='font-medium'>Phân loại chỉ số BMI ở nam giới</p>
                <ul className='list-disc'>
                  <li className='ml-6'>
                    {`BMI < 18.5: Cân nặng thấp, gầy. Lúc này cần phải chú ý bổ sung chất dinh dưỡng và kết hợp vận động thể lực một cách khoa học.`}
                  </li>
                  <li className='ml-6'>
                    {`18.5 < BMI < 24.9: Thể trạng bình thường, nhưng cũng cần phải chú ý tới chế độ ăn uống và vận động tránh để bị thiếu chất hay thừa cân.`}
                  </li>
                  <li className='ml-6'>
                    {`BMI >= 25: Thừa cân, nên có chế độ vận động phù hợp để kịp thời khắc phục tình trạng của bản thân. `}
                  </li>
                  <li className='ml-6'>{`25 < BMI < 29.9: Tiền béo phì`}</li>
                  <li className='ml-6'>{`30 < BMI < 34.9: Béo phì cấp độ I`}</li>
                  <li className='ml-6'>{`35 < BMI < 39.9: Béo phì cấp độ II `}</li>
                  <li className='ml-6'>{`BMI >= 40: Béo phì cấp độ III`}</li>
                </ul>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://medlatec.vn/ImagePath/images/20200705/20200705_chi-so-bmi-3.jpg'
                    alt=''
                  />
                </div>
                <h2 className='font-bold text-lg my-3 dark:text-gray-300'>2.2. Chỉ số BMI chuẩn cho nữ giới</h2>
                <p className='font-medium'>Phân loại chỉ số BMI ở nữ giới</p>
                <ul className='list-disc'>
                  <li className='ml-6'>
                    {`BMI < 18.5: Cân nặng thấp, gầy. Cơ thể phụ nữ đang thiếu dinh dưỡng, thiếu cân cần phải bổ sung dinh dưỡng và tập luyện phù hợp. `}
                  </li>
                  <li className='ml-6'>
                    {`18.5 < BMI < 22.9: Thể trạng bình thường, nên duy trì lối sống lành mạnh và bảo trì cân nặng.`}
                  </li>
                  <li className='ml-6'>{`BMI >= 23: Thừa cân, nên vận động để giảm cân. `}</li>
                  <li className='ml-6'>{`23 < BMI < 24.9: Tiền béo phì`}</li>
                  <li className='ml-6'>{`25 < BMI < 29.9: Béo phì cấp độ I`}</li>
                  <li className='ml-6'>{`30 < BMI < 39.9: Béo phì cấp độ II`}</li>
                  <li className='ml-6'>{`BMI >= 40: Béo phì cấp độ III `}</li>
                </ul>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>3. Làm gì để có chỉ số BMI lý tưởng?</h2>
                <p>
                  Dựa trên cách tính đã đưa ra ở trên, bạn hãy tính chỉ số BMI của cơ thể mình ở mức bao nhiêu, sau đó
                  so với số liệu chỉ số BMI của người Châu Á. Nếu kết quả không nằm trong vùng an toàn - người bình
                  thường thì cần thay đổi lối sống, lối sinh hoạt và dinh dưỡng.
                </p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://khoinguonsangtao.vn/wp-content/uploads/2022/11/cach-lam-gio-trai-cay-chon-hoa-qua.jpg'
                    alt=''
                  />
                </div>
                <p>
                  Đặc biệt với người nằm trong nhóm tiền béo phì đến béo phì cấp độ 3 có thể áp dụng một số cách sau để
                  điều chỉnh:
                </p>
                <h2 className='font-bold text-lg my-3 dark:text-gray-300'>3.1. Chế độ ăn uống</h2>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://www.linhchikhangnam.com/wp-content/uploads/2020/10/woman-eating-salad.jpg'
                    alt=''
                  />
                </div>
                <p>
                  Cắt giảm lượng calo tiêu thụ hằng ngày, đặc biệt là những đồ uống, đồ ăn có nhiều đường như trà ngọt,
                  nước ngọt, bánh kẹo,… Đường trong các loại thực phẩm này thường khiến cơ thể dư thừa đường và năng
                  lượng, gây tích tụ mỡ thừa cơ thể.
                </p>
                <h2 className='font-bold text-lg my-3 dark:text-gray-300'>3.2. Tập thể dục</h2>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://images2.thanhnien.vn/zoom/622_389/Uploaded/congthang/2021_08_10/hittho_jnzz_utvx_RHVA.jpg'
                    alt=''
                  />
                </div>
                <p>
                  Thống kê cho thấy, những người giảm cân hiệu quả và những người duy trì chỉ số BMI lý tưởng đều thường
                  dành từ 30 - 90 phút mỗi ngày, tất cả các ngày trong tuần để tăng cường sức khỏe chung của cơ thể,
                  tăng sự linh hoạt và sức mạnh cơ bắp. Ngoài ra, tập thể dục cũng giúp đốt cháy mỡ thừa, giảm triệu
                  chứng trầm cảm, stress và các bệnh lý nguy cơ như: bệnh tim mạch, ung thư ruột, tiểu đường,…
                </p>
                <h2 className='font-bold text-lg my-3 dark:text-gray-300'>3.3. Uống thuốc giảm cân</h2>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cac_loai_thuoc_giam_can_an_toan_hieu_qua_duoc_bac_si_khuyen_dung_4_8ffe586ebe.jpg'
                    alt=''
                  />
                </div>
                <p>
                  Ở một số người béo phì cấp độ nặng cần can thiệp sớm hoặc chế độ dinh dưỡng và luyện tập không giúp
                  giảm cân hiệu quả thì thuốc giảm cân cũng được nhiều người lựa chọn. Thuốc giảm cân giúp giảm cân nặng
                  nhanh hơn, ngừa nguy cơ mắc bệnh lý nguy hiểm.
                </p>
                <h2 className='font-bold text-lg my-3 dark:text-gray-300'>3.4. Phẫu thuật</h2>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://www.vinmec.com/s3-images/20191003_161115_301829_phau-thuat-giam-can.max-800x800.jpg'
                    alt=''
                  />
                </div>
                <p>
                  Đây là biện pháp mạnh mẽ cuối cùng để giảm mỡ thừa và cân nặng đáng kể khi các phương pháp kia không
                  hiệu quả hoặc biến chứng nguy hiểm đã xảy ra. Tuy nhiên cần cân nhắc thực hiện và chọn địa chỉ uy tín.
                  Như vậy, chỉ số BMI cơ thể giúp bạn có thể đối chiếu, so sánh và đánh giá tình trạng cân nặng của bản
                  thân ở mức bình thường, gầy hay béo phì. Để đảm bảo cơ thể khỏe mạnh, hãy duy trì chế độ ăn uống và
                  tập luyện khoa học.
                </p>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 order-first xl:order-last my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán BMI <p className='text-base text-black dark:text-gray-300'>(Theo hệ kilogram và mét)</p>
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <form onSubmit={onSubmit} noValidate className='p-3'>
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
                errors={errors.height}
                register={register}
                id='height'
                placeholder='Nhập chiều cao của bạn'
              />
              <div className='flex justify-center'>
                {calculateBMIMutation.isPending ? (
                  <button disabled className='block btn btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tính toán</button>
                )}
              </div>
            </form>
            <div>
              {(profile?.BMI || dataBMI.BMI) && (
                <div className='flex justify-center'>
                  <div className='mt-5 pb-10'>
                    <div className=' text-gray-700 flex justify-center dark:text-gray-300 font-semibold '>
                      Chỉ số BMI của bạn là: {profile?.BMI || dataBMI.BMI} kg/m2
                    </div>
                    <div className='text-red-700 dark:text-red-300 flex justify-center font-medium text-xs'>
                      Lưu ý: {checkNoteBMI()}
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
            saveData={handleSaveBMIData}
            title='Chỉ số BMI của bạn'
            helptext='Lưu ý: khi bạn lưu kết quả, các chỉ số liên quan sẽ được cập nhật và lưu lại trong hồ sơ cá nhân của bạn.'
            isPending={saveBMIMutation.isPending}
            data={calculateBMIMutation.data}
            unit='kg/m2'
          />
        )}
      </div>
    </>
  )
}
