import pg from "pg"
const { Client } = pg
import concursos from "./concursos.json" with { type: "json" }
import candidatos from "./candidatos.json" with { type: "json" }
import profissoes from "./profissoes.json" with { type: "json" }
import concProf from "./concurso-profissao.json" with { type: "json" }
import candProf from "./candidato-profissao.json" with { type: "json" }


// tentei inserir varias linhas por vez, mas nao consegui
const geraQueries = () => {

    const textConcProf = "INSERT INTO concurso_profissao(id_concurso, id_profissao) " +
        "SELECT c.id, p.id FROM concursos c, profissoes p " +
        "WHERE c.codigo = $1 AND p.nome = $2"

    const textCandProf = "INSERT INTO candidato_profissao(id_candidato, id_profissao) " +
        "SELECT c.id, p.id FROM candidatos c, profissoes p " +
        "WHERE c.cpf = $1 AND p.nome = $2"

    const textConcursos =
        "INSERT INTO concursos(nome_orgao, num_edital, ano_edital, codigo) VALUES " +
        "($1, $2, $3, $4)"

    const textCandidatos =
        "INSERT INTO candidatos(nome, nascimento, cpf) VALUES " +
        "($1, $2, $3)"

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
            values: profissoes
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
