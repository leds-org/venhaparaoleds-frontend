import api from "./api"


export const listarConcursos = async () => {
    const response = await api.get("/concurso")
    return response.data
}

export const concursoPorCpf = async (cpf) => {
    const response = await api.post("concurso", {
        cpf
    })
    return response.data
}