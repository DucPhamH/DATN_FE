export default function LoadingHome() {
  return (
    <div className='w-full h-[100rem] flex flex-col items-center'>
      <h1 className='cooking-text dark:text-white'>Cooking in progress</h1>
      <div id='cooking'>
        <div className='bubble' />
        <div className='bubble' />
        <div className='bubble' />
        <div className='bubble' />
        <div className='bubble' />
        <div id='area'>
          <div id='sides'>
            <div id='pan' />
            <div id='handle' />
          </div>
          <div id='pancake'>
            <div id='pastry' />
          </div>
        </div>
      </div>
    </div>
  )
}
