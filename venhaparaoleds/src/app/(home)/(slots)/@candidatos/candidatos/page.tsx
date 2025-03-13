import { Suspense } from "react"

import SearchCandidatos from "@/ui/components/general/search"
import CandidatosContent from "@/ui/components/candidatos/tab-content"

import { SkeletonContentCards } from "@/ui/components/skeletons/content-cards"

import { ensureString } from "@/lib/type"
import { getConcursoProfessionsByCode, getConcursosCodes, getProfissoes } from "@/lib/data"

import type { SearchParams } from "@/types/next"

type CandidatosProps = {
  searchParams: SearchParams
}

export default async function Candidatos({
  searchParams,
}: CandidatosProps) {
  const query = ensureString((await searchParams).query || '')
  const professions = query === '' ? await getProfissoes() : await getConcursoProfessionsByCode(query)

  const concursoCodes = await getConcursosCodes()

  const suspenseKey = `query=${query}`

  return (
    <>
      <div className="flex flex-col gap-3 mb-6">

        <SearchCandidatos placeholder="Código do Concurso..." currentValue={query} values={concursoCodes} />

        <div className="flex flex-row flex-wrap items-center gap-2 mx-2 my-1 w-full overflow-auto">
          {professions.map((item, index) => (
              <p key={index} className="p-2 text-sm text-center rounded-2xl bg-stone-200">
                {item.desc_profissao.toUpperCase()}
              </p>
            )
          )}
        </div>
      </div>

      <div>
        
        <Suspense key={suspenseKey} fallback=<SkeletonContentCards />>
          <CandidatosContent query={query} />
        </Suspense>
      </div>
    </>
  )
}
