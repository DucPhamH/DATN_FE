import { AiFillHeart } from 'react-icons/ai'

export default function BlogDetail() {
  return (
    <>
      <div className='grid xl:mx-4 pt-2 xl:gap-3 xl:grid-cols-6'>
        <div className='col-span-4'>
          <div className=''>
            <main className='pt-8 pb-16 font-Roboto lg:pb-24 bg-white dark:bg-color-primary '>
              <div className='flex justify-between items-center px-2 max-w-screen-xl '>
                <article className='mx-auto w-full max-w-3xl '>
                  <header className='mb-4 lg:mb-6 not-format'>
                    <address className='flex justify-between items-center mb-6 not-italic'>
                      <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                        <img
                          className='mr-4 w-16 h-16 rounded-full'
                          src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                          alt='Jese Leos'
                        />
                        <div>
                          <a href='#' rel='author' className='text-xl font-bold text-gray-900 dark:text-white'>
                            Jese Leos
                          </a>
                          <p className='text-base text-gray-500 dark:text-gray-400'>@username</p>
                          <p className='text-base text-gray-500 dark:text-gray-400'>
                            <time dateTime='2022-02-08' title='February 8th, 2022'>
                              Feb. 8, 2022
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex justify-end items-center'>
                          <button
                            type='button'
                            className=' mx-2 shadow-xl text-red-700 border border-red-700 hover:bg-red-700 hover:text-white  font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-pink-500 dark:text-pink-700 dark:hover:text-white '
                          >
                            <AiFillHeart className='mr-0.5' size={20} />
                          </button>

                          <span>18 lượt thích</span>
                        </div>

                        <div>
                          <button className='btn mx-2'>Lưu bài viết</button>
                          <span>18 lượt lưu</span>
                        </div>
                      </div>
                    </address>
                    <h1 className='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>
                      Best practices for successful prototypes
                    </h1>
                  </header>
                  <p className='lead'>
                    Flowbite is an open-source library of UI components built with the utility-first classes from
                    Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.
                  </p>

                  <div className='flex my-2 justify-center w-[100%]'>
                    <img
                      className='object-cover w-[100%]'
                      src='https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png'
                      alt
                    />
                  </div>
                  <h2>Getting started with Flowbite</h2>
                  <p>
                    First of all you need to understand how Flowbite works. This library is not another framework.
                    Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the
                    documentation.
                  </p>
                  <p>
                    It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,
                    and datepickers which you can optionally include into your project via CDN or NPM.
                  </p>
                  <p>
                    You can check out the{' '}
                    <a href='https://flowbite.com/docs/getting-started/quickstart/'>quickstart guide</a> to explore the
                    elements by including the CDN files into your project. But if you want to build a project with
                    Flowbite I recommend you to follow the build tools steps so that you can purge and minify the
                    generated CSS.
                  </p>
                  <p>
                    You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help
                    you get started with your projects even faster. You can check out this{' '}
                    <a href='https://flowbite.com/docs/components/tables/'>comparison table</a> to better understand the
                    differences between the open-source and pro version of Flowbite.
                  </p>
                  <h2>When does design come in handy?</h2>
                  <p>
                    While it might seem like extra work at a first glance, here are some key moments in which
                    prototyping will come in handy:
                  </p>
                  <ol>
                    <li>
                      <strong>Usability testing</strong>. Does your user know how to exit out of screens? Can they
                      follow your intended user journey and buy something from the site you’ve designed? By running a
                      usability test, you’ll be able to see how users will interact with your design once it’s live;
                    </li>
                    <li>
                      <strong>Involving stakeholders</strong>. Need to check if your GDPR consent boxes are displaying
                      properly? Pass your prototype to your data protection team and they can test it for real;
                    </li>
                    <li>
                      <strong>Impressing a client</strong>. Prototypes can help explain or even sell your idea by
                      providing your client with a hands-on experience;
                    </li>
                    <li>
                      <strong>Communicating your vision</strong>. By using an interactive medium to preview and test
                      design elements, designers and developers can understand each other — and the project — better.
                    </li>
                  </ol>
                  <h3>Laying the groundwork for best design</h3>
                  <p>
                    Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
                    you can think things through before committing to an actual design project.
                  </p>
                  <p>
                    Let's start by including the CSS file inside the <code>head</code> tag of your HTML.
                  </p>
                  <h3>Understanding typography</h3>
                  <h4>Type properties</h4>
                  <p>
                    A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
                    letters. A typeface represents shared patterns across a collection of letters.
                  </p>
                  <h4>Baseline</h4>
                  <p>
                    A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
                    letters. A typeface represents shared patterns across a collection of letters.
                  </p>
                  <h4>Measurement from the baseline</h4>
                  <p>
                    A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
                    letters. A typeface represents shared patterns across a collection of letters.
                  </p>
                  <h3>Type classification</h3>
                  <h4>Serif</h4>
                  <p>
                    A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.
                    Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the
                    following:
                  </p>
                  <h4>Old-Style serifs</h4>
                  <ul>
                    <li>Low contrast between thick and thin strokes</li>
                    <li>Diagonal stress in the strokes</li>
                    <li>Slanted serifs on lower-case ascenders</li>
                  </ul>
                  <img src='https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-2.png' alt />
                  <ol>
                    <li>Low contrast between thick and thin strokes</li>
                    <li>Diagonal stress in the strokes</li>
                    <li>Slanted serifs on lower-case ascenders</li>
                  </ol>
                  <h3>Laying the best for successful prototyping</h3>
                  <p>A serif is a small shape or projection that appears at the beginning:</p>
                  <blockquote>
                    <p>
                      Flowbite is just awesome. It contains tons of predesigned components and pages starting from login
                      screen to complex dashboard. Perfect choice for your next SaaS application.
                    </p>
                  </blockquote>
                  <h4>Code example</h4>
                  <p>
                    A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.
                    Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the
                    following:
                  </p>

                  <h4>Table example</h4>
                  <p>
                    A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.
                  </p>

                  <h3>Best practices for setting up your prototype</h3>
                  <p>
                    <strong>Low fidelity or high fidelity?</strong> Fidelity refers to how close a prototype will be to
                    the real deal. If you’re simply preparing a quick visual aid for a presentation, a low-fidelity
                    prototype — like a wireframe with placeholder images and some basic text — would be more than
                    enough. But if you’re going for more intricate usability testing, a high-fidelity prototype — with
                    on-brand colors, fonts and imagery — could help get more pointed results.
                  </p>
                  <p>
                    <strong>Consider your user</strong>. To create an intuitive user flow, try to think as your user
                    would when interacting with your product. While you can fine-tune this during beta testing,
                    considering your user’s needs and habits early on will save you time by setting you on the right
                    path.
                  </p>
                  <p>
                    <strong>Start from the inside out</strong>. A nice way to both organize your tasks and create more
                    user-friendly prototypes is by building your prototypes ‘inside out’. Start by focusing on what will
                    be important to your user, like a Buy now button or an image gallery, and list each element by order
                    of priority. This way, you’ll be able to create a prototype that puts your users’ needs at the heart
                    of your design.
                  </p>
                  <p>
                    And there you have it! Everything you need to design and share prototypes — right in Flowbite Figma.
                  </p>
                </article>
              </div>
            </main>
            {/* <aside aria-label='Related articles' className='py-8 lg:py-24 bg-gray-50 dark:bg-gray-800'>
              <div className='px-4 mx-auto max-w-screen-xl'>
                <h2 className='mb-8 text-2xl font-bold text-gray-900 dark:text-white'>Related articles</h2>
                <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'>
                  <article className='max-w-xs'>
                    <a href='#'>
                      <img
                        src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png'
                        className='mb-5 rounded-lg'
                        alt='Image 1'
                      />
                    </a>
                    <h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
                      <a href='#'>Our first office</a>
                    </h2>
                    <p className='mb-4 text-gray-500 dark:text-gray-400'>
                      Over the past year, Volosoft has undergone many changes! After months of preparation.
                    </p>
                    <a
                      href='#'
                      className='inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline'
                    >
                      Read in 2 minutes
                    </a>
                  </article>
                  <article className='max-w-xs'>
                    <a href='#'>
                      <img
                        src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png'
                        className='mb-5 rounded-lg'
                        alt='Image 2'
                      />
                    </a>
                    <h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
                      <a href='#'>Enterprise design tips</a>
                    </h2>
                    <p className='mb-4  text-gray-500 dark:text-gray-400'>
                      Over the past year, Volosoft has undergone many changes! After months of preparation.
                    </p>
                    <a
                      href='#'
                      className='inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline'
                    >
                      Read in 12 minutes
                    </a>
                  </article>
                  <article className='max-w-xs'>
                    <a href='#'>
                      <img
                        src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png'
                        className='mb-5 rounded-lg'
                        alt='Image 3'
                      />
                    </a>
                    <h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
                      <a href='#'>We partnered with Google</a>
                    </h2>
                    <p className='mb-4  text-gray-500 dark:text-gray-400'>
                      Over the past year, Volosoft has undergone many changes! After months of preparation.
                    </p>
                    <a
                      href='#'
                      className='inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline'
                    >
                      Read in 8 minutes
                    </a>
                  </article>
                  <article className='max-w-xs'>
                    <a href='#'>
                      <img
                        src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png'
                        className='mb-5 rounded-lg'
                        alt='Image 4'
                      />
                    </a>
                    <h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
                      <a href='#'>Our first project with React</a>
                    </h2>
                    <p className='mb-4  text-gray-500 dark:text-gray-400'>
                      Over the past year, Volosoft has undergone many changes! After months of preparation.
                    </p>
                    <a
                      href='#'
                      className='inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline'
                    >
                      Read in 4 minutes
                    </a>
                  </article>
                </div>
              </div>
            </aside> */}
          </div>
        </div>
        <div className='hidden xl:block col-span-2'>
          <div className=' shadow  bg-white rounded-lg dark:bg-color-primary dark:border-none'>
            <div className='flex dark:text-gray-300 justify-center items-center pt-4 text-xl font-semibold text-red-700'>
              Tin tức mới nhất
            </div>
            <div className='border mt-2 mx-5 dark:border-gray-700 border-red-200 '></div>
            <div className='p-3'>
              {/* {blogItems.map((blogItem) => {
                return (
                  <div className='mb-2 mx-5' key={blogItem.id}>
                    <BlogCard
                      blogItem={blogItem}
                      imgClass='lg:h-[32vh] rounded-t-xl scale-100 overflow-hidden'
                      dateClass='flex text-xs items-center gap-4 pt-2 pb-1'
                      titleClass=' font-bold hover:text-color-secondary'
                      descriptionClass='leading-relaxed text-sm line-clamp-2 mt-2 mb-3'
                      linkClass='inline-block font-bold hover:text-color-secondary transition-all duration-300 ease-in-out'
                    />
                  </div>
                )
              })} */}
              <div className='w-full text-center pb-4 font-medium dark:text-gray-300 text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-300'>
                Xem thêm bài viết...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
