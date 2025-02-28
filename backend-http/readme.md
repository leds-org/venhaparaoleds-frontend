exportando variaveis necessarias
```sh
export PGUSER=postgres
export PGPASSWORD=5040
export PGHOST=localhost
export PGPORT=5432 
```

populando banco de dados
```sh
npm run populate-db
```

rodando servidor
```sh
npm run dev
```

exemplos de requisicoes com curl
```sh
# listar todos os candidatos
curl localhost:8080/candidato
# listar candidatos por profissoes do concurso com determinado codigo
curl -X POST -H "Content-Type: application/json" -d '{"codigo": "61828450843"}' localhost:8080/concurso

# listar todos os concursos
curl localhost:8080/concurso
# listar concursos por profissos de candidato com determinado cpf
curl -X POST -H "Content-Type: application/json" -d '{"cpf": "182.845.084-34"}' localhost:8080/concurso
```