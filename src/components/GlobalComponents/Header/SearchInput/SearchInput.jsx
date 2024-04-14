import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsArrowUpRight } from 'react-icons/bs'

const words = ['adb', 'app', 'asdf']
export default function SearchInput() {
  const [activeSearch, setActiveSearch] = useState([])

  const handleSearch = (e) => {
    if (e.target.value == '') {
      setActiveSearch([])
      return false
    }
    setActiveSearch(words.filter((w) => w.includes(e.target.value)).slice(0, 8))
  }

  return (
    <form className='w-[12rem] mr-3 md:w-[16rem] lg:w-[20rem] relative'>
      <div className='relative'>
        <input
          type='search'
          id='search_input'
          placeholder='Tìm kiếm'
          className='w-full py-2 px-3  placeholder:text-sm rounded-full border border-red-600 bg-white dark:border-none dark:bg-slate-800'
          onChange={(e) => handleSearch(e)}
        />
        <button className='absolute right-1 top-1/2 -translate-y-1/2 py-2 px-3 bg-yellow-700 text-white dark:bg-slate-600 rounded-full'>
          <AiOutlineSearch />
        </button>
      </div>

      {activeSearch.length > 0 && (
        <div className='absolute top-12 py-2 bg-white border dark:border-none dark:bg-slate-800 dark:text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col'>
          {activeSearch.map((s, index) => (
            <div
              className='flex justify-between items-center hover:bg-slate-100 transition-all duration-200 dark:hover:bg-slate-700 px-3 py-2'
              key={index}
            >
              <div className=''>{s}</div>
              <div>
                <BsArrowUpRight />
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  )
}
