import { MdInfoOutline } from 'react-icons/md'
import { DOC_INFO, DOC_NOTES } from '../data/contratos.mock'

export function DocumentosInfo() {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 dark:border-sky-500/20 dark:bg-sky-500/10 p-5">
      <div className="flex items-center gap-2 mb-3">
        <MdInfoOutline className="h-5 w-5 text-sky-600 dark:text-sky-400" />
        <h4 className="text-sm font-semibold text-foreground">Información sobre documentos</h4>
      </div>
      <ul className="flex flex-col gap-1.5 text-sm text-foreground/70">
        {DOC_INFO.map((d) => (
          <li key={d.term}>
            <span className="font-semibold text-foreground">• {d.term}:</span> {d.text}
          </li>
        ))}
        {DOC_NOTES.map((n) => (
          <li key={n}>• {n}</li>
        ))}
      </ul>
    </div>
  )
}
