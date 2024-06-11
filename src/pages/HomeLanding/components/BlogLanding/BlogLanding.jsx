import MotionWrapper from '../../../../layouts/MotionWrapper'
import BlogCard from '../../../../components/CardComponents/BlogCard'
import { randomBlogLanding } from '../../../../apis/blogApi'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export default function BlogLanding() {
  const { data } = useQuery({
    queryKey: ['random-blog'],
    queryFn: () => {
      return randomBlogLanding()
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10
  })

  console.log(data)
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
            {data?.data?.result.map((blogItem) => {
              return (
                <BlogCard
                  key={blogItem._id}
                  blogItem={blogItem}
                  imgClass='w-full h-[16rem] object-cover rounded-t-xl scale-100 overflow-hidden'
                  dateClass='flex items-center gap-4 py-3'
                  titleClass='text-2xl font-bold  h-16 transition-all cursor-pointer line-clamp-2  hover:text-color-secondary'
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
