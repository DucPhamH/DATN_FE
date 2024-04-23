import CountUp from 'react-countup'
export default function Counup({ number, title, className = 'text-base text-gray-400 font-semibold' }) {
  return (
    <div className={className}>
      {/* cho hiển thị cả số thập phân */}
      {/* <CountUp duration={1} className='counter' end={number} />
      <span className='mx-1'>{title}</span> */}
      <CountUp duration={1} className='counter' end={number} decimals={1} />
      <span className='mx-1'>{title}</span>
    </div>
  )
}
