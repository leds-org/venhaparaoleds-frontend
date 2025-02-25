import candidatos from './candidatos.temp.js'
import { concursoPorCodigo } from './concursos.js'

export const candidatoPorCpf = (cpf) => new Promise((resolve) => {
    const res = candidatos.find((candidato) => candidato.cpf === cpf)
    setTimeout(() => resolve(res), 100)
})

export const listarCandidatos = () => new Promise((resolve) => {
    setTimeout(() => resolve(candidatos), 100)
})

export const candidatoPorCodigo = (codigo) => new Promise(async (resolve) => {
    const concurso = await concursoPorCodigo(codigo)
    if (concurso === undefined) {
        resolve([])
        return
    }
    const profissoesConcurso = new Set(concurso.profissoes)
    const res = {
        candidatos: candidatos.filter((candidato) =>
            (new Set(candidato.profissoes)).intersection(profissoesConcurso).size > 0),
        profissoes: concurso.profissoes
    }
    setTimeout(() => resolve(res), 100)
})