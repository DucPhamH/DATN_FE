import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from '../../components/GlobalComponents/Pagination'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function BlogList() {
  const navigate = useNavigate()
  return (
    <div className='h-screen text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          <div className='grid xl:grid-cols-4 items-center'>
            <div className='col-span-2 mb-2'>
              <div className='text-xl font-medium mb-2'>
                <span>Blog đã tạo</span>
              </div>
              <div className='border-b-[3px] mb-2 w-[20%] border-red-300 '></div>
            </div>
            <div className='col-span-2 mb-2 md:flex xl:justify-end items-center '>
              <button
                onClick={() => navigate('/chef/create-blog')}
                className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'
              >
                <div className='flex justify-center gap-2 items-center'>
                  <FaPlus /> <div>Tạo bài viết</div>
                </div>
              </button>
              <select
                defaultValue='new'
                id='sort_by'
                className='select my-2 select-sm border bg-white dark:bg-slate-800 dark:border-none'
              >
                <option value='new'>Mới nhất</option>
                <option value='a-z'>A-Z</option>
                <option value='z-a'>Z-A</option>
              </select>
              <form className='md:ml-4 w-[100%] max-w-[20rem] relative'>
                <div className='relative'>
                  <input
                    autoComplete='off'
                    type='search'
                    id='search_input'
                    placeholder='Tìm kiếm bài viết'
                    className='w-full py-2 px-3 placeholder:text-sm rounded-lg border border-red-200 bg-white dark:border-none dark:bg-slate-800'
                  />
                  <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-lg'>
                    <AiOutlineSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='min-w-full overflow-x-auto'>
            <table className='min-w-full shadow-md divide-y divide-gray-200 overflow-x-auto'>
              <thead className='bg-gray-50 dark:bg-slate-800 '>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Tên bài viết
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Trạng thái
                  </th>

                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Thể loại
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Ngày tạo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-color-primary dark:divide-gray-700 divide-y divide-gray-200'>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>Optimization</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                      Active
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>jane.cooper@example.com</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>05/04/2024</td>
                  <td className='px-6 py-4 whitespace-nowrap  text-sm font-medium'>
                    <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                      Edit
                    </a>
                    <a href='#' className='ml-2 text-red-600 hover:text-red-900'>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>Optimization</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                      Active
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>jane.cooper@example.com</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>05/04/2024</td>
                  <td className='px-6 py-4 whitespace-nowrap  text-sm font-medium'>
                    <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                      Edit
                    </a>
                    <a href='#' className='ml-2 text-red-600 hover:text-red-900'>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>Optimization</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                      Active
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>jane.cooper@example.com</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>05/04/2024</td>
                  <td className='px-6 py-4 whitespace-nowrap  text-sm font-medium'>
                    <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                      Edit
                    </a>
                    <a href='#' className='ml-2 text-red-600 hover:text-red-900'>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>Optimization</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
                      Active
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>jane.cooper@example.com</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>05/04/2024</td>
                  <td className='px-6 py-4 whitespace-nowrap  text-sm font-medium'>
                    <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                      Edit
                    </a>
                    <a href='#' className='ml-2 text-red-600 hover:text-red-900'>
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex justify-center items-center'>
            <Pagination pageSize={10} />
          </div>
        </div>
      </div>
    </div>
  )
}
