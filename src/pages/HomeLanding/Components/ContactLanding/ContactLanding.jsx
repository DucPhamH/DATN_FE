import MotionWrapper from '../../../../layouts/MotionWrapper'
import ButtonLanding from '../ButtonLanding'

export default function ContactLanding() {
  return (
    <section id='contact'>
      <div className='py-10 px-10'>
        <div className='text-center m-auto mb-20 md:w-1/2'>
          <h4 className='font-bold text-3xl text-red-500 mb-4'>Bạn có câu hỏi gì ?</h4>
          <h1 className='text-3xl font-extrabold'>Liên hệ với chúng tôi !</h1>
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
          <form>
            <div className='w-full m-auto text-center md:w-2/3'>
              <div className='text-color-primary-dark grid gap-6 mb-6 md:grid-cols-2'>
                <input
                  type='text'
                  id='name'
                  autoComplete='on'
                  className='dark:bg-gray-100 bg-yellow-50 border border-gray-600 text-lg rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary'
                  placeholder='Name'
                />
                <input
                  id='email'
                  type='email'
                  autoComplete='on'
                  className='dark:bg-gray-100 bg-yellow-50 border border-gray-600 text-lg rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary'
                  placeholder='Email'
                />
              </div>
              <textarea
                rows={6}
                id='message'
                className='text-color-primary-dark dark:bg-gray-100 bg-yellow-50 border border-gray-600 text-lg rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary'
                placeholder='Message'
                defaultValue={''}
              />
              <ButtonLanding
                link={'/login'}
                className='bg-gradient-to-r mt-10 inline-block text-gray-100 from-[#ef571a] to-[#b11804]'
                text='Gửi tin nhắn'
              />
            </div>
          </form>
        </MotionWrapper>
      </div>
    </section>
  )
}
