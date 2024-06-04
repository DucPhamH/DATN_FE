import { createComment, getComments } from '../../../../apis/postApi'
import { keepPreviousData, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import CommentItems from '../CommentItems'
import Loading from '../../../../components/GlobalComponents/Loading'
import { useContext, useState } from 'react'
import InputEmoji from '../../../../components/InputComponents/InputEmoji'
import { queryClient } from '../../../../main'
import { AppContext } from '../../../../contexts/app.context'
import { SocketContext } from '../../../../contexts/socket.context'

export default function Comments({ post }) {
  const [content, setContent] = useState('')
  const { profile } = useContext(AppContext)
  const { newSocket } = useContext(SocketContext)

  const fetchComment = async ({ pageParam }) => {
    return await getComments({ page: pageParam, post_id: post._id })
  }
  const commentMutation = useMutation({
    mutationFn: (body) => createComment(body)
  })

  const handleCreateComment = async (e) => {
    if (content.trim() === '') return
    e.preventDefault()
    commentMutation.mutate(
      {
        post_id: post._id,
        content: content
      },
      {
        onSuccess: async () => {
          newSocket.emit('comment post', {
            content: 'Đã bình luận về bài viết của bạn',
            to: post.user._id,
            name: profile.name,
            avatar: profile.avatar
          })
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['comments']
            }),
            queryClient.invalidateQueries({
              queryKey: ['newFeeds']
            })
          ])
          setContent('')
        },
        onError: () => {
          console.log('error')
        }
      }
    )
  }

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments', post._id],
    queryFn: fetchComment,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.comments.length ? allPages.length + 1 : undefined
      return nextPage
    },
    placeholderData: keepPreviousData
  })

  const contentComment = data?.pages.map((dataComments) =>
    dataComments.data.result.comments.map((comment) => {
      return <CommentItems post={post} comment={comment} key={comment._id} />
    })
  )

  if (status === 'pending') {
    return <Loading className='w-full flex justify-center mt-5' />
  }

  return (
    <div className='pt-4 px-4 md:px-0'>
      <InputEmoji content={content} setContent={setContent} handleCreateComment={handleCreateComment} />
      <div className='pt-6'>
        {contentComment}
        <div className='w-full'>
          <button
            className='py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75'
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Đang tải ...' : hasNextPage ? 'Xem thêm bình luận' : 'Không còn bình luận nào'}
          </button>
        </div>
      </div>
    </div>
  )
}
