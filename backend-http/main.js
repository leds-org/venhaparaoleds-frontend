import pg from "pg"
const { Client } = pg
import express from "express"

const formatCpf = (cpf) => {
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) +
        "-" + cpf.slice(9)
}

const app = express()
const port = 8080

app.get('/', async (req, res) => {
    const client = new Client()

    await client.connect()
    console.log("conectou")

    const val = (await client.query("SELECT NOW()")).rows[0]
    await client.end()
    res.send(val)
})

app.get("/candidato", async (req, res) => {
    const client = new Client()

    await client.connect()

    const queryRes = await client.query(
        "SELECT c.id, c.nome, c.nascimento, c.cpf, p.nome as profissao FROM candidatos c " +
        "JOIN candidato_profissao cp on cp.id_candidato = c.id " +
        "INNER JOIN profissoes p on p.id = cp.id_profissao",
    )

    await client.end()

    let candidatos = Object.groupBy(queryRes.rows, ({ id }) => id)
    candidatos = Object.values(candidatos).map((vals) => {
        const profissoes = vals.map(({ profissao }) => profissao)
        return {
            nome: vals[0].nome,
            nascimento: (new Date(vals[0].nascimento).toLocaleDateString("pt-BR")),
            cpf: formatCpf(vals[0].cpf),
            profissoes
        }
    })

    res.send(candidatos)
})

app.get('/candidato/:codigo', async (req, res) => {

    const { codigo } = req.params

    const client = new Client()

    await client.connect()

    const queryRes = await client.query(
        "SELECT c.id, c.nome, c.nascimento, c.cpf, p.nome as profissao FROM candidatos c " +
        "JOIN candidato_profissao cp on cp.id_candidato = c.id " +
        "INNER JOIN profissoes p on p.id = cp.id_profissao " +
        "WHERE p.id IN ( " +
            "SELECT cop.id_profissao FROM concurso_profissao cop " +
            "WHERE cop.id_concurso = (SELECT conc.id FROM concursos conc WHERE conc.codigo = $1 LIMIT 1) " +
            "UNION " +
            "SELECT cap.id_profissao FROM candidato_profissao CAP " +
            "WHERE cap.id_candidato = c.id)"
        ,[codigo]
    )

    await client.end()

    let candidatos = Object.groupBy(queryRes.rows, ({ id }) => id)
    candidatos = Object.values(candidatos).map((vals) => {
        const profissoes = vals.map(({ profissao }) => profissao)
        return {
            nome: vals[0].nome,
            nascimento: (new Date(vals[0].nascimento).toLocaleDateString("pt-BR")),
            cpf: formatCpf(vals[0].cpf),
            profissoes
        }
    })

    res.send(candidatos)
})

app.listen(port, () => {
    console.log(`iniciou na porta ${port}`)
})