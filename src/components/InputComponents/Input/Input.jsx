export default function Input({
  title,
  placeholder,
  className = 'block bg-white dark:bg-slate-800 dark:border-none w-full placeholder:text-sm px-3 py-2  text-black text-lg border border-gray-300 rounded-lg',
  register = () => {},
  errors,
  type = 'text',
  name,
  id
}) {
  return (
    <div className='pb-2 flex flex-col justify-start'>
      <label className='text-gray-400 lg:text-red-900 mb-1 dark:text-pink-300 text-left italic'>{title}</label>
      <input type={type} name={name} id={id} placeholder={placeholder} className={className} {...register(`${name}`)} />
      <div className='flex min-h-[1rem] text-xs text-red-600'> {errors?.message}</div>
    </div>
  )
}
