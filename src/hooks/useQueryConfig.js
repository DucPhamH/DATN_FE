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
      activity_category_id: queryParams.activity_category_id
    },
    isUndefined
  )
  return queryConfig
}
