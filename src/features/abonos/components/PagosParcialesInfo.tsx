import { MdLightbulbOutline } from 'react-icons/md'

export function PagosParcialesInfo() {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 dark:border-sky-500/20 dark:bg-sky-500/10 px-5 py-3.5">
      <p className="text-sm text-foreground/70 flex items-start gap-2">
        <MdLightbulbOutline className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
        <span>
          <span className="font-semibold text-foreground">Pagos parciales:</span> Se permite realizar abonos de
          interés y capital en múltiples pagos. Los pagos parciales se acumulan hasta completar el monto requerido.
        </span>
      </p>
    </div>
  )
}
