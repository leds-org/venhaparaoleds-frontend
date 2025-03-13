export type Tab = {
    title: string
    content: React.ReactNode
}

export type Candidato = {
    id: number
    nome: string
    cpf: string
    data_nascimento: string
    profissao: string[]
}

export type CandidatoRaw = {
    id: number
    nome: string
    cpf: string
    data_nascimento: Date
    profissao: string
}

export type Profissao = {
    id: number
    desc_profissao: string
}

export type Concurso = {
    id: number
    orgao: string
    edital: string
    codigo: string
    profissao: string[]
}

export type ConcursoRaw = {
    id: number
    orgao: string
    edital: string
    codigo: string
    profissao: string
}
