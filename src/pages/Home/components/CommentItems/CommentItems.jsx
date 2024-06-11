import moment from 'moment'
import useravatar from '../../../../assets/images/useravatar.jpg'
import { useContext, useState } from 'react'
import InputEmoji from '../../../../components/InputComponents/InputEmoji'
import ShowMoreContent from '../../../../components/GlobalComponents/ShowMoreContent/ShowMoreContent'
import { createComment, deleteChildComment, deleteComment, getChildComments } from '../../../../apis/postApi'
import { keepPreviousData, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import { AppContext } from '../../../../contexts/app.context'
import { useNavigate } from 'react-router-dom'
import ThreeDotComment from '../ThreeDotComment'
import toast from 'react-hot-toast'
import { SocketContext } from '../../../../contexts/socket.context'
import { FaCheckCircle } from 'react-icons/fa'

export default function CommentItems({ comment, post }) {
  const [showReply, setShowReply] = useState(false)
  const [content, setContent] = useState('')
  const { profile } = useContext(AppContext)
  const { newSocket } = useContext(SocketContext)
  const navigate = useNavigate()

  const checkNavigateUser = () => {
    if (profile._id === comment.user._id) {
      navigate('/me')
    } else {
      navigate(`/user/${comment.user._id}`)
    }
  }

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
        onSuccess: async () => {
          newSocket.emit('comment child post', {
            content: 'Đã trả lời bình luận của bạn',
            to: comment.user._id,
            name: profile.name,
            avatar: profile.avatar
          })
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['comments']
            }),
            queryClient.invalidateQueries({
              queryKey: ['newFeeds']
            }),
            queryClient.invalidateQueries({
              queryKey: ['child-comments']
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
  const contentChildComment = data?.pages.map((dataChildComments) =>
    dataChildComments.data.result.child_comments.map((child_comment) => {
      return (
        <CommentChildItems
          post={post}
          navigate={navigate}
          profile={profile}
          comment={child_comment}
          key={child_comment._id}
        />
      )
    })
  )

  const deleteCommentMutation = useMutation({
    mutationFn: (body) => deleteComment(body)
  })

  const handleDeleteComment = async () => {
    deleteCommentMutation.mutate(
      {
        comment_id: comment._id
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['comments']
            }),
            queryClient.invalidateQueries({
              queryKey: ['newFeeds']
            })
          ])
          toast.success('Xóa bình luận thành công')
        },
        onError: () => {
          console.log('error')
        }
      }
    )
  }

  return (
    <div className=' flex pb-4'>
      <div onClick={checkNavigateUser} className='inline-block mr-4'>
        <img
          className='rounded-full max-w-none w-12 h-12'
          src={comment.user.avatar === '' ? useravatar : comment.user.avatar}
        />
      </div>
      <div className='w-full'>
        <div>
          <div onClick={checkNavigateUser} className='flex items-center gap-1  mr-2'>
            <span className='hover:underline cursor-pointer text-base font-bold'> {comment.user.name}</span>
            {comment.user.role === 1 && (
              <div className='text-blue-400 rounded-full flex justify-center items-center '>
                <FaCheckCircle size={12} />
              </div>
            )}
            <span className='text-slate-500 text-xs dark:text-slate-300'>{moment(comment.createdAt).fromNow()}</span>
          </div>
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
      <div>
        <ThreeDotComment
          isPending={deleteCommentMutation.isPending}
          userID={comment.user._id}
          post={post}
          handleDeletePost={handleDeleteComment}
        />
      </div>
    </div>
  )
}

function CommentChildItems({ comment, profile, navigate, post }) {
  const checkNavigateUser = () => {
    if (profile._id === comment.user._id) {
      navigate('/me')
    } else {
      navigate(`/user/${comment.user._id}`)
    }
  }
  const deleteChildCommentMutation = useMutation({
    mutationFn: (body) => deleteChildComment(body)
  })

  const handleDeleteChildComment = async () => {
    deleteChildCommentMutation.mutate(
      {
        comment_id: comment._id
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['comments']
            }),
            queryClient.invalidateQueries({
              queryKey: ['newFeeds']
            }),
            queryClient.invalidateQueries({
              queryKey: ['child-comments']
            })
          ])
          toast.success('Xóa bình luận thành công')
        },
        onError: () => {
          console.log('error')
        }
      }
    )
  }
  console.log(comment)
  return (
    <div className='mt-4  '>
      <div className=' pb-4 flex justify-between'>
        <div className='media flex'>
          <div onClick={checkNavigateUser} className='mr-4'>
            <img
              className='rounded-full max-w-none w-10 h-10'
              src={comment.user.avatar === '' ? useravatar : comment.user.avatar}
            />
          </div>
          <div className='media-body'>
            <div>
              <div onClick={checkNavigateUser} className='flex items-center gap-1 flex-wrap mr-2'>
                <span className='hover:underline cursor-pointer text-base font-bold'> {comment.user.name}</span>
                {comment.user.role === 1 && (
                  <div className='text-blue-400 rounded-full flex justify-center items-center '>
                    <FaCheckCircle size={12} />
                  </div>
                )}
                <span className='text-slate-500 text-xs dark:text-slate-300'>
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
              {/* <span className='text-slate-500 text-xs lg:text-sm dark:text-slate-300'>
                {moment(comment.createdAt).fromNow()}
              </span> */}
            </div>
            <ShowMoreContent className='text-sm' lines={2}>
              <p className='text-sm'>{comment.content}</p>
            </ShowMoreContent>
          </div>
        </div>

        <div>
          <ThreeDotComment
            isPending={deleteChildCommentMutation.isPending}
            post={post}
            userID={comment.user._id}
            handleDeletePost={handleDeleteChildComment}
          />
        </div>
      </div>
    </div>
  )
}
