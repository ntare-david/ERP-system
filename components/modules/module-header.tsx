interface ModuleHeaderProps {
  title: string
  description: string
}

export function ModuleHeader({ title, description }: ModuleHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-slate-400 mt-1">{description}</p>
    </div>
  )
}
