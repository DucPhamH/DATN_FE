import { AiFillHeart } from 'react-icons/ai'
import { BiSolidCookie, BiSolidShareAlt } from 'react-icons/bi'
import MotionWrapper from '../../../../layouts/MotionWrapper'
import CardInfo from './CardInfo'

const infoItems = [
  {
    id: 1,
    title: 'Kiểm tra sức khỏe',
    icon: <AiFillHeart />,
    description:
      'Chúng ta có thể tính toán được những chỉ số sức khỏe của bản thân và lên kế hoạch điều chỉnh dinh dưỡng hợp lí'
  },
  {
    id: 2,
    title: 'Học nấu ăn',
    icon: <BiSolidCookie />,
    description: 'Vô vàn bài viết về những công thức nấu ăn, chế độ dinh dưỡng cho chúng ta khám phá'
  },
  {
    id: 3,
    title: 'Kết nối',
    icon: <BiSolidShareAlt />,
    description:
      'Chúng ta có thể viết blog, chia sẻ với mọi người về chế độ dinh dưỡng mình đạt được và còn vô số điều thú vị khác'
  }
]

export default function InfoLanding() {
  return (
    <section id='info'>
      <div className='py-20'>
        <div className='text-center m-auto mb-10 md:w-1/2'>
          <h1 className='font-bold text-3xl mb-4'>
            Với <span className='text-red-500'>Cook</span>Healthy
          </h1>
          <h1 className=' text-3xl font-extrabold'>Bạn có thể làm gì ?</h1>
        </div>
        <MotionWrapper
          variants={{
            offscreen: {
              opacity: 0,
              y: 30
            },
            onscreen: {
              opacity: 1,
              y: 0
            }
          }}
        >
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-12 lg:gap-8 px-4 sm:px-6 lg:px-8'>
            {infoItems.map((infoItem) => {
              return <CardInfo key={infoItem.id} infoItem={infoItem} />
            })}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
