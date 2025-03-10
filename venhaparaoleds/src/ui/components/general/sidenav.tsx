import Link from 'next/link'

import Logo from '@/ui/components/general/logo'
import NavLinks from '@/ui/components/general/nav-links'

export default function SideNav() {
  return (
    <>
      <div className="flex flex-col h-full px-3 py-2 lg:px-2">
        <Link
          className="flex h-20 items-center justify-start mb-2 rounded-md bg-default p-4 lg:items-end lg:h-40"
          href="/"
        >
          <div className="w-full text-light lg:w-40">
            <Logo />
          </div>
        </Link>
        <section className="fixed left-0 bottom-0 flex flex-row grow items-center justify-between w-full h-14 px-5 space-x-2 bg-light z-10 lg:static lg:flex-col lg:px-0 lg:space-x-0 lg:space-y-2 lg:bg-transparent">
          {/* <NavLinks /> */}
          <div className="hidden w-full h-auto grow rounded-md lg:block"></div>
        </section>
      </div>
    </>
  )
}
