import DarkMode from '../DarkMode'
import logo from '../../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

export default function Logo({
  className = 'flex items-center gap-2.5 font-medium pb-3.5 pt-3 mx-3',
  textClassName = 'text-2xl flex font-bold whitespace-pre',
  sizeLogo = 50
}) {
  const navigate = useNavigate()
  return (
    <div className={className}>
      <img onClick={() => navigate('/home')} className='cursor-pointer' src={logo} width={sizeLogo} alt='icon-app' />
      <span className={textClassName}>
        <span className='text-red-500'>Cook</span>
        Healthy
        <DarkMode />
      </span>
    </div>
  )
}
