export default function Input({ title, placeholder, register, errors, type = 'text', name, id }) {
  return (
    <div className='pb-2 flex flex-col justify-start'>
      <label className='text-gray-400 lg:text-red-900 text-left italic'>{title}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className='block bg-white dark:bg-white w-full placeholder:text-sm px-3 py-2  text-black text-lg border border-gray-300 rounded-lg '
        {...register(`${name}`)}
      />
      <div className='flex min-h-[1rem] text-xs text-red-600'> {errors?.message}</div>
    </div>
  )
}
