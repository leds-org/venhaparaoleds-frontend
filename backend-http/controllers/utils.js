
export const stripCpf = (cpf) =>
    cpf.replaceAll(".", "").replace("-", "")
