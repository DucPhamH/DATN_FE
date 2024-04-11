import { navBarsProfile } from '../../../services/objectUi'

export default function TabsProfile({ toggleTab, getActiveClass }) {
  return (
    <div className={`flex justify-center md:justify-start items-center my-2 `}>
      <div className='flex items-center space-x-14 bg-transparent'>
        {navBarsProfile.map((item, index) => (
          <div key={item.id} className='text-lg group font-medium'>
            <div
              onClick={() => toggleTab(index)}
              className={`cursor-pointer ${getActiveClass(index, 'text-yellow-700')}`}
            >
              {item.title}
              <div className='h-0.5 bg-yellow-700 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
