import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Loading from '../../../../components/GlobalComponents/Loading'
import PaginationNotUrl from '../../../../components/GlobalComponents/PaginationNotUrl'
import { getUserRecipe } from '../../../../apis/recipeApi'
import RecipeCard from '../../../../components/CardComponents/RecipeCard'

export default function UserRecipe({ user_id }) {
  const [queryConfig, setQueryConfig] = useState({
    page: 1,
    limit: 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['user-recipe', queryConfig],
    queryFn: () => {
      return getUserRecipe(user_id, queryConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  console.log(queryConfig)

  return (
    <div className='mb-[30rem] text-gray-900 dark:text-white py-4 mx-3'>
      <div className='mx-2'>
        <div className=''>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className='grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-5 pt-5'>
                {data?.data?.result.recipes.map((recipe) => {
                  return <RecipeCard key={recipe._id} recipe={recipe} />
                })}
              </div>
            </>
          )}
          {data?.data.result.recipes.length === 0 && (
            <div className='flex justify-center items-center py-4'>
              <div className='text-gray-500 dark:text-gray-300'>Không có bài viết nào</div>
            </div>
          )}
          {data?.data.result.totalPage > 1 && (
            <div className='flex justify-center mb-5 items-center'>
              <PaginationNotUrl pageSize={data?.data.result.totalPage} query={queryConfig} setQuery={setQueryConfig} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
