import { unstable_noStore } from "next/cache"

import { sql } from "@/db/sql"

import type { Candidato, CandidatoRaw, Concurso, ConcursoRaw, Profissao } from "@/types/general"

const LOCALE = 'pt-BR'

export async function getProfissoes() {
  try {
    const profissoes = await sql`
      select id_profissao as id, desc_profissao from profissao;
    `

    return profissoes
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar todas as profissões.')
  }
}

export async function getCandidatos() {
  try {
    const candidatosRaw = await sql<CandidatoRaw[]>`
      select id_candidato as id, nome, cpf, data_nascimento, string_agg(p.desc_profissao, ', ') as profissao
      from candidato c
      left join candidato_profissao cp on (c.id_candidato = cp.fk_candidato_id_candidato)
      left join profissao p on (cp.fk_profissao_id_profissao = p.id_profissao)
      group by id_candidato
      order by id_candidato;
    `
    
    const candidatos: Candidato[] = candidatosRaw.map((c) => {
      return { id: c.id, nome: c.nome, cpf: c.cpf, data_nascimento: c.data_nascimento.toLocaleDateString(LOCALE), profissao: c.profissao.split(', ') }  })
    
    return candidatos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar todos os candidatos.')
  }
}

export async function getCandidatosByCPF(cpf: string) {
  try {
    const candidatos = await sql<Candidato[]>`
      select id_candidato as id, nome, cpf, data_nascimento from candidato where cpf ilike ${ '%' + cpf + '%'};
    `

    return candidatos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar candidatos por CPF.')
  }
}

export async function getCandidatoProfessionsByCPF(cpf: string) {
  try {
    const candidatos = await sql<Profissao[]>`
      select distinct id_profissao as id, desc_profissao
      from profissao p
      join candidato_profissao cp
        on (p.id_profissao = cp.fk_profissao_id_profissao)
      join candidato c
        on (cp.fk_candidato_id_candidato = c.id_candidato)
      where c.cpf ilike ${ '%' + cpf + '%' };
    `

    return candidatos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em pegar as profissões dos candidatos pelo CPF.')
  }
}

export async function getConcursosByCandidatoCPF(cpf: string) {
  unstable_noStore()

  try {
    const concursosRaw = await sql<ConcursoRaw[]>`
      select
          c.id_concurso,
          c.orgao,
          c.edital,
          c.codigo,
          string_agg(p.desc_profissao, ', ') as profissao
      from concurso c
      join concurso_profissao cp on c.id_concurso = cp.fk_concurso_id_concurso
      join profissao p on cp.fk_profissao_id_profissao = p.id_profissao
      where c.id_concurso in (
          select distinct cp2.fk_concurso_id_concurso
          from concurso_profissao cp2
          join candidato_profissao co on cp2.fk_profissao_id_profissao = co.fk_profissao_id_profissao
          join candidato can on co.fk_candidato_id_candidato = can.id_candidato
          where can.cpf ilike ${ '%' + cpf + '%' }
      )
      group by c.id_concurso
      order by c.id_concurso;
    `

    const concursos: Concurso[] = concursosRaw.map((c) => {
      return { id: c.id, orgao: c.orgao, edital: c.edital, codigo: c.codigo, profissao: c.profissao.split(', ') }  })
    
    return concursos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar os concursos pelo código.')
  }
}

export async function getCandidatosCPFs() {
  try {
    const candidatos = await sql<{ cpf: string }[]>`
      select cpf from candidato;
    `

    const cpfs = candidatos.map(candidato => candidato.cpf)

    return cpfs
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em pegar os CPFs dos candidatos.')
  }
}

export async function getConcursos(where = "") {
  try {
    const concursosRaw = await sql<ConcursoRaw[]>`
      select id_concurso as id, orgao, edital, codigo, string_agg(p.desc_profissao, ', ') as profissao
      from concurso c
      left join concurso_profissao cp on (c.id_concurso = cp.fk_concurso_id_concurso)
      left join profissao p on (cp.fk_profissao_id_profissao = p.id_profissao)
      where ${where}
      group by id_concurso;
    `

    const concursos: Concurso[] = concursosRaw.map((c) => { return { id: c.id, orgao: c.orgao, edital: c.edital, codigo: c.codigo, profissao: c.profissao.split(', ') }  })
    
    return concursos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar todos os concursos')
  }
}

export async function getConcursosByCode(code: string) {
  try {
    const concursos = await sql<Concurso[]>`
      select id_concurso as id, orgao, edital, codigo from concurso where codigo ilike ${ '%' + code + '%' };
    `

    return concursos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar concursos por código')
  }
}

export async function getConcursoProfessionsByCode(code: string) {
  try {
    const concursos = await sql<Profissao[]>`
      select distinct p.id_profissao as id, p.desc_profissao
      from concurso c
      join concurso_profissao cp
        on (c.id_concurso = cp.fk_concurso_id_concurso)
      join profissao p
        on (cp.fk_profissao_id_profissao = p.id_profissao)
      where c.codigo ilike ${ '%' + code + '%' }
      order by p.id_profissao;
    `

    return concursos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em pegar as profissões dos concursos')
  }
}

export async function getCandidatosByConcursoCode(code: string) {
  unstable_noStore()

  try {
    const candidatosRaw = await sql<CandidatoRaw[]>`
      select
          c.id_candidato,
          c.nome,
          c.cpf,
          c.data_nascimento,
          string_agg(p.desc_profissao, ', ') as profissao
      from candidato c
      join candidato_profissao cp on c.id_candidato = cp.fk_candidato_id_candidato
      join profissao p on cp.fk_profissao_id_profissao = p.id_profissao
      where c.id_candidato in (
          select distinct cp2.fk_candidato_id_candidato
          from candidato_profissao cp2
          join concurso_profissao co on cp2.fk_profissao_id_profissao = co.fk_profissao_id_profissao
          join concurso con on co.fk_concurso_id_concurso = con.id_concurso
          where con.codigo ilike ${ '%' + code + '%' }
      )
      group by c.id_candidato
      order by c.id_candidato;
    `

    const candidatos: Candidato[] = candidatosRaw.map((c) => {
      return { id: c.id, nome: c.nome, cpf: c.cpf, data_nascimento: c.data_nascimento.toLocaleDateString(LOCALE), profissao: c.profissao.split(', ') }  })
    
    return candidatos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em resgatar os concursos pelo código.')
  }
}

export async function getConcursosCodes() {
  try {
    const concursos = await sql<{ codigo: string }[]>`
      select codigo from concurso;
    `

    const codigos = concursos.map(concurso => concurso.codigo)

    return codigos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha em pegar os códigos dos concursos.')
  }
}
