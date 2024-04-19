import moment from 'moment'
import ShowMoreContent from '../../../../components/GlobalComponents/ShowMoreContent/ShowMoreContent'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { deleteCommentBlog } from '../../../../apis/blogApi'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import { toast } from 'react-toastify'
import ThreeDotComment from '../ThreeDotComment/ThreeDotComment'

export default function CommentItems({ blog, comment }) {
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
          queryClient.invalidateQueries('comments-blogs')
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
          <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
            <img
              className='mr-2 w-6 h-6 rounded-full'
              src={comment?.user.avatar === '' ? useravatar : comment.user.avatar}
              alt='avatar'
            />
            {comment?.user.name}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>{moment(comment?.createdAt).fromNow()}</p>
        </div>
        <ThreeDotComment
          userID={comment?.user._id}
          handleDeletePost={handleDeleteComment}
          post={blog}
          isPending={deleteCommentMutation.isPending}
        />
      </footer>
      <ShowMoreContent className='text-sm' lines={2}>
        <p className=''>{comment?.content}</p>
      </ShowMoreContent>
    </article>
  )
}
