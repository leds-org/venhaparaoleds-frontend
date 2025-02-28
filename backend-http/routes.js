import {
    listCandidatos,
    getCandidatosByCodigo,
    getProfissoesCandidato
} from "./controllers/candidatos.js"

import {
    listConcursos,
    getConcursosByCpf,
    getProfissoesConcurso
} from "./controllers/concursos.js"



export default function(app) {
    /* candidatos */
    app.get("/candidato", async (req, res) => {
        const candidatos = await listCandidatos()
        res.send(candidatos)
    })

    app.post("/candidato", async (req, res) => {
        if (req.body.codigo !== undefined) {
            // retornar profissoes do concurso
            const candidatos = await getCandidatosByCodigo(req.body.codigo)
            const profissoesConcurso = await getProfissoesConcurso(req.body.codigo)
            res.send({
                candidatos,
                profissoesConcurso
            })
            return
        }
        res.sendStatus(400)
    })

    /* app.post("/candidato/profissao", async (req, res) => {
        if (req.body.cpf !== undefined) {
            const candidatos = await getProfissoesCandidato(req.body.cpf)
            res.send(candidatos)
            return
        }
        res.sendStatus(400)
    }) */

    /* concursos */
    app.get("/concurso", async (req, res) => {
        const candidatos = await listConcursos()
        res.send(candidatos)
    })

    app.post("/concurso", async (req, res) => {
        if (req.body.cpf !== undefined) {
            const concursos = await getConcursosByCpf(req.body.cpf)
            const profissoesCandidato = await getProfissoesCandidato(req.body.cpf)
            res.send({
                concursos,
                profissoesCandidato
            })
            return
        }
        res.sendStatus(400)
    })
}