'use client'

import Link from 'next/link'

import { tv } from 'tailwind-variants'
import { usePathname } from 'next/navigation'

import {
  BookBookmark,
  House,
  User,
} from '@phosphor-icons/react'

const listItem = tv({
  base: 'flex items-center justify-center w-12 h-12 rounded-2xl text-default hover:text-light hover:bg-default-hover lg:flex-none lg:justify-start lg:w-full lg:gap-2 lg:p-2 lg:px-3 lg:rounded-md lg:bg-gray-50',
  variants: {
    mobile: {
      false: 'hidden lg:flex',
    },
    active: {
      true: 'border border-default shadow-md bg-default/5 lg:border-none lg:text-light lg:bg-default',
    },
  },
  defaultVariants: {
    active: false,
  },
})

const links = [
  { name: 'Home', href: '/', icon: House, mobile: true },
  { name: 'Candidatos', href: '/candidatos', icon: User, mobile: true },
  { name: 'Concursos', href: '/concursos', icon: BookBookmark, mobile: true },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon

        const active = pathname === link.href

        return (
          <Link
            key={link.name}
            href={link.href}
            data-active={active}
            className={listItem({ active, mobile: link.mobile })}
          >
            <LinkIcon size={24} />
            <p className="hidden lg:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
