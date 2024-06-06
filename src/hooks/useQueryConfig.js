import omitBy from 'lodash/omitBy'
import { isUndefined } from 'lodash'
import useQueryParams from './useQueryParam'
export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      search: queryParams.search,
      sort: queryParams.sort || 'desc',
      status: queryParams.status,
      category_blog_id: queryParams.category_blog_id,
      category_recipe_id: queryParams.category_recipe_id,
      difficult_level: queryParams.difficult_level,
      region: queryParams.region,
      processing_food: queryParams.processing_food,
      interval_time: queryParams.interval_time,
      activity_category_id: queryParams.activity_category_id,
      category_album: queryParams.category_album,
      type: queryParams.type,
      email: queryParams.email,
      otp_code: queryParams.otp_code,
      searchAll: queryParams.searchAll
    },
    isUndefined
  )
  return queryConfig
}
