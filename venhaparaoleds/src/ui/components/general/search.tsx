'use client'

import AsyncSelect from "react-select/async"

import { use } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useContentPromise } from "@/app/(home)/(slots)/context"


type Option = {
  value: string
  label: string
}

type SearchProps = {
  placeholder: string
  currentValue: string
  values: string[]
}

export default function Search({ placeholder, currentValue, values }: SearchProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const cValue: Option = { value: currentValue, label: currentValue }
  const options = values.map((value) => { return { value: value, label: value } })

  const filterOptions = (
    inputValues: string
  ) => {
    return options.filter((i) => i.label.toLowerCase().includes(inputValues.toLowerCase()))
  }

  const loadOptions = (
    inputValue: string,
    callback: (options: Option[]) => void
  ) => {
    setTimeout(() => {
      callback(filterOptions(inputValue))
    }, 500)
  }

  return (
    <div className="relative flex flex-1 h-12">
      <AsyncSelect
        key={placeholder}
        className="w-full"
        placeholder={placeholder}
        defaultValue={cValue}
        cacheOptions
        defaultOptions
        onChange={(newValue) => handleSearch(newValue?.value || '')}
        loadOptions={loadOptions}
        isClearable
      />
    </div>
  )
}
