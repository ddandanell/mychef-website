'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// Custom cubic-bezier for fluid, premium feel
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
const easeOutQuart: [number, number, number, number] = [0.25, 1, 0.5, 1]

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  blur?: boolean
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  blur = false,
}: FadeInProps) {
  const offset = directionOffset[direction]

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        ...(blur ? { filter: 'blur(8px)' } : {}),
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: blur ? 'blur(0px)' : undefined,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: blur ? 'blur(0px)' : undefined,
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easeOutQuart,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Scroll progress parallax wrapper
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}
