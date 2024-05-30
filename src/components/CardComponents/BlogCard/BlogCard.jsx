import moment from 'moment'
import { Link } from 'react-router-dom'

export default function BlogCard({ blogItem, imgClass, dateClass, titleClass, descriptionClass, linkClass }) {
  return (
    <div className='border my-1 border-gray-300 dark:border-gray-800  rounded-xl'>
      <div className={imgClass}>
        <img
          loading='lazy'
          src={blogItem.image}
          alt='blog'
          className=' w-full h-full object-cover hover:scale-125 transition duration-300 ease-in-out'
        />
      </div>
      <div className='mx-3 mb-8'>
        <div className={dateClass}>
          <p>{moment(blogItem.createdAt).format('MM/DD/YYYY')}</p>
        </div>
        <Link to={`/blog/${blogItem._id}`} className={titleClass}>
          {blogItem.title}
        </Link>
        <p className={descriptionClass}>{blogItem.description}</p>
        <Link to={`/blog/${blogItem._id}`} className={linkClass}>
          <span className='tracking-wider capitalize underline hover:no-underline'>Xem thêm</span>
        </Link>
      </div>
    </div>
  )
}
