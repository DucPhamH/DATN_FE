import { motion } from 'framer-motion'

export default function MotionWrapper({ children, variants }) {
  return (
    <motion.div
      variants={variants}
      initial='offscreen'
      animate='visible'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.2, delay: 0.15 }}
    >
      {children}
    </motion.div>
  )
}
