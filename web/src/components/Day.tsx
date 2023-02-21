type DayProps = {
  label: string
}

export function Day ({ label }:DayProps) {
  return (
    <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
      {label}
    </div>
  )
}