import { omit } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsArrowUpRight } from 'react-icons/bs'
import useQueryConfig from '../../../../hooks/useQueryConfig'
import { useQuery } from '@tanstack/react-query'
import { searchAll } from '../../../../apis/searchApi'
import useDebounce from '../../../../hooks/useDebounce'
import { useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { cutString } from '../../../../utils/helper'
import { AppContext } from '../../../../contexts/app.context'

// const words = ['adb', 'app', 'asdf']
export default function SearchInput() {
  const [activeSearch, setActiveSearch] = useState([])
  const queryConfig = omit(useQueryConfig(), ['page', 'sort'])
  const { setSearchQuery } = useContext(AppContext)

  // const { data } = useQuery({
  //   queryKey: [
  //     'search-all',
  //     {
  //       search: debouncedSearch
  //     }
  //   ],
  //   queryFn: () => {
  //     return searchAll({
  //       search: debouncedSearch
  //     })
  //   }
  // })
  // console.log(data)

  // const handleSearch = (e) => {
  //   if (e.target.value == '') {
  //     setActiveSearch([])
  //     return false
  //   }
  //   setActiveSearch(words.filter((w) => w.includes(e.target.value)).slice(0, 8))
  // }
  const navigate = useNavigate()

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      search: queryConfig.search || ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.search === '') {
      navigate({
        pathname: '/home',
        search: createSearchParams(omit({ ...queryConfig }, ['page', 'sort', 'search'])).toString()
      })
      return
    }
    // navigate({
    //   pathname: '/search',
    //   search: createSearchParams(omit({ ...queryConfig, search: data.search }, ['page', 'sort'])).toString()
    // })

    setSearchQuery({
      search: data.search
    })
    navigate(`/search`)
    // reset lại form sau khi navigate sang trang search
    reset()
  })

  const searchWatch = watch('search')

  const debouncedSearch = useDebounce(searchWatch, 500)
  // console.log(searchWatch)
  // console.log(debouncedSearch)

  const { data } = useQuery({
    queryKey: [
      'search-all',
      {
        search: debouncedSearch
      }
    ],
    queryFn: () => {
      return searchAll({
        search: debouncedSearch
      })
    }
  })

  // console.log(data)

  useEffect(() => {
    if (debouncedSearch === '') {
      setActiveSearch([])
    }
    // data trả về 3 mảng users, posts và recipes, mỗi mảng có thể chứa nhiều object hoặc là mảng rỗng , hãy ghép 3 mảng này thành 1 mảng duy nhất chứa tất cả các object khi data thay đổi và lưu vào state activeSearch, phân loại theo từng loại object với trường type, và thêm hai trường name và _id của từng object
    if (data) {
      // mỗi mảng lấy tối đa 3 phần tử
      const users = data?.data.result.users.slice(0, 3).map((u) => ({ type: 'user', name: u.name, _id: u._id }))
      const posts = data?.data.result.posts.slice(0, 3).map((p) => ({ type: 'post', name: p.content, _id: p._id }))
      const recipes = data?.data.result.recipes.slice(0, 3).map((r) => ({ type: 'recipe', name: r.title, _id: r._id }))
      setActiveSearch([...users, ...posts, ...recipes])
    }
  }, [data, debouncedSearch])

  // console.log(activeSearch)

  return (
    <form onSubmit={onSubmitSearch} className='w-[12rem] mr-3 md:w-[16rem] lg:w-[20rem] relative'>
      <div className='relative'>
        <input
          type='search'
          id='search_input'
          placeholder='Tìm kiếm'
          autoComplete='off'
          className='w-full py-2 px-3  placeholder:text-sm rounded-full border border-red-600 bg-white dark:border-none dark:bg-slate-800'
          {...register('search')}
        />
        <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-full'>
          <AiOutlineSearch />
        </button>
      </div>

      {activeSearch.length > 0 && (
        <div className='absolute cursor-pointer top-12 py-2 bg-white border dark:border-none dark:bg-slate-800 dark:text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col'>
          {activeSearch.map((s, index) => (
            <Link
              to={
                s.type === 'user'
                  ? `/user/${s._id}`
                  : s.type === 'post'
                  ? `/post/${s._id}`
                  : s.type === 'recipe'
                  ? `/cooking/recipe/${s._id}`
                  : '/'
              }
              className='flex justify-between items-center hover:bg-slate-100 transition-all duration-200 dark:hover:bg-slate-700 px-3 py-2'
              key={index}
            >
              <div className=''>{cutString(s.name, 15)}</div>
              <div>
                <BsArrowUpRight />
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  )
}
