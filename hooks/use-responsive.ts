"use client"

import { useState, useEffect } from 'react'

interface BreakpointConfig {
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

const breakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowSize.width < breakpoints.sm
  const isTablet = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.lg
  const isDesktop = windowSize.width >= breakpoints.lg
  const isLargeScreen = windowSize.width >= breakpoints.xl

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    breakpoints,
  }
}

export function useBreakpoint(breakpoint: keyof BreakpointConfig) {
  const { windowSize } = useResponsive()
  return windowSize.width >= breakpoints[breakpoint]
}