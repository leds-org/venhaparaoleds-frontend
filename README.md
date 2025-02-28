# Introdução
Nesta solução para o Desafio Frontend do LEDS, três componentes funcionam em conjunto para fornecer a aplicação, um SGBD, um servidor HTTP *backend* e um servidor HTTP *frontend* para a *web.* Nas seções a seguir eles são explicados.

# Componentes
Os componentes são criados a partir de *containers* Docker, são configurados por meio do arquivo `compose.yaml` e executados por meio do programa Docker Compose. A figura abaixo mostra a arquitetura do sistema. O *container* "backend-db" está na rede "private" junto com o *container* "backend". O "backend" também está na rede "public," junto do *container* "frontend." Essa configuração tanto isola o "backend-db" de qualquer rede externa quanto permite que "backend" se comunique com o "backend-db" e com redes externas, permitindo que o banco de dados seja acessado de maneira que preserve sua integridade estrutural e segurança de suas informações. O "backend" é exposto por meio da porta 8080 e o frontend por meio da porta 80.

```
        +--NETWORK--private----+
        |                      |
        |                      |
        |   ..CONTAINER.....   |
        |   .              .   |
        |   .  backend-db  .   |
        |   .              .   |
        |   .              .   |
        |   .              .   |
        |   ................   |
        |          ^           |
    +---+----------#-----------++--NETWORK--public----------+
    |   |      port 5432       |                            |
    |   |          #           |                            |
    |   |          V           |                            |
    |   |   ..CONTAINER.....   |        ..CONTAINER.....    |
    |   |   .              .   |        .              .    |
    |   |   .  backend     .   |        .  frontend    .    |
    |   |   .              .   |        .              .    |
    |   |   .              .   |        .              .    |
    |   |   .              .   |        .              .    |
    |   |   ................   |        ................    |
    |   |          ^           |                ^           |
    |   +-----------##---------+              ##            |
    |                 ##                    ##              |
    +-------------------##----------------##----------------+
                          port 8080    port 80
                           ##          ##
                             ##      ##
                               V    V
                          ==BROWSER=======
                          =              =
                          =  Firefox     =
                          =              =
                          =              =
                          =              =
                          ================
```

O bloco abaixo mostra o conteúdo do arquivo de configuração da aplicação, "compose.yaml". Em seguida, cada componente é detalhado.

```yaml
name: concoursera

services:
  backend-db:
    image: backend-db
    hostname: backend-db
    networks:
      - private
    environment:
      - POSTGRES_PASSWORD=5040

  backend:
    image: backend
    ports:
      - '8080:8080'
    hostname: backend
    networks:
      - public
      - private
    environment:
      - PGUSER=postgres
      - PGPASSWORD=5040
      - PGHOST=backend-db
      - PGPORT=5432
    depends_on:
      - backend-db
    restart: on-failure

  frontend:
    image: frontend
    ports:
      - '80:80'
    depends_on:
      - backend
    networks:
      - public
  
networks:
  public:
  private:
```

## backend-db
Este *container* utiliza a imagem Docker oficial do SGBD Postgres na versão 17.4. O Postgres é um banco de dados relacional com suporte para a linguagem SQL altamente robusto, confiável e utilizado em diversas aplicações. Abaixo é mostrado o diagrama de entidade e relacionamento da aplicação. As tabelas "candidato_profissao" e "concurso_profissao" permitem que qualquer candidato exerça nenhuma ou mais profissões e que qualquer concurso exija nenhuma ou mais profissões. Mais detalhes sobre os tipos de cada coluna de cada tabela podem ser acessados pelo arquivo "backend-db/create-tables.sql". No próximo componente, *queries* de seleção de entidades serão discutidas.

```
                 +----------+                +----------+
                 |candidatos|                |concursos |
                 +----------+                +----------+
                 |nome      |                |nome_orgao|
                 |nascimento|                |num_edital|
                 |cpf       |                |ano_edital|
                 +----+-----+                |codigo    |
                      1                      +----+-----+
                      |                           1
                      |                           |
                      |                           |
                      |                           |
                      |                           |
                      |                           |
                     0..n                        0..n
                 +----+-------+              +----+-------+
                 |candidato_  |              |concurso_   |
                 |profissao   |              |profissao   |
                 +------------|              +------------+
                 |id_candidato|              |id_concurso |
                 |id_profissao|              |id_profissao|
                 +------------+              +------------+
                         0..n                     0..n
                           \-                     /-
                             \-                 /-
                               \-              /
                                 \-          /-
                                   \-      /-
                                     1    1
                                  +----------+
                                  |profissoes|
                                  +----------+
                                  |id        |
                                  |nome      |
                                  +----------+
```

## backend
Este componente consiste de um servidor HTTP implementado com Node.js e a biblioteca Express.js. O Node.js permite criar programas em JavaScript, a linguagem de programas *frontend* web, além de ser um *runtime* rápido e testado em campo. O Express.js é fácil de utilizar e muito utilizado no meio Node.js. A conexão com o Postgres do componente anterior é feita por meio da biblioteca node-postgres, que é atualizada e tem uso simples.

Este servidor está estruturado da seguinte forma: o ponto de partida do programa, o arquivo "backend-http/main.js", realiza suas configurações e registra as rotas a partir do arquivo "backend-http/routes.js". Cada rota, registrada no segundo arquivo, processa as requisições recebidas, chama as funções de processamento apropriadas, monta e envia a resposta. Para melhor organizar o código fonte e separar as preocupações de cada parte do programa, as funções de processamento são mantidas em arquivos na pasta "backend-http/controllers", um arquivo para concursos e outro para candidatos. Estes arquivos realizam *queries* ao banco de dados e processam os dados recebidos.

### Selecionando candidatos que se encaixam em um determinado concurso
A lógica utilizada para decidir se um candidato se encaixa no perfil de um concurso é a seguinte: Se o candidato exerce pelo menos uma das profissões que o concurso exige, ele se encaixa. Caso contrário, ele não se encaixa. Para realizar uma *query* que seleciona candidatos que se encaixam em um concurso, primeiro são unidas as tabelas "candidatos", "candidato_profissao" e "profissoes:"

```sql
SELECT c.id, c.nome, c.nascimento, c.cpf, p.nome as profissao FROM candidatos c
JOIN candidato_profissao cp on cp.id_candidato = c.id
INNER JOIN profissoes p on p.id = cp.id_profissao
```

Para cada candidato selecionado, n linhas serão geradas na tabela resultante, n sendo o número de profissões que o candidato exerce. Depois, os candidatos são filtrados de acordo com as profissões exigidas pelo concurso com código especificado:

```sql
WHERE p.id IN (
    SELECT cop.id_profissao FROM concurso_profissao cop
    WHERE cop.id_concurso =
        (SELECT c.id FROM concursos c WHERE c.codigo = $1 LIMIT 1))
```
O trecho `SELECT ... FROM concursos ...` seleciona o número de identificação do concurso que possui o código especificado. O código poderia ter sido utilizado diretamente como chave primária da tabela de concursos, mas foi escolhido nesta aplicação gerar uma identificação à parte para protegê-la de possíveis mudanças em seus requerimentos que dificultariam sua manutenção e extensibilidade, como, por exemplo, a alteração no formato do código ou um código representar mais de um concurso. Por fim, o trecho ```SELECT ... FROM concurso_profissao``` seleciona as profissões do concurso em questão.

### Preenchendo o banco de dados
O *container* do componente, criado a partir da imagem oficial do Node.js na versão 23.9, preenche, ao ser inicializado, o banco de dados por meio do *script* "utils/populate-db.js".

## frontend
Esta parte é feita com as *frameworks* Vue e Vuetify. O Vue possui uma sintaxe simples, imperativa e reatividade à mudanças nos dados da aplicação automatizada, o que torna fácil a criação de softwares. O Vuetify disponibiliza diversos elementos de interface prontos com diversos recursos e funcionalidades, salvando o programador do trabalho da elaboração dos mesmos. Por estes motivos essas duas tecnologias foram escolhidas. A interface possui duas páginas, uma para candidatos e outra para concursos. Ambas possuem um campo de entrada de texto, onde o código de concurso ou CPF pode ser inserido para filtrar candidatos ou concursos que se encaixam naquele perfil. A interface é mostrada na imagem a seguir.

![Página de candidatos](/assets/images/pagina_candidatos.png "Página de candidatos")

### Layout
Um mesmo *layout* é utilizado para ambas as páginas. Ele cria dinamicamente guias com base nas rotas de navegação da aplicação, facilitando futuras alterações, remoções ou adições.

```vue
<template>
    <v-tabs
        :model-value="$route.name"
        @update:model-value="updateRoute"
    >
        <v-tab v-for="route in routes"
          :key="route.name"
          :value="route.name"
        >
        {{ route.meta.tabTitle }}
        </v-tab>
    </v-tabs>
</template>
<script setup>
const updateRoute = (newRouteName) => {
  router.push({ name: newRouteName })
}
</script>
```

### Conexão com backend
A conexão é feita por meio da biblioteca Axios, com um arquivo de serviço para candidatos e outro para concursos. Esta biblioteca junto de uma *store* Pinia permitem comunicar aos elementos de interface que uma requisição está sendo feita, facilitando o acesso à essa informação e a sinalização ao usuário que o processo está ocorrendo.

```javascript
// codigo do arquivo frontend-web/src/services/api.js
import axios from "axios"
import { useAppStore } from "@/stores/app"

const instance = axios.create({
    baseURL: "http://localhost:8080/"
})

instance.interceptors.request.use((config) => {
    const app = useAppStore()
    app.loading = true
    return config
})

instance.interceptors.response.use((response) => {
    const app = useAppStore()
    app.loading = false
    return response
})

export default instance
```

```vue
<template>
    <v-data-table
        :headers="headers"
        :items="candidatos"
        height="calc(100vh - 264px)"
        :loading="app.loading"
    />
</template>
<script setup>
import { useAppStore } from "@/stores/app"
const app = useAppStore()
</script>
```
### Fornecendo o frontend
O programa criado com Vue é distribuido pelo servidor HTTP nginx por meio de uma *container* criado a partir da imagem oficial do programa na versão 1.27.4. O nginx é um programa rápido e moderno, apropriado para aplicações com muitos acessos simultâneos.

# Executando a aplicação
Para executar corretamente a aplicação, certifique-se de estar em um ambiente Linux (nativo, WSL ou outro tipo de virtualização) com os seguintes programas nas respectivas versões ou versões próximas:

```sh
$ docker --version
Docker version 28.0.0, build f9ced58158
$ docker compose version
Docker Compose version 2.33.1
$ node --version
v23.8.0
$ sudo --version
Sudo version 1.9.16p2
Sudoers policy plugin version 1.9.16p2
Sudoers file grammar version 50
Sudoers I/O plugin version 1.9.16p2
Sudoers audit plugin version 1.9.16p2
```

Em seguida, execute comando:

```sh
$ chmod u+x build.sh && ./build.sh
```

Finalmente, execute:

```sh
$ sudo docker compose up
```

O processo de inserção dos dados inciais no banco de dados pode demorar alguns minutos. Após a mensagem "iniciou na porta 8080" ser exibida no terminal, a aplicação poderá ser acessada pelo navegador no endereço "http://localhost".

Para parar a aplicação, execute o comando:
```sh
$ sudo docker compose down
```
