'use client'

import React, { RefObject, useEffect, useRef, useState } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'

interface TimelineContentProps extends Omit<MotionProps, 'children'> {
  children: React.ReactNode
  animationNum: number
  timelineRef: RefObject<HTMLElement>
  as?: keyof JSX.IntrinsicElements
  customVariants?: Variants
  className?: string
  href?: string
  target?: string
  rel?: string
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  animationNum,
  timelineRef,
  as: Component = 'div',
  customVariants,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        root: null,
      }
    )

    const element = timelineRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [timelineRef])

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  }

  const variants = customVariants || defaultVariants

  const MotionComponent = motion[Component] as typeof motion.div

  return (
    <MotionComponent
      ref={elementRef}
      custom={animationNum}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
