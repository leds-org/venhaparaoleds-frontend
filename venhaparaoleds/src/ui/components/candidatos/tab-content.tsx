import { getCandidatosByConcursoCode } from "@/lib/data";

import type { Candidato } from "@/types/general";

type CandidatosContentProps = {
  query: string
}

export default async function CandidatosContent({ query }: CandidatosContentProps) {
  const contents = await getCandidatosByConcursoCode(query)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {contents.map(async (content, index) => {
        return (
          <CandidatoCard
            key={index}
            id={content.id}
            cpf={content.cpf}
            nome={content.nome}
            data_nascimento={content.data_nascimento}
            profissao={content.profissao}
          />
      )})}
    </div>
  )
}

type CandidatoCardProps = {
} & Candidato

export function CandidatoCard({
  cpf,
  nome,
  data_nascimento,
  profissao
}: CandidatoCardProps) {
  return (
    <div className="flex flex-row items-start gap-3 p-4 rounded-xl border shadow-md overflow-hidden">
      <div className="flex flex-col gap-1 leading-none">
        <h3 className="text-md font-semibold">{nome}</h3>
        <div className="flex flex-row flex-wrap gap-1 mb-1">
          {profissao.map((profession, index) => (
            <span key={index} className="-ml-1 mr-1 p-1 px-2 text-sm rounded-2xl bg-stone-200">
              {profession}
            </span>
          )
          )}
        </div>
        <span className="text-zinc-500">{cpf}</span>
        <div className="flex flex-col">
          <span className="text-sm text-zinc-500">Nascimento:</span>
          <span className="ml-0.5 text-zinc-500">{data_nascimento}</span>
        </div>
      </div>
    </div>
  )
}