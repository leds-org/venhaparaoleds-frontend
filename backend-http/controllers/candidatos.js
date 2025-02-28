import pg from "pg"
const { Client } = pg
import { stripCpf } from "./utils.js"



const formatCpf = (cpf) => {
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) +
        "-" + cpf.slice(9)
}

const groupByProfissoes = (rows) => {
    let candidatos = Object.groupBy(rows, ({ id }) => id)
    candidatos = Object.values(candidatos).map((vals) => {
        const profissoes = vals.map(({ profissao }) => profissao)
        return {
            nome: vals[0].nome,
            nascimento: (new Date(vals[0].nascimento).toLocaleDateString("pt-BR")),
            cpf: formatCpf(vals[0].cpf),
            profissoes
        }
    })
    return candidatos
}


export const listCandidatos = async () => {
    const client = new Client()

    await client.connect()

    const queryRes = await client.query(
        `SELECT c.id, c.nome, c.nascimento, c.cpf, p.nome as profissao FROM candidatos c
        JOIN candidato_profissao cp on cp.id_candidato = c.id
        INNER JOIN profissoes p on p.id = cp.id_profissao`
    )

    await client.end()

    const candidatos = groupByProfissoes(queryRes.rows)

    return candidatos
}

export const getCandidatosByCodigo = async (codigo) => {
    let client = new Client()
    await client.connect()

    const concursoQueryRes = await client.query(
        "SELECT c.id FROM concursos c WHERE c.codigo = $1",
        [codigo]
    )
    await client.end()
    const concursoExists = concursoQueryRes.rowCount > 0
    if (!concursoExists) {
        return []
    }
    const concursoId = concursoQueryRes.rows[0].id

    client = new Client()
    await client.connect()

    const queryRes = await client.query(
        `SELECT c.id, c.nome, c.nascimento, c.cpf, p.nome as profissao FROM candidatos c
        JOIN candidato_profissao cp on cp.id_candidato = c.id
        INNER JOIN profissoes p on p.id = cp.id_profissao
        WHERE p.id IN (
            SELECT cop.id_profissao FROM concurso_profissao cop
            WHERE cop.id_concurso = $1
            UNION
            SELECT cap.id_profissao FROM candidato_profissao cap
            WHERE cap.id_candidato = c.id)
        `, [concursoId]
    )

    await client.end()

    const candidatos = groupByProfissoes(queryRes.rows)

    return candidatos
}

export const getProfissoesCandidato = async (cpf) => {
    const client = new Client()
    await client.connect()

    const queryRes = await client.query(
        `SELECT p.nome FROM candidatos c
        INNER JOIN candidato_profissao cp ON cp.id_candidato = c.id
        INNER JOIN profissoes p ON cp.id_profissao = p.id
        WHERE c.id = (SELECT c.id FROM candidatos c WHERE c.cpf = $1 LIMIT 1)
        `,
        [stripCpf(cpf)]
    )

    await client.end()

    const res = queryRes.rows.map(({ nome }) => nome)
    return res
}