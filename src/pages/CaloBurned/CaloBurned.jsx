import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'
import { AiOutlineSearch } from 'react-icons/ai'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { getActivities } from '../../apis/activityApi'
import Loading from '../../components/GlobalComponents/Loading'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { calculateCaloriesBurned } from '../../apis/calculatorApi'
import toast from 'react-hot-toast'
import { schemaCaloriesBurned } from '../../utils/rules'
import CalculatorModal from '../../components/GlobalComponents/CalculatorModal'
import PaginationNotUrl from '../../components/GlobalComponents/PaginationNotUrl'
import { AppContext } from '../../contexts/app.context'

export default function CaloBurned() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { profile } = useContext(AppContext)
  const [query, setQuery] = useState({
    page: '1'
  })

  const { data, isLoading } = useQuery({
    queryKey: ['list-activity', query],
    queryFn: () => {
      return getActivities(query)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })
  const { register: registerActivity, handleSubmit: handleSubmitActivity } = useForm({
    defaultValues: {
      searchActivity: query.search || ''
    }
  })

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all-category') {
      setQuery((prev) => {
        return omit(prev, ['activity_category'])
      })
    } else {
      setQuery((prev) => {
        return { ...prev, activity_category: e.target.value }
      })
    }
  }

  const onSubmitSearch = handleSubmitActivity((data) => {
    console.log(data)
    if (data.searchActivity === '') {
      return setQuery((prev) => omit(prev, ['activity_category', 'page', 'search']))
    }
    setQuery((prev) => {
      return omit({ ...prev, search: data.searchActivity }, ['activity_category', 'page'])
    })
  })

  console.log(query)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCaloriesBurned),
    defaultValues: {
      weight: profile?.weight || '',
      time: '',
      met: ''
    }
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const calculateCaloriesBurnedMutation = useMutation({
    mutationFn: (body) => calculateCaloriesBurned(body)
  })

  const [dataCaloBurned, setDataCaloBurned] = useState({})
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setDataCaloBurned(data)
    calculateCaloriesBurnedMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        handleOpenModal()
        setDataCaloBurned((prev) => ({ ...prev, calo_burned: data.data.result }))
        toast.success('Tính toán chỉ số calo đốt cháy thành công')
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
                    Công thức tính lượng calo đốt cháy trong 1 hoạt động nào đó
                  </h1>
                  <div className='flex items-center'>
                    Thu thập bởi: <span className='font-semibold text-red-600 dark:text-pink-400 ml-1'>Cook</span>
                    <span className='font-semibold'>Healthy</span>
                    <IoTimeOutline className='mr-1 ml-2' /> 02/04/2024
                  </div>
                </header>
                <div>
                  <div className='font-medium mb-2'>Bảng tham khảo giá trị met:</div>
                  <div className='mb-2'>
                    <div className='flex flex-wrap gap-3  items-center'>
                      <form
                        id='form-activity'
                        onSubmit={onSubmitSearch}
                        noValidate
                        className=' w-[100%] max-w-[20rem] min-w-[18rem] relative'
                      >
                        <div className='relative'>
                          <input
                            autoComplete='off'
                            type='search'
                            id='search_input'
                            {...registerActivity('searchActivity')}
                            placeholder='Tìm kiếm bài viết'
                            className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                          />
                          <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                            <AiOutlineSearch />
                          </button>
                        </div>
                      </form>
                      <select
                        defaultValue={query.activity_category || 'all-category'}
                        onChange={handleChangeCategory}
                        id='category'
                        className='select select-sm my-2  bg-white dark:bg-slate-800 dark:border-none'
                      >
                        <option value='all-category'>Tất cả thể loại</option>
                        <option value='Đi xe đạp'>Đi xe đạp</option>
                        <option value='Bài tập thể dục'>Bài tập thể dục</option>
                        <option value='Múa'>Múa</option>
                        <option value='Chạy'>Chạy</option>
                        <option value='Thể thao'>Thể thao</option>
                        <option value='Đi bộ'>Đi bộ</option>
                        <option value='Hoạt động dưới nước'>Dưới nước</option>
                      </select>
                    </div>
                  </div>
                  <div className='border-[2px] my-3 scrollbar-thin scrollbar-track-white dark:scrollbar-track-[#010410] dark:scrollbar-thumb-[#171c3d] scrollbar-thumb-slate-100 dark:border-gray-500 shadow-sm max-h-[40 rem] xl:h-full overflow-y-auto overflow-x-auto'>
                    {isLoading ? (
                      <Loading className='w-full my-3 flex justify-center' />
                    ) : (
                      <table className=' w-full shadow-md  divide-y divide-gray-200'>
                        <thead className='bg-gray-50 dark:bg-slate-800 '>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                            >
                              Tên hoạt động
                            </th>

                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                            >
                              Giá trị met
                            </th>
                          </tr>
                        </thead>

                        <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                          {data?.data?.result.activities.map((activity) => {
                            return <AcitivityItem key={activity._id} activity={activity} />
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {data?.data.result.activities.length === 0 && (
                    <div className='flex justify-center items-center py-4'>
                      <div className='text-gray-500 dark:text-gray-300'>Không có hoạt động nào</div>
                    </div>
                  )}
                  {data?.data.result.totalPage > 1 && (
                    <div className='flex justify-center mb-5 items-center'>
                      <PaginationNotUrl pageSize={data?.data.result.totalPage} query={query} setQuery={setQuery} />
                    </div>
                  )}
                </div>

                <p className='lead mb-4 font-medium'>
                  Số lượng calo mà cơ thể đốt cháy trong các hoạt động thường ngày hoặc tập thể dục phụ thuộc vào nhiều
                  yếu tố khác nhau nên đây không phải là một phép tính chính xác. Kết quả của máy tính này (và bất kỳ
                  máy tính nào khác) đều dựa trên dữ liệu được tiêu chuẩn hóa tham chiếu đến một người &quot;trung
                  bình&quot;, vì vậy đây chỉ là ước tính. Công thức và phương pháp mà máy tính này sử dụng được mô tả
                  bên dưới trong phần &quot;Tính lượng calo đốt cháy&quot;.
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

                <div className='flex flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://healthyeater.com/wp-content/uploads/2018/04/calorie-burned-calculator-wide.jpg'
                    alt=''
                  />
                </div>

                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>
                  1. Các yếu tố ảnh hưởng đến lượng calo đốt cháy
                </h2>
                <p className='mb-1'>
                  Số lượng calo mà một người đốt cháy khi thực hiện một hoạt động nhất định phụ thuộc vào nhiều yếu tố
                  khác nhau. Hầu hết các ước tính (bao gồm cả những ước tính do máy tính của chúng tôi cung cấp) đều
                  liên quan đến việc sử dụng ba yếu tố chính: khối lượng cơ thể, thời gian hoạt động và mức trao đổi
                  chất tương đương của một nhiệm vụ (MET). MET của các nhiệm vụ khác nhau đã được nghiên cứu rộng rãi và
                  máy tính của chúng tôi ước tính lượng calo được đốt cháy dựa trên dữ liệu có sẵn thông qua các nghiên
                  cứu này.
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'>Khối lượng cơ thể và thời gian</p>
                <p className='mb-1'>
                  - Khối lượng cơ thể của một người ảnh hưởng đến lượng calo họ đốt cháy, ngay cả khi nghỉ ngơi. Một
                  người cao lớn hơn do có nhiều cơ, mỡ hoặc chiều cao sẽ đốt cháy nhiều calo hơn. Điều này cũng đúng khi
                  tập thể dục vì cơ thể phải hoạt động nhiều hơn để cung cấp năng lượng cho người lớn hơn so với người
                  nhỏ hơn. Do đó, một người nặng 200 pound sẽ đốt cháy nhiều calo hơn đáng kể khi chạy 1 dặm so với
                  người nặng 100 pound, với điều kiện các điều kiện khác vẫn giữ nguyên.
                </p>
                <p className='mb-1'>
                  - Thời gian tập thể dục là một yếu tố khác ảnh hưởng đến lượng calo được đốt cháy. Một người thực hiện
                  bài tập càng lâu thì họ sẽ đốt cháy càng nhiều calo. Tuy nhiên, mối quan hệ không đơn giản như với
                  khối lượng cơ thể vì cường độ tập luyện rất quan trọng. Ví dụ, một người đi bộ 1 dặm trong 1 giờ sẽ
                  đốt cháy ít calo hơn đáng kể so với người đi bộ 5 dặm trong giờ đó.
                </p>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://gymaster.vn/wp-content/uploads/2022/11/chay-bo-dot-bao-nhieu-calo-1-gymaster.vn_.jpeg'
                    alt=''
                  />
                </div>
                <p className='mt-2 font-medium dark:text-gray-300'>Cường độ tập luyện</p>
                <p className='mb-1'>
                  - Cường độ tập luyện là một yếu tố quan trọng khác ảnh hưởng đến số lượng calo được đốt cháy. Bài tập
                  càng cường độ cao thì số lượng calo đốt cháy càng nhiều. Cường độ tập luyện được đo bằng nhiều cách
                  khác nhau, một số cách chính xác hơn những cách khác.
                </p>
                <p className='mb-1'>
                  - Cường độ tập luyện có thể được đo bằng nhịp tim. Nhịp tim cho biết mức độ khó khăn của một người để
                  hoàn thành một bài tập. Nói chung, nhịp tim của một người khi thực hiện bài tập càng cao thì bài tập
                  càng cường độ cao. Tuy nhiên, con người có nhịp tim khi nghỉ ngơi cũng như nhịp tim tối đa khác nhau,
                  vì vậy nhịp tim không phải là thước đo chính xác về cường độ. Điều này là do một người khỏe mạnh hơn
                  sẽ có nhịp tim thấp hơn người kém sức khỏe hơn khi thực hiện cùng một bài tập, giả sử rằng cả hai đều
                  không có bất kỳ bệnh lý tiềm ẩn nào ảnh hưởng đến nhịp tim của họ.
                </p>
                <p className='mb-1'>
                  - Một phép đo cường độ chính xác hơn liên quan đến việc đo mức tiêu thụ oxy của một người trong khi
                  tập luyện. Tiêu thụ oxy và cường độ tập thể dục có mối quan hệ tuyến tính; khi cường độ tập luyện tăng
                  lên, mức tiêu thụ oxy tăng lên. Do đó, mức tiêu thụ oxy trong khi tập luyện, so với mức tiêu thụ oxy
                  khi nghỉ ngơi, cung cấp cho chúng ta một sự thể hiện chính xác về nhu cầu trao đổi chất của một bài
                  tập nhất định. Hơn nữa, không giống như nhịp tim thay đổi đáng kể tùy thuộc vào nhiều yếu tố, lượng
                  oxy mà một người cần tiêu thụ có liên quan chặt chẽ đến khối lượng cơ thể của họ, điều này giúp có thể
                  tạo ra tiêu chuẩn về mức tiêu thụ oxy cho các bài tập cụ thể dựa trên cơ thể khối.
                </p>
                <p className='mb-1'>
                  - Mức tiêu thụ oxy được đo bằng MET (chuyển hóa tương đương với một nhiệm vụ). Có một số định nghĩa
                  khác nhau về MET. Định nghĩa ban đầu và định nghĩa được máy tính này sử dụng dựa trên việc sử dụng oxy
                  và khối lượng cơ thể.
                </p>
                <p className='mb-1'>
                  - MET là tỷ lệ tốc độ tiêu hao năng lượng của một người (so với khối lượng cơ thể của họ) trong khi
                  thực hiện một nhiệm vụ thể chất nhất định so với mức tham chiếu. Theo quy ước, tham chiếu này dựa trên
                  năng lượng tiêu hao của một người &quot;trung bình&quot; khi họ ngồi yên lặng, tương đương với 3,5 mL
                  oxy/kg/phút. Giá trị này được rút ra bằng thực nghiệm bằng cách đo MET của một người đàn ông 40 tuổi
                  khỏe mạnh nặng 70 kg. Đây là đường cơ sở, nghĩa là giá trị MET bằng 1 thể hiện năng lượng tiêu hao của
                  một người bình thường khi nghỉ ngơi. Do đó, một hoạt động có giá trị MET là 2 đòi hỏi năng lượng gấp
                  đôi năng lượng mà một người bình thường tiêu hao khi nghỉ ngơi; giá trị MET là 8 đòi hỏi năng lượng
                  gấp tám lần, v.v.
                </p>
                <p className='mt-2 font-medium dark:text-gray-300'>Các yếu tố khác</p>
                <p className='mb-1'>
                  Mặc dù các yếu tố trên là yếu tố chính được sử dụng để ước tính lượng calo đốt cháy, nhưng cũng có
                  những yếu tố khác.
                </p>
                <p className='mb-1'>
                  Tuổi tác — điều này ảnh hưởng đến việc tiêu hao năng lượng khi nghỉ ngơi của một người. Khi một người
                  già đi, họ có xu hướng giảm khối lượng cơ nạc, điều này có xu hướng làm giảm hoạt động trao đổi chất.
                  Vì vậy, một người càng lớn tuổi thì tổng lượng calo họ đốt cháy càng ít. Do đó, điểm khác biệt duy
                  nhất giữa hai người là một người già hơn người kia nhiều, nên người lớn tuổi sẽ đốt cháy ít calo hơn.
                </p>
                <p className='mb-1'>
                  Thành phần cơ thể - cơ bắp đòi hỏi nhiều năng lượng hơn mỡ. Như vậy, một người có cùng chiều cao và
                  cân nặng với người khác sẽ đốt cháy nhiều calo hơn nếu họ có nhiều cơ bắp hơn.
                </p>
                <p className='mb-1'>
                  Nhiệt độ — con người đốt cháy nhiều calo hơn trong môi trường ấm hơn. Điều này là do nhiệt độ cao hơn
                  làm tăng nhiệt độ cơ thể, cho phép cơ thể hướng năng lượng vào việc đốt cháy calo hơn là làm ấm cơ
                  thể.
                </p>
                <p className='mb-1'>
                  Chế độ ăn uống — chế độ ăn uống của một người ảnh hưởng đến quá trình trao đổi chất của họ; Sự trao
                  đổi chất của một người càng thấp thì họ càng đốt cháy ít calo hơn, vì vậy một người muốn đốt cháy
                  nhiều calo hơn nên áp dụng một chế độ ăn kiêng làm tăng sự trao đổi chất của họ.
                </p>
                <p className='mb-1'>
                  Nhiệt độ — con người đốt cháy nhiều calo hơn trong môi trường ấm hơn. Điều này là do nhiệt độ cao hơn
                  làm tăng nhiệt độ cơ thể, cho phép cơ thể hướng năng lượng vào việc đốt cháy calo hơn là làm ấm cơ
                  thể.
                </p>
                <p className='mb-1'>
                  Ngủ - điều này có thể ảnh hưởng đến số lượng calo được đốt cháy theo một số cách. Một người không ngủ
                  đủ giấc sẽ mệt mỏi hơn và do đó có thể tập thể dục ít hơn bình thường. Ngoài ra, nếu một người không
                  ngủ đủ giấc, quá trình trao đổi chất của họ có thể giảm, làm giảm tổng lượng calo đốt cháy.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>2. Công thức Lượng calo đốt cháy</h2>

                <p className='mt-2'>Máy tính này ước tính lượng calo được đốt cháy bằng phương trình sau.</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Calories = MET × Body Weight x 3.5 / 200
                  </li>
                </ul>
                <p>Trong đó thời gian tính bằng giờ và trọng lượng cơ thể tính bằng kilôgam.</p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://gymaster.vn/wp-content/uploads/2022/11/cach-tinh-calo-dot-chay-khi-chay-bo-gymaster.vn_.jpeg'
                    alt=''
                  />
                </div>
                <p className='mt-3'>
                  Nhiều nghiên cứu đã được tiến hành để xác định số lượng calo tiêu tốn khi thực hiện một số hoạt động
                  nhất định. Máy tính của chúng tôi sử dụng dữ liệu từ những nghiên cứu này để xác định MET cho một số
                  hoạt động nhất định, cùng với phương trình ở trên, để ước tính lượng calo đốt cháy trong khoảng thời
                  gian thực hiện một hoạt động và khối lượng cơ thể.
                </p>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 order-first xl:order-last my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán lượng calo đốt cháy <p className='text-base text-black dark:text-gray-300'></p>
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
                title='Nhập thời gian (phút)'
                type='number'
                name='time'
                register={register}
                errors={errors.time}
                id='time'
                placeholder='Nhập thời gian hoạt động của bạn'
              />
              <Input
                title='Nhập chỉ số MET'
                type='number'
                name='met'
                register={register}
                errors={errors.met}
                id='met'
                placeholder='Nhập chỉ số MET của hoạt động của bạn'
              />

              <div className='flex justify-center'>
                {calculateCaloriesBurnedMutation.isPending ? (
                  <button disabled className='block btn  btn-sm  md:w-auto  bg-red-800 hover:bg-red-700 '>
                    <Loading classNameSpin='inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600' />
                  </button>
                ) : (
                  <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tính toán</button>
                )}
              </div>
            </form>
            <div>
              {dataCaloBurned.calo_burned && (
                <div className='flex mx-4 justify-center '>
                  <div className='mt-5 w-full pb-10'>
                    <div className=' text-gray-700 flex justify-center dark:text-gray-300 font-semibold '>
                      Bạn đã tiêu thụ: {dataCaloBurned.calo_burned} calories
                    </div>
                    <div className='text-red-700 flex justify-center dark:text-red-300 font-medium text-xs'>
                      Lưu ý: Đây chỉ là ước lượng, không phải là con số chính xác
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CalculatorModal
          closeModal={handleCloseModal}
          title='Lượng calo đốt cháy'
          helptext='Lượng calo mà cơ thể đốt cháy trong các hoạt động thường ngày hoặc tập thể dục phụ thuộc vào nhiều yếu tố khác nhau nên đây là 1 phép tính để tham khảo thôi bạn nhé!'
          isPending={calculateCaloriesBurnedMutation.isLoading}
          data={calculateCaloriesBurnedMutation.data}
          unit='calo'
        />
      )}
    </>
  )
}

const AcitivityItem = ({ activity }) => {
  return (
    <tr>
      <td className='px-6 py-4 '>
        <span className='text-sm  font-medium text-gray-900 dark:text-gray-300'>{activity.activity}</span>
      </td>
      <td className='px-6 py-4 '>
        <div className='text-sm text-gray-900 dark:text-gray-300'>{activity.met}</div>
      </td>
    </tr>
  )
}
