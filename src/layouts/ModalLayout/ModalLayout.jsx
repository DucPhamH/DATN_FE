import { AnimatePresence, motion } from 'framer-motion'

export default function ModalLayout({
  children,
  closeModal,
  className = 'modal-content min-w-[360px] md:min-w-[450px] dark:bg-gray-900 bg-white'
}) {
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.3,
        delayChildren: 0.4
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.3,
        delay: 0.4
      }
    }
  }
  return (
    <div className='modal-customs'>
      <AnimatePresence>
        <>
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={overlayVariants}
            className='overlay-customs'
            onClick={closeModal}
          ></motion.div>
          <div className={className}>{children}</div>
        </>
      </AnimatePresence>
    </div>
  )
}
