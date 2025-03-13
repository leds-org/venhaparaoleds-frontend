import { Suspense } from "react"

import SearchConcursos from "@/ui/components/general/search"
import ConcursosContent from "@/ui/components/concursos/tab-content"

import { SkeletonContentCards } from "@/ui/components/skeletons/content-cards"

import { ensureString } from "@/lib/type"
import { getCandidatoProfessionsByCPF, getCandidatosCPFs, getProfissoes } from "@/lib/data"

import type { SearchParams } from "@/types/next"

type CandidatosProps = {
  searchParams: SearchParams
}

export default async function Concursos({
  searchParams,
}: CandidatosProps) {
  const query = ensureString((await searchParams).query || '')
  const professions = query === '' ? await getProfissoes() : await getCandidatoProfessionsByCPF(query)

  const candidatoCPFs = await getCandidatosCPFs()

  const suspenseKey = `query=${query}`

  return (
    <>
      <div className="flex flex-col gap-3 mb-6">

        <SearchConcursos placeholder="CPF do Candidato..." currentValue={query} values={candidatoCPFs} />

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
          <ConcursosContent query={query} />
        </Suspense>
      </div>
    </>
  )
}
