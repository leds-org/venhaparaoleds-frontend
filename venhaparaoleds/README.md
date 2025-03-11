# Desafio LEDS - Frontend usando Next.js 15

Este repositório contém a solução desenvolvida para listar concursos públicos e candidatos elegíveis com base nos dados fornecidos.  

## Índice

1. [Tecnologias utilizadas](#1-tecnologias-utilizadas)
2. [Estrutura do Projeto](#2-estrutura-do-projeto)
3. [Banco de Dados](#3-banco-de-dados)
4. [Passos para Rodar Localmente](#4-passos-para-rodar-localmente)
5. [Passos para Abrir Exemplo em Produção](#5-passos-para-abrir-exemplo-em-produção)
6. [Notas Finais](#6-notas-finais)

## 1. Tecnologias utilizadas

- **Next.js 15**: Framework JavaScript para construção da interface de usuário
- **React 19**: Tecnologia utilizada pelo Next.js para construção das páginas
- **TailwindCSS**: Ferramente para estilização de componentes HTML
- **Postgres**: Biblioteca utilizada para se comunicar com o Banco de Dados Postgres do avien

O sistema permite:  

- **Buscar concursos públicos compatíveis** com o perfil do candidato, tomando como base seu CPF.  
- **Buscar candidatos compatíveis** com um concurso público, tomando como base o código do concurso.  

## 2. Estrutura do Projeto  

O projeto utiliza o Next.js para criação da interface com o usuário, utilizando o *App router*.
Para a conexão com o banco de dados, foram utilizadas funções assíncronas nos *Server Components*, que utilizam a biblioteca *postgres* para enviar requisições para o banco de dados presente na plataforma **avien**.

## 3. Banco de dados

Possui **3 entidades** (CANDIDATO, CONCURSO, PROFISSAO) e **2 relacionamentos** (CANDIDATO_PROFISSAO, CONCURSO_PROFISSAO). 

Utilizando essas entidades e relacionamentos, foram filtrados os candidatos que se encaixam em uma vaga procurando pelo *id_candidato* que possui uma profissão que também pertence ao curso cujo código foi pesquisado.

```sql
select
    c.id_candidato,
    c.nome,
    c.cpf,
    c.data_nascimento,
    string_agg(p.desc_profissao, ', ') as profissao
from candidato c
join candidato_profissao cp on c.id_candidato = cp.fk_candidato_id_candidato
join profissao p on cp.fk_profissao_id_profissao = p.id_profissao
where c.id_candidato in (
    select distinct cp2.fk_candidato_id_candidato
    from candidato_profissao cp2
    join concurso_profissao co on cp2.fk_profissao_id_profissao = co.fk_profissao_id_profissao
    join concurso con on co.fk_concurso_id_concurso = con.id_concurso
    where con.codigo ilike ${ '%' + code + '%' }
)
group by c.id_candidato
order by c.id_candidato;
```

Com essa mesma lógica, foram filtrados os concursos que se encaixam nas vagas procuradas pelo CPF do candidato ao invés do código do concurso.

```sql
select
    c.id_concurso,
    c.orgao,
    c.edital,
    c.codigo,
    string_agg(p.desc_profissao, ', ') as profissao
from concurso c
join concurso_profissao cp on c.id_concurso = cp.fk_concurso_id_concurso
join profissao p on cp.fk_profissao_id_profissao = p.id_profissao
where c.id_concurso in (
    select distinct cp2.fk_concurso_id_concurso
    from concurso_profissao cp2
    join candidato_profissao co on cp2.fk_profissao_id_profissao = co.fk_profissao_id_profissao
    join candidato can on co.fk_candidato_id_candidato = can.id_candidato
    where can.cpf ilike ${ '%' + cpf + '%' }
)
group by c.id_concurso
order by c.id_concurso;
```

Além disso, em ambas procuras foi utilizada uma função agregadora de strings para unir todas as profissões encontradas para aquele concurso ou candidato em uma única linha no formato "profissão_1, profissão_2, ...". Essa *string*, é então separada em uma lista de strings (["profissão_1", "profissão_2", "..."]) utilizando o método `String.split()` do JavaScript.

## 4. Passos para Rodar Localmente

1. Clone o repositório:
```sh
git clone https://github.com/RiffXS/venhaparaoleds-frontend.git
```

2. Entre no diretório do projeto:
```sh
cd venhaparaoleds
```

3. Instale as dependências:
```sh
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

4. Crie o arquivo `.env` com a variável necessária para acessar bando de dados externo:
```
DB_URL='postgres://avnadmin:AVNS_l62HFzQCqddDcr93bpQ@pg-13-teste-420.i.aivencloud.com:16227/defaultdb?sslmode=require'
```

5. Execute o servidor:
```sh
npm run start
# ou
yarn start
# ou
pnpm start
# ou
bun start
```

7. Acesse o servidor local em `localhost:3000` ou na URL apresentada no terminal.

# 5. Passos para Abrir Exemplo em Produção

Basta acessar o link: https://venhaparaoleds-frontend.vercel.app/(https://venhaparaoleds-frontend.vercel.app/)

# 6. Diferenciais Implementados

- Utilizar banco de dados
- Implementar o padrão de programação da tecnologia escolhida
