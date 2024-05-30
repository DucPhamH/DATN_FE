import { useNavigate } from 'react-router-dom'

export default function AlbumCard({ album }) {
  const navigate = useNavigate()
  return (
    <div className='card dark:shadow-orange-900 bg-base-100 shadow-md image-full'>
      <figure className='h-[22rem]'>
        <img loading='lazy' src={album.image} alt='card' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title mt-10 line-clamp-2 text-white hover:underline cursor-pointer'>{album.title}</h2>
        <p className='text-gray-300'>{album.recipes.length} công thức</p>
        <div className='card-actions justify-end'>
          <button
            onClick={() => navigate(`/album/${album._id}`)}
            className='btn bg-gray-200 py-1 px-2 text-gray-700 hover:bg-gray-300'
          >
            Xem ngay !
          </button>
        </div>
      </div>
    </div>
  )
}
