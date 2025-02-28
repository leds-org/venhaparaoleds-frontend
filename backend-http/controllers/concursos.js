import pg from "pg"
const { Client } = pg
import { stripCpf } from "./utils.js"



const groupByProfissoes = (rows) => {
    let concursos = Object.groupBy(rows, ({ id }) => id)
    concursos = Object.values(concursos).map((vals) => {
        const profissoes = vals.map(({ profissao }) => profissao)
        return {
            nome: vals[0].nome,
            edital: vals[0].edital,
            codigo: vals[0].codigo,
            profissoes
        }
    })
    return concursos
}

export const listConcursos = async () => {
    const client = new Client()

    await client.connect()

    const queryRes = await client.query(
        `SELECT
	        c.id,
	        c.nome_orgao AS nome,
            num_edital::text || '/' || ano_edital::text AS edital,
            c.codigo,
            p.nome AS profissao
        FROM concursos c
        JOIN concurso_profissao cp ON cp.id_concurso = c.id
        INNER JOIN profissoes p ON p.id = cp.id_profissao`
    )

    await client.end()

    const concursos = groupByProfissoes(queryRes.rows)
    return concursos
}

export const getConcursosByCpf = async (cpf) => {

    const client = new Client()
    await client.connect()

    const queryRes = await client.query(
        `SELECT
            c.id,
            c.nome_orgao AS nome,
            num_edital::text || '/' || ano_edital::text AS edital,
            c.codigo,
            p.nome AS profissao
        FROM concursos c
        JOIN concurso_profissao cp on cp.id_concurso = c.id
        INNER JOIN profissoes p on p.id = cp.id_profissao
        WHERE p.id IN (
            SELECT cap.id_profissao FROM candidato_profissao cap
            WHERE cap.id_candidato =
                (SELECT c.id FROM candidatos c WHERE c.cpf = $1 LIMIT 1))
        `,
        [stripCpf(cpf)]
    )

    await client.end()
    const concursos = groupByProfissoes(queryRes.rows)

    return concursos
}

export const getProfissoesConcurso = async (codigo) => {
    const client = new Client()
    await client.connect()

    const queryRes = await client.query(
        `SELECT p.nome FROM concursos c
        INNER JOIN concurso_profissao cp ON cp.id_concurso = c.id
        INNER JOIN profissoes p ON cp.id_profissao = p.id
        WHERE c.id = (SELECT c.id FROM concursos c WHERE c.codigo = $1 LIMIT 1)
        `,
        [codigo]
    )

    await client.end()

    const res = queryRes.rows.map(({ nome }) => nome)
    return res
}