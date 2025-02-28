import { readFile, writeFile } from 'node:fs/promises'



const stripCpf = (cpf) =>
      cpf.replaceAll(".", "").replace("-", "")

const datePTBRtoIntl = (date) => {
    const els = date.split("/")
    return els[2] + "/" + els[1] + "/" + els[0]
}

const dateIntlToPTBR = (date) =>
    (new Date(date)).toLocaleDateString("pt-BR")

const formatCpf = (cpf) => {
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) +
        "-" + cpf.slice(9)
}

const geraArrays = async () => {
    const profissoes = new Set()
    const concProf = []

    const concursos = (await readFile("../concursos.txt", { encoding: "utf8" }))
        .split("\n")
        .slice(0, -1) // ultima linha em branco
        .map((row) => {
            const regex = /([A-Z]+)\ (\d{1,2}\/\d{4})\ (\d+)\ \[(.+)\]/
            const match = row.match(regex)
            const edital = match[2].split("/")
            match[4].split(", ").forEach((prof) => {
                profissoes.add(prof)
                concProf.push([match[3], prof])
            })
            const concurso = [
                match[1],
                Number(edital[0]),
                Number(edital[1]),
                match[3],
            ]
            return concurso
        })

    const candProf = []
    // jsonOutput: "../backend-http/utils/candidatos.json",
    const candidatos = (await readFile("../candidatos.txt", { encoding: "utf8" }))
        .split("\n")
        .slice(0, -1) // ultima linha em branco
        .map((row) => {
            const regex = /([.\D]+)\ (\d{2}\/\d{2}\/\d{4})\ (\d{3}\.\d{3}\.\d{3}\-\d{2})\ \[(.+)\]/
            const match = row.match(regex)
            const cpf = stripCpf(match[3])
            const candidato = [
                match[1],
                datePTBRtoIntl(match[2]),
                cpf,
            ]
            match[4].split(", ").forEach((prof) => {
                profissoes.add(prof)
                candProf.push([cpf, prof])
            })
            return candidato
        })
    return [
        {
            outputFile: "../backend-http/utils/concursos.json",
            data: concursos
        },
        {
            outputFile: "../backend-http/utils/candidatos.json",
            data: candidatos
        },
        {
            outputFile: "../backend-http/utils/profissoes.json",
            data: Array.from(profissoes).map((p) => [p])
        },
        {
            outputFile: "../backend-http/utils/concurso-profissao.json",
            data: concProf
        },
        {
            outputFile: "../backend-http/utils/candidato-profissao.json",
            data: candProf
        },
    ]
}

(await geraArrays()).forEach(async ({ outputFile, data }) => {
    writeFile(
        outputFile,
        JSON.stringify(data)
    )
})
