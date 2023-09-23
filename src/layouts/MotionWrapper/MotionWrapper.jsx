import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function MotionWrapper({ children, variants }) {
  return (
    <motion.div
      variants={variants}
      initial='offscreen'
      animate='visible'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.25, delay: 0.25 }}
    >
      {children}
    </motion.div>
  )
}
