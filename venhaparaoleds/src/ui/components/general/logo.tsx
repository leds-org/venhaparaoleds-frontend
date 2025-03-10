import Image from 'next/image'

import logo from '@public/assets/cards/logo/logo.png'

import { lusitana } from '@/ui/fonts'

export default function Logo() {
  const companyName = process.env.COMPANY_NAME?.split(' ') ?? ['']

  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-3 leading-none text-white lg:items-end`}
    >
      <Image
        className="w-16 h-16"
        src={logo}
        alt={`Logo da ${process.env.COMPANY_NAME}`}
      />
      <div className="hidden flex-row gap-1 text-2xl-nlh md:flex md:font-semibold lg:flex-col">
        {companyName.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </div>
  )
}
