import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function MotionWrapper({ children, variants }) {
  return (
    <motion.div
      variants={
        variants
        // {
        // hidden: { opacity: 0, x: 500 },
        // visible: { opacity: 1, x: 0 },
        // {
        //   offscreen: {
        //     opacity: 0,
        //     x: 500
        //   },
        //   onscreen: {
        //     opacity: 1,
        //     x: 0
        //   }
        // }
      }
      initial='offscreen'
      animate='visible'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.div>
  )
}
