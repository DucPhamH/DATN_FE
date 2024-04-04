import moment from 'moment'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { useState } from 'react'
import InputEmoji from '../../../../components/InputComponents/InputEmoji'
import ShowMoreContent from '../../../../components/GlobalComponents/ShowMoreContent/ShowMoreContent'
import { createComment, getChildComments } from '../../../../apis/postApi'
import { keepPreviousData, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import { toast } from 'react-toastify'

export default function CommentItems({ comment }) {
  const [showReply, setShowReply] = useState(false)
  const [content, setContent] = useState('')

  const fetchChildComment = async ({ pageParam }) => {
    return await getChildComments({ page: pageParam, parent_comment_id: comment._id })
  }

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['child-comments', comment._id],
    queryFn: fetchChildComment,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.child_comments.length ? allPages.length + 1 : undefined
      return nextPage
    },
    placeholderData: keepPreviousData,
    enabled: showReply
  })

  const commentMutation = useMutation({
    mutationFn: (body) => createComment(body)
  })

  const handleShowReply = () => {
    setShowReply(!showReply)
  }

  const handleCreateChildComment = async (e) => {
    if (content.trim() === '') return
    e.preventDefault()
    commentMutation.mutate(
      {
        post_id: comment.post_id,
        content: content,
        parent_comment_id: comment._id
      },
      {
        onSuccess: () => {
          toast.success('Bình luận bài viết thành công')
          queryClient.invalidateQueries('child-comments')
          setContent('')
        },
        onError: () => {
          console.log('error')
        }
      }
    )
  }
  const contentChildComment = data?.pages.map((dataChildComments) =>
    dataChildComments.data.result.child_comments.map((child_comment) => {
      return <CommentChildItems comment={child_comment} key={child_comment._id} />
    })
  )

  return (
    <div className=' flex pb-4'>
      <a className='inline-block mr-4' href='#'>
        <img
          className='rounded-full max-w-none w-12 h-12'
          src={comment.user.avatar === '' ? useravatar : comment.user.avatar}
        />
      </a>
      <div className='w-full'>
        <div>
          <a className='inline-block text-base font-bold mr-2' href='#'>
            {comment.user.name}
          </a>
          <span className='text-slate-500 dark:text-slate-300'>{moment(comment.createdAt).startOf('D').fromNow()}</span>
        </div>
        <ShowMoreContent className='text-sm' lines={2}>
          <p className=''>{comment.content}</p>
        </ShowMoreContent>

        <div className='mt-2 mb-2 flex items-center'>
          <div
            className='inline-flex hover:text-blue-400 cursor-pointer text-sm items-center'
            onClick={handleShowReply}
          >
            <span className=' font-medium'>{comment.child_comments_count} lượt phản hồi</span>
          </div>
          <button
            onClick={handleShowReply}
            className='py-1 px-3 text-sm mx-1 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg'
          >
            Trả lời
          </button>
        </div>
        {showReply && (
          <div className=''>
            {contentChildComment}
            <InputEmoji content={content} setContent={setContent} handleCreateComment={handleCreateChildComment} />
            <div className='w-full mt-3'>
              <button
                className='py-1 px-4 w-full hover:text-red-700 block text-center rounded-lg font-medium transition ease-in-out delay-75'
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? 'Đang tải...' : hasNextPage ? 'Xem thêm' : ''}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CommentChildItems({ comment }) {
  return (
    <div className='mt-4 '>
      <div className='media flex pb-4'>
        <a className='mr-4' href='#'>
          <img
            className='rounded-full max-w-none w-10 h-10'
            src={comment.user.avatar === '' ? useravatar : comment.user.avatar}
          />
        </a>
        <div className='media-body'>
          <div>
            <a className='inline-block text-base font-bold mr-2' href='#'>
              {comment.user.name}
            </a>
            <span className='text-slate-500 dark:text-slate-300'>
              {moment(comment.createdAt).startOf('D').fromNow()}
            </span>
          </div>
          <ShowMoreContent className='text-sm' lines={2}>
            <p className='text-sm'>{comment.content}</p>
          </ShowMoreContent>
        </div>
      </div>
    </div>
  )
}