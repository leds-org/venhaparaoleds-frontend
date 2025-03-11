import TabNavigationPanel from "@/ui/components/general/tabnav"

import { Route } from "@/ui/components/general/route"

export default async function HomeLayout({
  children,
  candidatos,
  concursos,
}: Readonly<{
  children: React.ReactNode
  candidatos: React.ReactNode
  concursos: React.ReactNode
}>) {
  return (
    <div className="flex flex-col">
      <TabNavigationPanel
        tabs={[<span key='home'>Home</span>, <span key='concursos'>Concursos</span>, <span key='candidatos'>Candidatos</span>]}
        hrefs={['/', '/concursos', '/candidatos']}
      />
      <div className="flex flex-col h-full w-full rounded-lg border-2 border-black p-4">
        <Route path="/" component={children} />
        <Route path="/concursos" component={concursos} />
        <Route path="/candidatos" component={candidatos} />
      </div>
    </div>
  )
}
