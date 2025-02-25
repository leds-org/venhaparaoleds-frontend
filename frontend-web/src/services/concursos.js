import concursos from './concursos.temp.js'
import { candidatoPorCpf } from './candidatos.js'

export const concursoPorCodigo = (codigo) => new Promise((resolve) => {
    const res = concursos.find((concurso) => concurso.codigo === codigo)
    setTimeout(() => resolve(res), 100)
})

export const listarConcursos = () => new Promise((resolve) => {
    setTimeout(() => resolve(concursos), 100)
})

export const concursoPorCpf = (cpf) => new Promise(async (resolve) => {
    const candidato = await candidatoPorCpf(cpf)
    if (candidato === undefined) {
        resolve([])
        return
    }
    const profissoesCandidato = new Set(candidato.profissoes)
    const res = {
        concursos: concursos.filter((concurso) =>
            (new Set(concurso.profissoes)).intersection(profissoesCandidato).size > 0),
        profissoes: candidato.profissoes
    }
    setTimeout(() => resolve(res), 100)
})