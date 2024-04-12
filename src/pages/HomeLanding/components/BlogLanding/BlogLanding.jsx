import MotionWrapper from '../../../../layouts/MotionWrapper'
import BlogCard from '../../../../components/CardComponents/BlogCard'

const blogItems = [
  {
    id: 1,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 2,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  },

  {
    id: 3,
    title: '21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng',
    image: 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg',
    description:
      'Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.',
    date: '31/10/2023',
    link: '#blog'
  }
]

export default function BlogLanding() {
  return (
    <section id='blog'>
      <div className='py-20'>
        <div className='text-center m-auto mb-20 md:w-1/2'>
          <h4 className='font-bold text-3xl text-red-500 mb-4'>Góc chia sẻ</h4>
          <h1 className='text-3xl font-extrabold'>Những mẹo nấu ăn trong cuộc sống</h1>
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
          <div className='grid gap-10 mx-5 md:mx-10 md:grid-cols-2 lg:grid-cols-3'>
            {/* <div className='border border-gray-300 dark:border-gray-800 rounded-xl'>
              <div className='lg:h-[40vh] rounded-t-xl scale-100 overflow-hidden'>
                <img
                  src='https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg'
                  alt='blog'
                  className='lg:h-full w-full hover:scale-125 transition duration-300 ease-in-out'
                />
              </div>
              <div className='mx-3 mb-8'>
                <div className='flex items-center gap-5 py-5'>
                  <p>31/10/2023</p>
                </div>
                <a href='#blog' className='text-2xl font-bold  hover:text-color-secondary'>
                  21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng
                </a>
                <p className='leading-relaxed line-clamp-2 my-5'>
                  Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các
                  loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối
                  trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.
                </p>
                <a
                  href='#blog'
                  className='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                >
                  <span className='tracking-wider capitalize underline hover:no-underline'>Read more</span>
                </a>
              </div>
            </div>
            <div className='border border-gray-300 dark:border-gray-800 rounded-xl'>
              <div className='lg:h-[40vh] rounded-t-xl scale-100 overflow-hidden'>
                <img
                  src='https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg'
                  alt='blog'
                  className='lg:h-full w-full hover:scale-125 transition duration-300 ease-in-out'
                />
              </div>
              <div className='mx-3 mb-8'>
                <div className='flex items-center gap-5 py-5'>
                  <p>31/10/2023</p>
                </div>
                <a href='#blog' className='text-2xl font-bold  hover:text-color-secondary'>
                  21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng
                </a>
                <p className='leading-relaxed line-clamp-2 my-5'>
                  Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các
                  loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối
                  trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.
                </p>
                <a
                  href='#blog'
                  className='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                >
                  <span className='tracking-wider capitalize underline hover:no-underline'>Read more</span>
                </a>
              </div>
            </div>
            <div className='border border-gray-300 dark:border-gray-800 rounded-xl'>
              <div className='lg:h-[40vh] rounded-t-xl scale-100 overflow-hidden'>
                <img
                  src='https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg'
                  alt='blog'
                  className='lg:h-full w-full hover:scale-125 transition duration-300 ease-in-out'
                />
              </div>
              <div className='mx-3 mb-8'>
                <div className='flex items-center gap-5 py-5'>
                  <p>31/10/2023</p>
                </div>
                <a href='#blog' className='text-2xl font-bold  hover:text-color-secondary'>
                  21 mẹo vặt nấu ăn ngon từ đầu bếp, nên biết để áp dụng
                </a>
                <p className='leading-relaxed line-clamp-2 my-5'>
                  Không phải món ăn nào chúng ta cũng cho trực tiếp muối vào ngay từ khi nấu. Đối với các món ăn có các
                  loại củ nên cho muối vào sớm hơn để muối ngấm đều vào củ còn đối với món rau luộc thì chỉ nên nêm muối
                  trước khi bắc nồi xuống tránh cho việc các chất dinh dưỡng trong rau mất đi.
                </p>
                <a
                  href='#blog'
                  className='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                >
                  <span className='tracking-wider capitalize underline hover:no-underline'>Read more</span>
                </a>
              </div>
            </div> */}
            {blogItems.map((blogItem) => {
              return (
                <BlogCard
                  key={blogItem.id}
                  blogItem={blogItem}
                  imgClass='lg:h-[40vh] rounded-t-xl scale-100 overflow-hidden'
                  dateClass='flex items-center gap-4 py-3'
                  titleClass='text-2xl font-bold  hover:text-color-secondary'
                  descriptionClass='leading-relaxed line-clamp-2 my-5'
                  linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                />
              )
            })}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
