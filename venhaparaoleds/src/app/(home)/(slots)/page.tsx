export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-xl mb-7">Esse é a minha solução para o Desafio Frontend - LEDS</h1>

      <h2 className="text-lg">Basta escolher a aba:</h2>
      <div className="flex flex-col ml-4">
        <p><span className="font-bold">Concursos:</span> Lista os concursos baseado no CPF do candidato</p>
        <p><span className="font-bold">Candidatos:</span> Lista os candidatos baseado no código do concurso</p>
      </div>
    </div>
  )
}
