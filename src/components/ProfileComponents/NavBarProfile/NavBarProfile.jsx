import { Link, NavLink, useLocation } from 'react-router-dom'
export default function NavBarProfile() {
  const path = useLocation()
  console.log(path.pathname)
  const listItems = [
    {
      id: 0,
      title: 'Bài viết',
      route: '/me'
    },
    {
      id: 1,
      title: 'Thông tin',
      route: '/me/info'
    },
    {
      id: 2,
      title: 'Blog',
      route: '/me/blog'
    }
  ]
  return (
    <div className={`flex justify-center md:justify-start items-center my-2 `}>
      <ul className='flex items-center space-x-14 bg-transparent'>
        {listItems.map((item) => {
          return (
            <li key={item.id} className='text-lg group font-medium'>
              <Link to={item.route} className={path.pathname === item.route ? 'text-yellow-700' : ''}>
                {item.title}
                <div className='h-0.5 bg-yellow-700 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'></div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
