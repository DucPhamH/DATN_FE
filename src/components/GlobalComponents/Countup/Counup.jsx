import CountUp from 'react-countup'
export default function Counup({ number, title, className = 'text-base text-gray-400 font-semibold' }) {
  return (
    <div className={className}>
      <CountUp duration={4} className='counter' end={number} decimals={1} />
      <span className='mx-1'>{title}</span>
    </div>
  )
}
