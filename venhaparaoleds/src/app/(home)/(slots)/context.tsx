'use client'

import { createContext, useContext } from "react"

export const ContentContext = createContext<Promise<string[]> | null>(null)

export function ContentProvider({
  children,
  contentPromise,
}: {
  children: React.ReactNode
  contentPromise: Promise<string[]>
}) {
  return (
    <ContentContext.Provider value={contentPromise}>{children}</ContentContext.Provider> 
  )
}

export function useContentPromise() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContentContext must be used withing a ContentProvider')
  }
  return context
}
