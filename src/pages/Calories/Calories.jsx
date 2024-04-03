import React from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import { FaArrowCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Input from '../../components/InputComponents/Input'
import TDEETable from '../../assets/images/TDEETable.png'
export default function Calories() {
  return (
    <>
      <div className='grid xl:mx-4  pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-4'>
          <main className='pt-8 pb-16 rounded-lg dark:text-gray-400 shadow-md font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
            <div className='flex justify-between items-center px-3 xl:px-5 max-w-screen-xl '>
              <article className='mx-auto w-full '>
                <header className='mb-3 not-format'>
                  <h1 className='mb-1 text-3xl font-extrabold dark:text-gray-300 leading-tight text-red-700 '>
                    Tính Calo tiêu thụ trong một ngày
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
                    <Link className=' hover:underline'> Tính toán chỉ số BMR </Link>
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
                <p className='lead font-medium'>
                  - Calorie (hay còn gọi là calo) là một đơn vị đo năng lượng trong các chất dinh dưỡng. Một calo tương
                  ứng với một lượng nhiệt cần thiết để tăng nhiệt độ trong một gram nước lên 1°C. Calo trong thức ăn là
                  nguồn năng lượng dạng nhiệt giúp cơ thể hoạt động. Hay nói cách khác, calo là nhiên liệu để duy trì sự
                  vận hành của bộ máy sinh học - con người.
                </p>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://cdn.tgdd.vn//News/0//calo-la-gi-cach-tinh-calo-de-giam-can-va-tang-can-1-800x450.jpg'
                    alt=''
                  />
                </div>
                <p className='lead mb-3 font-medium'>
                  - Bằng cách tính lượng calo tiêu thụ, nhiều chuyên gia dinh dưỡng dựa vào đó để xác định chế độ ăn
                  uống phù hợp và cải thiện cân nặng của các vận động viên.
                </p>
                <h2 className='font-bold text-xl my-3 dark:text-gray-300'>1. Một ngày cần bao nhiêu calo là đủ?</h2>
                <p>
                  Lượng calo nạp vào cơ thể mỗi ngày sẽ quyết định cân nặng và sức khỏe của bạn. Quá nhiều calo sẽ dẫn
                  đến thừa cân và ngược lại. Tuy nhiên, không có quy định chung cho mức calo của mọi người vì mỗi cá
                  nhân sẽ có lượng calo tiêu thụ khác nhau.
                </p>
                <p>
                  Vì thế, để biết được một ngày cần bao nhiêu calo, ta sẽ dùng công thức{' '}
                  <span className='font-medium'>BMR và TDEE - Tổng năng lượng tiêu thụ mỗi ngày</span>:
                </p>
                <ul className='list-disc'>
                  <li className='ml-6 font-medium'>BMR là công thức để tính tỷ lệ trao đổi chất cơ bản.</li>
                  <li className='ml-6 font-medium'>
                    TDEE là tổng năng lượng tiêu thụ mỗi ngày được tính dựa trên chỉ số BMR.
                  </li>
                </ul>
                <div className='flex overflow-hidden gap-3 w-full max-h-[20rem] items-center my-2 justify-center'>
                  <img
                    className='object-cover rounded-md '
                    src='https://passporttravelspa.com/wp-content/uploads/2021/01/TDEE.jpg'
                    alt=''
                  />
                </div>
                <p className='mt-2'>
                  BMR tượng trưng cho mức tiêu thụ năng lượng ở điều kiện không hoạt động. Công thức được tính dựa trên
                  chỉ số chiều cao, cân nặng và độ tuổi của một người. Theo phương trình Mifflin-St Jeor ta có:
                </p>
                <ul className='list-disc mt-3 mb-4'>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nam giới: (9.99 x Weight [kg]) + (6.25 x Height [cm]) - (4.92 x Age) + 5
                  </li>
                  <li className='ml-6 font-medium text-red-700 dark:text-sky-300'>
                    Nữ giới: (9.99 x Weight [kg]) + (6.25 x Height [cm]) - (4.92 x Age) - 161
                  </li>
                </ul>
                <div className='flex  flex-col items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://bizweb.dktcdn.net/100/421/557/files/cach-tinh-bmr-5.jpg?v=1672721413477'
                    alt=''
                  />
                </div>
                <p className='mt-3'>
                  Sau khi đã có chỉ số BMR, ta có thể biết được con số định tính calo tiêu thụ trong một ngày. Bằng cách
                  nhân BMR với tỷ lệ tương ứng cường độ hoạt động của cơ thể trong một ngày, ta được TDEE:
                </p>
                {/* <div className='flex mt-5 justify-center items-center'>
                  <div className='-m-1.5 '>
                    <div className='p-1.5 min-w-full inline-block align-middle'>
                      <div className='overflow-hidden'>
                        <table className='overflow-x-auto min-w-[50%] divide-y divide-gray-200 dark:divide-gray-700'>
                          <thead>
                            <tr>
                              <th
                                scope='col'
                                className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase'
                              >
                                Mức độ vận động
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase'
                              >
                                Mô tả
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase'
                              >
                                Tổng tiêu thụ năng lượng mỗi ngày (TDEE)
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                            <tr>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                Không có hoặc ít
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                Không hoặc ít vận động
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                TDEE = 1.2 x BMR
                              </td>
                            </tr>
                            <tr>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                Nhẹ
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                1-3 ngày/tuần
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                TDEE = 1.375 x BMR
                              </td>
                            </tr>
                            <tr>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                Vừa phải
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                3-5 ngày/tuần
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                TDEE = 1.55 x BMR
                              </td>
                            </tr>
                            <tr>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                Năng động
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                6-7 ngày/tuần
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                TDEE = 1.725 x BMR
                              </td>
                            </tr>
                            <tr>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                Cực kỳ năng động
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                Hoạt động nặng, thể dục 2 lần/ngày
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                                TDEE = 1.9 x BMR
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className='flex overflow-hidden gap-3 w-full max-h-[20rem] items-center my-2 justify-center'>
                  <img className='object-fit rounded-md ' src={TDEETable} alt='' />
                </div>
                <div className='flex  flex-col items-center my-2 justify-center overflow-hidden'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://sieutinh.com/storage/app/media/T%C3%ADnh%20l%C6%B0%E1%BB%A3ng%20calo%20c%E1%BA%A7n%20n%E1%BA%A1p/luong-calo-can-nap-tuy-thuoc-cuong-do-hoat-dong-cua-co-the.jpeg'
                    alt=''
                  />
                </div>
                <h2 className='font-bold text-xl mt-5 mb-3 dark:text-gray-300'>
                  2. Cách tính calo tiêu thụ để giảm cân
                </h2>
                <p>
                  - Theo nghiên cứu, nếu bạn tiêu thụ khoảng 3,500 dư lượng calo, bạn sẽ tăng thêm 1 pound (~0.45 kg).
                  Theo lý thuyết, bạn sẽ phải tạo ra sự thiếu hụt calo để cơ thể giảm cân.
                  <span className='font-medium dark:text-gray-300'>
                    Bằng cách nạp vào ít hơn hoặc tiêu hao nhiều hơn 3,500 calo, cơ thể sẽ chuyển hóa mỡ dự trữ trong cơ
                    thể thành năng lượng để phục vụ cho sự vận hành, dẫn đến cơ thể sẽ được giảm cân.
                  </span>{' '}
                </p>
                <p>
                  - Bạn cần lưu ý, 3,500 calo là một con số rất lớn. Các chuyên gia khuyên rằng chúng ta không nên cắt
                  giảm calo quá nhiều trong một lần vì nó sẽ đem lại nguy hại cho sức khỏe.
                </p>
                <div className='flex max-h-[20rem] gap-2 overflow-hidden items-center my-2 justify-center w-[100%]'>
                  <img
                    className='object-cover max-h-[20rem] rounded-md'
                    src='https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/2/17/calo-giam-can-1708152002395583347577.jpg'
                    alt=''
                  />
                  <img
                    className='object-cover max-h-[20rem] rounded-md'
                    src='https://pos.nvncdn.com/be3294-43017/art/artCT/20230821_gMv5uMwa.jpg'
                    alt=''
                  />
                </div>
                <p>
                  - Điều quan trọng là bạn cần có một chế độ ăn uống và tập thể thao phù hợp để giảm cân an toàn. Việc
                  giảm lượng calo hơn 500 calo mỗi ngày là một thử thách, giảm hơn 2 pound mỗi tuần có thể không lành
                  mạnh vì nó có thể gây mất cơ bắp, mất nước. Điều này không có lợi cho sức khỏe, đặc biệt là khi tập
                  thể dục kết hợp với chế độ ăn kiêng, duy trì chế độ ăn uống tốt là rất quan trọng, vì cơ thể cần có
                  khả năng hỗ trợ các quá trình trao đổi chất và bổ sung chất dinh dưỡng. Chế độ ăn uống không lành mạnh
                  có thể có tác động bất lợi nghiêm trọng, và giảm cân theo cách này đã được chứng minh trong một số
                  nghiên cứu là không bền vững. Như vậy, ngoài việc theo dõi lượng calo, điều quan trọng là phải duy trì
                  mức độ hấp thụ chất xơ cũng như các nhu cầu dinh dưỡng khác để cân bằng nhu cầu của cơ thể.
                </p>
                <div className='flex  flex-col items-center my-2 justify-center overflow-hidden'>
                  <img
                    className='object-cover rounded-md w-[100%]'
                    src='https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/6/10/giam-can-nhanh2-16548318243811721495086.jpg'
                    alt=''
                  />
                </div>
                <p>
                  - Việc đếm calo với mục đích giảm cân, ở mức độ đơn giản nhất, có thể được chia thành một vài bước
                  chung: Xác định mục tiêu giảm cân của bạn. Hãy nhớ lại rằng 1 pound (~ 0,45 kg) tương đương với khoảng
                  3500 calo. Bạn chỉ nên giảm khoảng 500 calo mỗi ngày để giảm được 1 pound mỗi tuần. Không nên giảm hơn
                  2 pound mỗi tuần vì nó có thể có tác động tiêu cực đến sức khỏe. Bạn nên tham khảo ý kiến bác sĩ hoặc
                  chuyên gia dinh dưỡng nếu bạn muốn giảm cân nhiều hơn mức đấy. Vẻ đẹp là quan trọng, nhưng sức khỏe là
                  trên hết. Trước khi bạn đạt được mục tiêu của mình, hãy giữ cho cơ thể luôn khỏe mạnh để tận hưởng khi
                  thành quả đến.{' '}
                </p>
                <p>
                  - Chọn một phương pháp để theo dõi lượng calo của bạn và tiến tới mục tiêu của bạn. Kết hợp với chiếc
                  điện thoại thông minh với rất nhiều ứng dụng dễ sử dụng giúp theo dõi các chỉ số sức khỏe của bạn.
                  Luôn giữ cho mình động lực là chìa khóa để bạn đạt được thân hình mong muốn.
                </p>
              </article>
            </div>
          </main>
        </div>
        <div className='col-span-6 my-3 xl:my-0 xl:col-span-2'>
          <div className='shadow mb-6 bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex flex-col dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tính toán TDEE <p className='text-base text-black dark:text-gray-300'>(Theo hệ kilogram và mét)</p>
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <form className='p-3'>
              <Input
                title='Nhập cân nặng (kg)'
                type='number'
                name='weight'
                id='weight'
                placeholder='Nhập cân nặng của bạn'
              />
              <Input
                title='Nhập chiều cao (m)'
                type='number'
                name='height'
                id='height'
                placeholder='Nhập chiều cao của bạn'
              />
              <Input title='Nhập độ tuổi' type='number' name='age' id='age' placeholder='Nhập độ tuổi của bạn' />
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
              <div className='mb-3'>
                <div className='text-gray-400 lg:text-red-900 mb-1 dark:text-pink-300 text-left italic'>
                  Mức độ hoạt động
                </div>
                <select className='select w-full mb-2 border border-gray-300 bg-white dark:bg-slate-800 dark:border-none'>
                  <option disabled selected>
                    Nhập mức độ hoạt động thường ngày
                  </option>
                  <option>Không có hoặc ít vận động</option>
                  <option>Nhẹ: 1-3 ngày/tuần</option>
                  <option>Vừa phải: 3-5 ngày/tuần</option>
                  <option>Năng động: 6-7 ngày/tuần</option>
                  <option>Cực kỳ năng động, thể dục 2 lần/ngày</option>
                </select>
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
