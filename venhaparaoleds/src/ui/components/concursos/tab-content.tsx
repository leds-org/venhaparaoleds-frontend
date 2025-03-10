import { getConcursosByCandidatoCPF } from "@/lib/data";

import type { Concurso } from "@/types/general";

type ConcursosContentProps = {
  query: string
}

export default async function ConcursosContent({ query }: ConcursosContentProps) {
  const contents = await getConcursosByCandidatoCPF(query)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {contents.map(async (content, index) => {
        return (
          <CandidatoCard
            key={index}
            id={content.id}
            orgao={content.orgao}
            edital={content.edital}
            codigo={content.codigo}
            profissao={content.profissao}
          />
      )})}
    </div>
  )
}

type CandidatoCardProps = {
} & Concurso

export function CandidatoCard({
  orgao,
  edital,
  codigo,
  profissao
}: CandidatoCardProps) {
  return (
    <div className="flex flex-row items-start gap-3 p-4 rounded-xl border shadow-md overflow-hidden">
      <div className="flex flex-col gap-1 leading-none">
        <h3 className="text-md font-semibold">{orgao} - {edital}</h3>
        <div className="flex flex-row flex-wrap gap-1 mb-1">
          {profissao.map((profession, index) => (
            <span key={index} className="-ml-1 mr-1 p-1 px-2 text-sm rounded-2xl bg-stone-200">
              {profession}
            </span>
          )
          )}
        </div>
        <span className="text-zinc-500">{codigo}</span>
      </div>
    </div>
  )
}