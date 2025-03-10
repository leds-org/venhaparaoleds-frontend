export default function Layout({
  children,
  candidato
}: Readonly<{
  children: React.ReactNode
  candidato: React.ReactNode
}>) {
  return (
    <>
      {children}
      {candidato}
    </>
  )
}