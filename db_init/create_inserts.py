# Importando bibliotecas necessárias
import re
from datetime import datetime

# Caminho do arquivo
file_path = "./concursos.txt"

# Lendo o arquivo
with open(file_path, "r", encoding="utf-8") as file:
    lines = file.readlines()

# Estruturas para armazenar dados
candidatos = []
profissoes_set = {
    'assistente administrativo',
    'carpinteiro',
    'marceneiro',
    'professor de matemática',
    'analista de sistemas',
    'estagiário',
    'inspetor penitenciário',
}
candidato_profissao = []

# Expressão regular para extrair os dados
pattern = re.compile(r"^(.*) (\d+\/\d{4}) (\d+) \[(.*?)\]$")

i = 0
# Processando cada linha do arquivo
for line in lines:
    match = pattern.match(line.strip())
    if match:
        i += 1
        nome = match.group(1)
        data_nascimento = match.group(2)
        # data_nascimento = datetime.strptime(match.group(2), "%d/%m/%Y").strftime("%Y-%m-%d")
        cpf = match.group(3)
        profissoes = [p.strip() for p in match.group(4).split(",")]

        # Adicionando candidato
        candidatos.append((nome, cpf, data_nascimento))

        # Adicionando profissões únicas ao conjunto
        for profissao in profissoes:
            profissoes_set.add(profissao)
            candidato_profissao.append((i, profissao))

# Ordenar profissões para consistência
# profissoes_list = sorted(profissoes_set)

# Gerando SQL para candidatos
sql_candidatos = "INSERT INTO concurso (orgao, codigo, edital) VALUES\n" + ",\n".join(
    [f"('{nome}', '{cpf}', '{data_nascimento}')" for nome, cpf, data_nascimento in candidatos]
) + ";\n"

# Gerando SQL para profissões
sql_profissoes = "INSERT INTO profissao (desc_profissao) VALUES\n" + ",\n".join(
    [f"('{profissao}')" for profissao in profissoes_set]
) + ";\n"

# Criando dicionário de IDs fictícios para profissões
profissao_id_map = {profissao: idx + 1 for idx, profissao in enumerate(profissoes_set)}

# Gerando SQL para tabela de relacionamento candidato_profissao
sql_candidato_profissao = "INSERT INTO concurso_profissao (fk_concurso_id_concurso, fk_profissao_id_profissao) VALUES\n" + ",\n".join(
    [f"({cpf}, {profissao_id_map[profissao]})" for cpf, profissao in candidato_profissao]
) + ";\n"

# Concatenando todo o SQL
sql_final = sql_candidatos + "\n" + sql_profissoes + "\n" + sql_candidato_profissao

# Exibir o resultado
print('b')
with open('b.sql', 'w') as f:
    f.write(sql_final)
# nal[:2000]  # Exibir apenas os primeiros 2000 caracteres para visualização rápida

