import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'

export default function IBW() {
  return (
    <>
      <div className='grid xl:mx-4  pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-4'>
          <main className='pt-8 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
              <article className='mx-auto w-full '>
                <header className='mb-3 not-format'>
                  <h1 className='mb-1 text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                    Tính cân nặng lý tưởng của cơ thể
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
                    <Link className=' hover:underline'> Tính toán lượng nước uống hàng ngày </Link>
                  </li>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link className=' hover:underline'> Tính toán chỉ số LBM</Link>
                  </li>
                  <li className='flex text-blue-600 dark:text-sky-200 gap-3 m-2 items-center'>
                    <FaArrowCircleRight className='text-xl' />
                    <Link className=' hover:underline'> Tính toán lượng chất béo trong cơ thể</Link>
                  </li>
                </ul>

                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://i.ytimg.com/vi/9MZqe-QL9OU/maxresdefault.jpg'
                    alt=''
                  />
                </div>

                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>
                  1. Chỉ số cân nặng lý tưởng là gì? Tôi cần cân nặng bao nhiêu là tốt?
                </h2>
                <p className='mb-1'>
                  - Hầu hết mọi người tại đã cố gắng giảm cân hoặc biết giảm cân 1 lần trong đời. Điều này phần lớn là
                  do nhận thức về trọng lượng cơ thể &quot;lý tưởng&quot;, thường điều này dựa trên những gì chúng ta
                  thấy thông qua các phương tiện truyền thông xã hội,TV, phim ảnh, tạp chí, v.v. Mặc dù chỉ số cân nặng
                  lý tưởng (IBW - Idea Body Weight) ngày nay đôi khi dựa trên sự hấp dẫn thị giác, IBW thật sự được sử
                  dụng để trong y tế, đặc biệt là những bệnh nhân béo phì để từ đó xác định liều lượng thuốc cần dùng.
                  Ngày nay, IBW cũng được sử dụng rộng rãi để xác định cân nặng lý tưởng của một người như anh A có
                  chiều cao là x thì số cân nặng lý tưởng y. Ngoài ra, IBW được ứng dụng trong các môn thể thao, vì
                  nhiều môn thể thao phân loại người dựa trên trọng lượng cơ thể của họ. .
                </p>
                <p className='mb-1'>
                  - Lưu ý rằng IBW (chỉ số cân nặng lý tưởng) không phải là một phép đo hoàn hảo. Vì nó không xem xét tỷ
                  lệ phần trăm mỡ cơ thể trong cơ thể của một người. Điều này có nghĩa là các vận động viên khỏe mạnh có
                  thể được coi là thừa cân nếu chỉ dựa trên IBW của họ (đặc biệt là dân thể hình) đó là lý do vì sao IBW
                  không được xem là thước đo không toàn diện để đánh giá sức khỏe và cân nặng của mỗi người. Nếu bạn
                  dưới hoặc vượt qua IBW nhưng bạn vẫn khỏe mạnh.
                </p>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://c.ndtvimg.com/2021-03/m9kqc43g_weight_625x300_04_March_21.jpg'
                    alt=''
                  />
                </div>
                <p className='mb-1'>
                  - Một người nên cân nặng bao nhiêu không thể xác định chính xác bằng 1 công thức. Nó phụ thuộc rất
                  nhiều vào mỗi cá nhân. Cho đến nay, không có biện pháp nào từ IBW (chỉ số cân nặng lý tưởng) đến chỉ
                  số khối cơ thể (BMI), hoặc bất kỳ ai khác có thể xác định rõ ràng trọng lượng lý tưởng một người.
                  Chúng chỉ là những tài liệu tham khảo và điều quan trọng hơn là phải tuân thủ các lựa chọn cuộc sống
                  lành mạnh như tập thể dục thường xuyên, ăn nhiều loại thực phẩm chưa qua chế biến, ngủ đủ giấc, v.v.
                  hơn là theo đuổi một trọng lượng cụ thể dựa trên một công thức.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>
                  2. Công thức để tìm chỉ số cân nặng lý tưởng
                </h2>
                <p className='mb-1'>
                  Tất cả các công thức, có công thức IBW được phát triển chủ yếu để tạo thuận lợi cho việc tính toán
                  liều lượng thuốc. Nếu bạn là một nam 177cm ước tính cân nặng lý tưởng của bạn với công thức Devine,
                  được xác như sau = (2,3 × 10) kg + 50 kg để có kết quả là 73 kg (chỉ số cân nặng lý tưởng của bạn)
                </p>
                <p className='mb-1'>
                  Các công thức khác nhau về các giá trị được sử dụng dựa trên nghiên cứu của các nhà khoa học liên quan
                  đến sự phát triển của họ và công thức của họ. Công thức Devine là công thức được sử dụng rộng rãi nhất
                  để đo lường IBW.
                </p>

                <p className='mt-2'>B. J. Devine Công thức (1974):</p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nam giới: 50,0 kg + 2,3 kg mỗi inch trên 5 feet
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nữ giới: 45,5 kg + 2,3 kg mỗi inch trên 5 feet
                  </li>
                </ul>
                <div className='flex overflow-hidden gap-3 w-full items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://www.thetechedvocate.org/wp-content/uploads/2023/09/2-Table1-1.png'
                    alt=''
                  />
                </div>
                <p className='mt-3'>
                  Có những hạn chế đối với tất cả các công thức và phương pháp. Bởi vì các công thức được thiết kế để có
                  thể áp dụng cho càng nhiều người càng tốt, nó không thể chính xác cao cho mọi cá nhân. Các công thức
                  chỉ có chiều cao và giới tính, và có không cân nhắc về khuyết tật thể chất, mức độ hoạt động hoặc khối
                  lượng cơ bắp đến tỷ lệ mỡ cơ thể, còn được gọi là thành phần cơ thể. Chỉ số cân nặng lý tưởng của
                  chúng tôi là giá trị tham khảo và được sử dụng như một hướng dẫn chung dựa trên các công thức phổ
                  biến, và kết quả của nó không nhằm mục đích là những giá trị bắt buộc mà một người phải đạt được để có
                  được “cân nặng lý tưởng”.
                </p>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 order-first xl:order-last my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán IBW{' '}
              <p className='text-base text-black dark:text-gray-300'>(Theo B. J. Devine Công thức (1974))</p>
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <form className='p-3'>
              <Input
                title='Nhập chiều cao (cm)'
                type='number'
                name='height'
                id='height'
                placeholder='Nhập chiều cao của bạn'
              />
              <div className='mb-3'>
                <div className='text-gray-400 lg:text-red-900 mb-1 dark:text-pink-300 text-left italic'>
                  Giới tính của bạn là:
                </div>
                <div className='flex items-center pb-2'>
                  <div className='flex items-center'>
                    <input type='radio' defaultValue name='default-radio' id='men' className='radio radio-success' />
                    <label htmlFor='men' className='ms-2 text-sm w-20 font-medium text-gray-900 dark:text-gray-300'>
                      Nam
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input type='radio' name='default-radio' id='womam' className='radio radio-success' />
                    <label htmlFor='woman' className='ms-2 text-sm w-20 font-medium text-gray-900 dark:text-gray-300'>
                      Nữ
                    </label>
                  </div>
                </div>
              </div>

              <div className='flex justify-center'>
                <button className='btn btn-sm text-white hover:bg-red-900 bg-red-800'> Tính toán</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
