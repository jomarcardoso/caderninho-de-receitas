// app/providers/navigation-provider.tsx
'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useRef, useCallback } from 'react'

interface NavContext {
  stack: string[]
  push: (path: string) => void
  pop: () => void
  reset: (path?: string) => void
}

const NavigationContext = createContext<NavContext | null>(null)

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const stackRef = useRef<string[]>([])

  const push = useCallback((path: string) => {
    stackRef.current.push(path)
    router.push(path)
  }, [router])

  const pop = useCallback(() => {
    stackRef.current.pop()
    const previous = stackRef.current[stackRef.current.length - 1]
    router.push(previous || '/')
  }, [router])

  const reset = useCallback((path: string = '/') => {
    stackRef.current = [path]
    router.push(path)
  }, [router])

  return (
    <NavigationContext.Provider value={{ stack: stackRef.current, push, pop, reset }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useAppNavigation = () => {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useAppNavigation must be used inside NavigationProvider')
  return ctx
}
