import TextArea from '../../../../components/InputComponents/TextArea'
import { keepPreviousData, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../../main'
import { useForm } from 'react-hook-form'

import CommentItems from '../CommentItems'
import { commentRecipe, getComments } from '../../../../apis/recipeApi'

export default function Comments({ recipe }) {
  const fetchComment = async ({ pageParam }) => {
    return await getComments({ page: pageParam, recipe_id: recipe._id })
  }
  const commentMutation = useMutation({
    mutationFn: (body) => commentRecipe(body)
  })

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ''
    }
  })
  const onSubmitComment = handleSubmit((data) => {
    if (data.content === '') return
    commentMutation.mutate(
      {
        recipe_id: recipe._id,
        content: data.content
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['comments-recipes']
          })
          reset()
        },
        onError: () => {
          console.log('error')
        }
      }
    )
  })

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments-recipes', recipe?._id],
    queryFn: fetchComment,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.result.comments.length ? allPages.length + 1 : undefined
      return nextPage
    },
    placeholderData: keepPreviousData
  })

  const contentComment = data?.pages?.map((dataComments) =>
    dataComments.data.result.comments.map((comment) => {
      return <CommentItems comment={comment} key={comment._id} />
    })
  )

  return (
    <section className=' col-span-6  py-8 lg:py-16 antialiased'>
      <div className='mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>Bình luận của cộng đồng</h2>
        </div>
        <div className='border-b-[1px]  my-3 border-red-300 '></div>
        <form onSubmit={onSubmitComment} className='mb-6'>
          <TextArea
            className='block bg-white dark:bg-slate-800 dark:border-none w-full placeholder:text-sm px-3 py-2  text-black dark:text-gray-400 text-lg border border-gray-300 rounded-lg'
            id='content'
            name='content'
            placeholder='Hãy viết bình luận của bạn ở đây'
            title=''
            register={register}
            rows={5}
            required
          />
          <button className='block btn btn-sm  md:inline-block md:w-auto  bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2'>
            <div className='flex justify-center gap-2 items-center'>
              <div>Bình luận</div>
            </div>
          </button>
        </form>
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
    </section>
  )
}
