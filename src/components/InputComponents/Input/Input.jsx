export default function Input({
  title,
  placeholder,
  classNameLabel = 'text-gray-400 lg:text-red-900 text-sm font-medium mb-1 dark:text-pink-300 text-left',
  className = 'block bg-white dark:bg-slate-800 dark:border-none w-full placeholder:text-sm px-3 py-2  text-black dark:text-gray-400 text-lg border border-gray-300 rounded-lg',
  register = () => {},
  errors,
  type = 'text',
  name,
  id
}) {
  return (
    <div className='pb-2 flex flex-col justify-start'>
      <label className={classNameLabel}>{title}</label>
      <input type={type} name={name} id={id} placeholder={placeholder} className={className} {...register(`${name}`)} />
      <div className='flex min-h-[1rem] font-medium text-orange-300  text-xs lg:text-red-600'> {errors?.message}</div>
    </div>
  )
}
