export default function IngerdientItem({ ingredient }) {
  return (
    <>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-700 dark:text-gray-300'>{ingredient.name}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.energy} calories</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.protein} g</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.fat} g</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{ingredient.carbohydrate} g</div>
        </td>
      </tr>
    </>
  )
}
