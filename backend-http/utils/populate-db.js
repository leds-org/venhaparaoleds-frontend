import pg from "pg"
const { Client } = pg
import _concursos from "./concursos.json" with { type: "json" }
import _candidados from "./candidatos.json" with { type: "json" }


const dateConv = (str) => {
    const splitStr = str.split("/")
    const year = splitStr[2]
    const month = splitStr[1]
    const day = splitStr[0]
    return year + "/" + month + "/" + day
}

// tentei inserir varias linhas por vez, mas nao consegui
const geraQueries = () => {
    const profissoes = new Set()

    const textConcProf = "INSERT INTO concurso_profissao(id_concurso, id_profissao) " +
        "SELECT c.id, p.id FROM concursos c, profissoes p " +
        "WHERE c.codigo = $1 AND p.nome = $2"
    const concProf = []

    const textCandProf = "INSERT INTO candidato_profissao(id_candidato, id_profissao) " +
        "SELECT c.id, p.id FROM candidatos c, profissoes p " +
        "WHERE c.cpf = $1 AND p.nome = $2"
    const candProf = []

    const textConcursos =
        "INSERT INTO concursos(nome_orgao, num_edital, ano_edital, codigo) VALUES " +
        "($1, $2, $3, $4)"

    const concursos = []
    _concursos.forEach((conc) => {
        concursos.push([
            conc.orgao,
            ...conc.edital.split("/").map(i => Number(i)),
            conc.codigo
        ])
        conc.profissoes.forEach((prof) => {
            profissoes.add(prof)
            concProf.push([conc.codigo, prof])
        })
    })


    const textCandidatos =
        "INSERT INTO candidatos(nome, nascimento, cpf) VALUES " +
        "($1, $2, $3)"
    const candidatos = []
    _candidados.forEach((cand) => {
        const cpf = cand.cpf.replaceAll(".", "").replace("-", "")
        candidatos.push([
            cand.nome,
            dateConv(cand.dataNascimento),
            cpf
        ])
        cand.profissoes.forEach((prof) => {
            profissoes.add(prof)
            candProf.push([cpf, prof])
        })
    })


    const textProfissoes = "INSERT INTO profissoes(nome) VALUES ($1)"

    return [
        {
            text: textCandidatos,
            values: candidatos
        },
        {
            text: textConcursos,
            values: concursos
        },
        {
            text: textProfissoes,
            values: Array.from(profissoes).map((p) => [p])
        },
        {
            text: textConcProf,
            values: concProf
        },
        {
            text: textCandProf,
            values: candProf
        }
    ]
}

const dados = geraQueries()
for (const dado of dados) {
    for (const val of dado.values) {
        const client = new Client()
        await client.connect()
        const res = await client.query(dado.text, val)
        await client.end()
    }
}
