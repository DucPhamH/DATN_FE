import { Link } from 'react-router-dom'

export default function ButtonLanding({ link, className, text }) {
  return (
    <Link to={link} className={`btn-custom font-semibold mx-2 ${className}`}>
      {text}
    </Link>
  )
}
