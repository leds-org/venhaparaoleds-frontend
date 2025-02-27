populando banco de dados
```sh
PGUSER=postgres PGPASSWORD=5040 PGHOST=localhost PGPORT=5432 node utils/opulate-db.js
```

rodando servidor
```sh
npm run dev
```

exemplos de requisicoes com curl
```sh
curl localhost:8080/
curl localhost:8080/candidato
curl localhost:8080/candidato/56551235392
```