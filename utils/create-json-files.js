import { readFile, writeFile } from 'node:fs/promises'

// deixar separado por enquanto porque vou utilizar em outro script
const csvlikeToArray = async (txtFilename, map) => {
    let data = await readFile(txtFilename, { encoding: "utf8" })
    data = data.split("\n")
        .slice(0, -1) // ultima linha em branco
        .map(map)
    return data
}

[
    {
        txtInput: "../concursos.txt",
        jsonOutput: "../frontend-web/src/services/concursos.json",
        jsonOutput: "../backend-http/utils/concursos.json",
        map: (row) => {
            const regex = /([A-Z]+)\ (\d{1,2}\/\d{4})\ (\d+)\ \[(.+)\]/
            let match = row.match(regex)
            const concurso = {
                orgao: match[1],
                edital: match[2],
                codigo: match[3],
                profissoes: match[4].split(", ")
            }
            return concurso
        }
    },
    {
        txtInput: "../candidatos.txt",
        jsonOutput: "../backend-http/utils/candidatos.json",
        map: (row) => {
            const regex = /([.\D]+)\ (\d{2}\/\d{2}\/\d{4})\ (\d{3}\.\d{3}\.\d{3}\-\d{2})\ \[(.+)\]/
            let match = row.match(regex)
            const candidato = {
                nome: match[1],
                dataNascimento: match[2],
                cpf: match[3],
                profissoes: match[4].split(", ")
            }
            return candidato
        }
    }
].forEach(async ({txtInput, jsonOutput, map}) => {
    const data = await csvlikeToArray(txtInput, map)
    writeFile(jsonOutput, JSON.stringify(data))
})
