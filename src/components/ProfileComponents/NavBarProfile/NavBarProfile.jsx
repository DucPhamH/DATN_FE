import { Link, useLocation } from 'react-router-dom'
import { navBarsProfile } from '../../../services/objectUi'
export default function NavBarProfile() {
  const path = useLocation()

  return (
    <div className={`flex justify-center md:justify-start items-center my-2 `}>
      <ul className='flex items-center space-x-14 bg-transparent'>
        {navBarsProfile.map((item) => {
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
