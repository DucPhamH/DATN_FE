import HeaderLanding from './components/HeaderLanding'
import FooterLanding from './components/FooterLanding'
import BannerLanding from './components/BannerLanding'
import InfoLanding from './components/InfoLanding'
import StartedLanding from './components/StartedLanding'
import ContactLanding from './components/ContactLanding'
import BlogLanding from './components/BlogLanding'
export default function HomeLanding() {
  return (
    <div className='w-full h-full text-gray-900 dark:text-gray-300 bg-color-primary-light dark:bg-color-primary-dark'>
      <div className='w-full h-auto'>
        <div className='container bg-white_bg dark:bg-dark_bg min-w-full'>
          <div className='w-full h-[45rem]'>
            <HeaderLanding />
            <BannerLanding />
          </div>
        </div>
      </div>
      <InfoLanding />
      <StartedLanding />
      <BlogLanding />
      <ContactLanding />

      <div>
        <FooterLanding />
      </div>
    </div>
  )
}
