'use client'

import { tv } from "tailwind-variants"
import Link from "next/link"

import { useState } from "react"
import { Tab, TabList } from "react-tabs"
import { usePathname } from "next/navigation"

const tabItem = tv({
  base: 'rounded-t-lg',
  variants: {
    active: {
      true: 'font-bold text-amber-400 rounded-t-lg border-2 border-black border-b-white',
      false: 'border mt-1'
    }
  }
})


type TabNavigationPanelProps = {
  tabs: React.ReactNode[]
  hrefs: string[]
}

export default function TabNavigationPanel({
  tabs,
  hrefs
}: TabNavigationPanelProps) {
  const pathname = usePathname()

  return (
    <>
      <TabList className="flex flex-row align-bottom ml-2 -mb-0.5 rounded-lg z-10">
        {tabs.map((item, index) => {
          const href = hrefs[index]

          const active = pathname === href

          return (
            <Link
              key={index}
              href={hrefs[index] ?? ''}
              className={tabItem({ active })}
            >
              <Tab className="h-full w-full py-2 px-4">
                {item}
              </Tab>
            </Link>
          )
        })}
      </TabList>
    </>
  )
}
