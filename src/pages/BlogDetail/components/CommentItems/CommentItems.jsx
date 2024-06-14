import moment from 'moment'
import ShowMoreContent from '../../../../components/GlobalComponents/ShowMoreContent/ShowMoreContent'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { deleteCommentBlog } from '../../../../apis/blogApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import toast from 'react-hot-toast'
import ThreeDotComment from '../ThreeDotComment/ThreeDotComment'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

export default function CommentItems({ comment }) {
  const navigate = useNavigate()
  const deleteCommentMutation = useMutation({
    mutationFn: (body) => deleteCommentBlog(body)
  })

  const handleDeleteComment = async () => {
    deleteCommentMutation.mutate(
      {
        comment_id: comment._id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['comments-blog']
          })
          toast.success('Xóa bình luận thành công')
        },
        onError: () => {
          console.log('error')
        }
      }
    )
  }
  return (
    <article className='p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
      <footer className='flex justify-between items-center mb-2'>
        <div className='flex items-center'>
          <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
            <img
              className='mr-2 w-6 h-6 rounded-full'
              src={comment?.user.avatar === '' ? useravatar : comment.user.avatar}
              alt='avatar'
            />
            <div
              onClick={() => navigate(`/user/${comment?.user._id}`)}
              className='flex items-center gap-1 flex-wrap mr-2'
            >
              <span className='hover:underline cursor-pointer text-base font-bold '> {comment?.user.name}</span>
              {comment?.user.role === 1 && (
                <div className='text-blue-400 rounded-full flex justify-center items-center '>
                  <FaCheckCircle size={12} />
                </div>
              )}
              <span className='text-slate-500 text-xs dark:text-slate-300'>{moment(comment?.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
        <ThreeDotComment
          userID={comment?.user._id}
          handleDeletePost={handleDeleteComment}
          isPending={deleteCommentMutation.isPending}
        />
      </footer>
      <ShowMoreContent className='text-sm' lines={2}>
        <p className=''>{comment?.content}</p>
      </ShowMoreContent>
    </article>
  )
}
