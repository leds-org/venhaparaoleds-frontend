import { redirect } from "next/navigation"

import { getCandidatoByCPF } from "@/lib/data"

type CandidatoProps = {
  cpf: string
}

export default async function Candidato({ cpf }: CandidatoProps) {
  const candidato = await getCandidatoByCPF(cpf)

  if (!candidato) {
    redirect('/candidatos')
  }

  return (
    <div>
      
    </div>
  )
}