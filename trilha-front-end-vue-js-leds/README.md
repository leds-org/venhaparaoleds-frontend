# Desafio trilha front-end com Vue.js

## Descrição do Projeto

Este projeto foi desenvolvido utilizando Vue.js 2 com Vite, com o objetivo de criar uma aplicação web para busca de candidatos e vagas de concursos públicos. A aplicação foi desenvolvida como parte do desafio front-end com Vue.js da Academy Leds, com o desafio de utilizar as melhores práticas e técnicas que a tecnologia escolhida tem a oferecer, neste caso a linguagem utilizada foi Vue.js na sua versão 2.

## Tecnologias Utilizadas

- **Vue.js 2:** Framework JavaScript para construção de interfaces de usuário.
- **Vite:** Ferramenta de build extremamente rápida para desenvolvimento web.
- **Vuex:** Biblioteca de gerenciamento de estado para aplicações Vue.js.
- **Vue Router:** Biblioteca para navegação em aplicações Vue.js de página única.
- **Axios:** Biblioteca para realizar requisições HTTP a APIs externas.

## Como Executar o Projeto

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/caioroberto-dev-web/trilha-front-end-vue-api.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd trilha-front-end-vue-js-leds
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5.  **Acesse a aplicação no seu navegador:**

    Abra o navegador e acesse `http://localhost:5173` (ou a porta exibida no terminal).

## Como Usar as Funcionalidades

A aplicação permite buscar candidatos e vagas de concursos públicos.

1.  **Busca de Concursos:**

    - Na página principal, utilize o campo de busca para inserir o termo de pesquisa (por exemplo, nome do órgão, edital, etc.).
    - A lista de concursos será filtrada e exibida com base no termo de busca.

2.  **Navegação:**

    - Utilize o menu de navegação para acessar diferentes seções da aplicação.

## Arquitetura da Solução

A aplicação foi desenvolvida seguindo a arquitetura de componentes do Vue.js 2.

- **Componentes:** A interface é dividida em componentes reutilizáveis para organizar a lógica e a apresentação.
- **Vuex:** O Vuex é utilizado para gerenciar o estado global da aplicação, facilitando a comunicação entre componentes e o gerenciamento de dados.
- **Vue Router:** O Vue Router é utilizado para gerenciar as rotas da aplicação, permitindo a navegação entre diferentes páginas sem recarregar a página.
- **Axios:** O Axios é utilizado para realizar requisições HTTP a APIs externas, buscando dados de concursos e candidatos.

## Considerações sobre a API

- A aplicação utiliza a API https://trilha-front-end-vue-api.onrender.com para buscar os dados de concursos e candidatos.
- A API fornece endpoints para buscar concursos por termo de busca, listar todos os concursos, etc.
- A documentação da API pode ser encontrada em https://caioroberto-dev-web.github.io/trilha-front-end-vue-api/.
- Os dados retornados pela API são no formato JSON.

## Diferencias implementados

Criar um serviço com o problema
Utilizar banco de dados
Implementar Clean Code
Implementar o padrão de programação da tecnologia escolhida

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
