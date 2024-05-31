import moment from 'moment'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { deleteBlogForChef } from '../../../../apis/blogApi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import DeleteConfirmBox from '../../../../components/GlobalComponents/DeleteConfirmBox'
import { queryClient } from '../../../../main'
import { cutString } from '../../../../utils/helper'
export default function BlogItem({ blog }) {
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const deleteBlogMutation = useMutation({
    mutationFn: () => deleteBlogForChef(blog._id),
    onSuccess: () => {
      toast.success('Xóa bài viết thành công')
      queryClient.invalidateQueries({
        queryKey: ['blogs-list-chef']
      })
      handleCloseDelete()
    }
  })
  const handleDelete = () => {
    deleteBlogMutation.mutate()
  }

  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{cutString(blog.title, 20)}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          {blog.status === 0 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-black dark:bg-pink-200'>
              Chưa duyệt
            </span>
          ) : blog.status === 1 ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:text-black dark:bg-sky-400'>
              Đã duyệt
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-black'>
              Bị từ chối
            </span>
          )}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{blog.category_blog.name}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          {moment(blog.createdAt).format('MM/DD/YYYY')}
        </td>
        <td className='px-6 py-4 flex item-center whitespace-nowrap  text-sm font-medium'>
          <Link to={`/chef/edit-blog/${blog._id}`} className='text-indigo-600 hover:text-indigo-900'>
            Sửa
          </Link>
          <div onClick={handleOpenDelete} className='ml-2 cursor-pointer text-red-600 hover:text-red-900'>
            Xóa
          </div>
          <span>
            {openDelete && (
              <DeleteConfirmBox
                closeModal={handleCloseDelete}
                handleDelete={handleDelete}
                isPending={deleteBlogMutation.isPending}
                title={'Xác nhận xóa'}
                subtitle={'Bạn có chắc chắn muốn xóa bài viết này'}
              />
            )}
          </span>
        </td>
      </tr>
    </>
  )
}
