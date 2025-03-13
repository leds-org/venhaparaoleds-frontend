criando a imagem
```sh
docker build -t frontend:latest .
```

rodando a imagem
```sh
docker run -d --rm --name frontend -p 127.0.0.1:80:80 frontend:latest
```

agora e possivel acessar a aplicacao no seu navegador por meio do endereco `localhost`.

para parar a execucao do servidor:
```sh
docker container stop frontend
```