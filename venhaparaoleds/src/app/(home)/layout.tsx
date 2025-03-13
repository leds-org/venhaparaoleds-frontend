import SideNav from "@/ui/components/general/sidenav"

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex h-screen flex-col lg:flex-row lg:overflow-hidden">
      <div className="top-0 w-full flex-none lg:w-28">
        <SideNav />
      </div>
      <div className="flex-grow m-2 p-6 pb-16 border border-slate-500 rounded-md lg:relative lg:m-2 lg:p-12 lg:overflow-y-auto lg:rounded-md lg:bg-slate-50 lg:shadow-lg">
        {children}
      </div>
    </div>
  )
}