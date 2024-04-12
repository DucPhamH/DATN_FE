import moment from 'moment'
import { cutString } from '../../../../helpers/cutString'
import { Link } from 'react-router-dom'
export default function BlogItem({ blog }) {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{cutString(blog.title, 20)}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        {blog.status === 0 ? (
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-black dark:bg-pink-200'>
            Chưa duyệt
          </span>
        ) : (
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
            Đã duyệt
          </span>
        )}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{blog.category_blog.name}</td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        {moment(blog.createdAt).format('MM/DD/YYYY')}
      </td>
      <td className='px-6 py-4 whitespace-nowrap  text-sm font-medium'>
        <Link to={`/chef/edit-blog/${blog._id}`} className='text-indigo-600 hover:text-indigo-900'>
          Sửa
        </Link>
        <a href='#' className='ml-2 text-red-600 hover:text-red-900'>
          Xóa
        </a>
      </td>
    </tr>
  )
}
