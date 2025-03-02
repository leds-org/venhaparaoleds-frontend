<template>
  <div>
    <h1>Consulta de Concursos Públicos</h1>

    <button class="dark-mode-toggle" @click="toggleDarkMode">
    {{ isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode' }}
    </button>
    
    
    <div>
      <input v-model="cpfBusca" placeholder="Digite o CPF" />
      <button @click="buscarConcursos">Buscar Concursos</button>
    </div>

    
    <h2>Concursos compatíveis:</h2>
    <ul>
      <li v-for="concurso in concursosFiltrados" :key="concurso.codigo">
        {{ concurso.orgao }} - Edital {{ concurso.edital }} (Código: {{ concurso.codigo }})
      </li>
    </ul>

    
    <div>
      <input v-model="codigoBusca" placeholder="Digite o Código do Concurso" />
      <button @click="buscarCandidatos">Buscar Candidatos</button>
    </div>

   
    <h2>Candidatos compatíveis:</h2>
    <ul>
      <li v-for="candidato in candidatosFiltrados" :key="candidato.cpf">
        {{ candidato.nome }} - CPF: {{ candidato.cpf }} - Profissões: {{ candidato.profissoes.join(", ") }}
      </li>
    </ul>
  </div>

  <div class="foto">
    <img src="/client.svg" alt="Imagem Cliente">
  </div>

  

  
</template>

<script>
export default {
  data() {
    return {
      cpfBusca: "",
      codigoBusca: "",
      candidatos: [
        { nome: "Lindsey Craft", cpf: "182.845.084-34", profissoes: ["carpinteiro"] },
        { nome: "Jackie Dawson", cpf: "311.667.973-47", profissoes: ["marceneiro", "assistente administrativo"] },
        { nome: "Cory Mendoza", cpf: "565.512.353-92", profissoes: ["carpinteiro", "marceneiro"] }
      ],
      concursos: [
        { orgao: "SEDU", edital: "9/2016", codigo: "61828450843", vagas: ["analista de sistemas", "marceneiro"] },
        { orgao: "SEJUS", edital: "15/2017", codigo: "61828450843", vagas: ["carpinteiro", "professor de matemática", "assistente administrativo"] },
        { orgao: "SEJUS", edital: "17/2017", codigo: "95655123539", vagas: ["professor de matemática"] }
      ],
      concursosFiltrados: [],
      candidatosFiltrados: []
    };
  },
  methods: {
    buscarConcursos() {
      const candidato = this.candidatos.find(c => c.cpf === this.cpfBusca);
      if (candidato) {
        this.concursosFiltrados = this.concursos.filter(concurso =>
          concurso.vagas.some(vaga => candidato.profissoes.includes(vaga))
        );
      } else {
        this.concursosFiltrados = [];
      }
    },
    buscarCandidatos() {
      const concurso = this.concursos.find(c => c.codigo === this.codigoBusca);
      if (concurso) {
        this.candidatosFiltrados = this.candidatos.filter(candidato =>
          candidato.profissoes.some(profissao => concurso.vagas.includes(profissao))
        );
      } else {
        this.candidatosFiltrados = [];
      }
    },
        toggleDarkMode() {
            document.body.classList.toggle("dark-mode"); // Alterna a classe

            let button = document.querySelector(".dark-mode-toggle");
            if (document.body.classList.contains("dark-mode")) {
                button.innerHTML = "🌞 Light Mode"; // Altera o texto do botão
            } else {
                button.innerHTML = "🌙 Dark Mode";
            }
        }
  }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
    background-color: white;
    color: black;
    transition: background 0.3s, color 0.3s;
}
input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f8f9fa;
  margin: 5px auto;
  padding: 10px;
  border-radius: 5px;
  width: 50%;
}
.foto img {
    width: 300px; 
    height: auto; 
    margin-top: 40px;
}

.dark-mode {
    background-color: #121212;
    color: white;
}





/* Botão fixo no canto superior direito */
.dark-mode-toggle {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.dark-mode-toggle:hover {
    background-color: #0056b3;
}





</style>
