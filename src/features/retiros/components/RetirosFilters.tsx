import { MdSearch } from 'react-icons/md'

const INPUT_CLASS =
  'w-full sm:w-48 pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

interface RetirosFiltersProps {
  name: string
  document: string
  onNameChange: (v: string) => void
  onDocumentChange: (v: string) => void
}

export function RetirosFilters({ name, document, onNameChange, onDocumentChange }: RetirosFiltersProps) {
  return (
    <>
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nombre..."
          className={INPUT_CLASS}
        />
      </div>
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
        <input
          type="text"
          value={document}
          onChange={(e) => onDocumentChange(e.target.value)}
          placeholder="Documento..."
          className={INPUT_CLASS}
        />
      </div>
    </>
  )
}
