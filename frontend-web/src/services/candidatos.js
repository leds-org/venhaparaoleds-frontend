import api from "./api"



export const listarCandidatos = async () => {
    const response = await api.get("/candidato")
    return response.data
}

export const candidatoPorCodigo = async (codigo) => {
    const response = await api.post("/candidato", {
        codigo
    })
    return response.data
}