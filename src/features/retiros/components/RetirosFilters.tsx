import { MdSearch } from 'react-icons/md'

const INPUT_CLASS =
  'w-full sm:w-44 pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

const DATE_CLASS =
  'w-full sm:w-44 px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

interface RetirosFiltersProps {
  name: string
  document: string
  withdrawnBy: string
  withdrawalDate: string
  onNameChange: (v: string) => void
  onDocumentChange: (v: string) => void
  onWithdrawnByChange: (v: string) => void
  onWithdrawalDateChange: (v: string) => void
}

function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative">
      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </div>
  )
}

export function RetirosFilters({
  name, document, withdrawnBy, withdrawalDate,
  onNameChange, onDocumentChange, onWithdrawnByChange, onWithdrawalDateChange,
}: RetirosFiltersProps) {
  return (
    <>
      <SearchInput value={name} onChange={onNameChange} placeholder="Nombre..." />
      <SearchInput value={document} onChange={onDocumentChange} placeholder="Documento..." />
      <SearchInput value={withdrawnBy} onChange={onWithdrawnByChange} placeholder="Realizado por..." />
      <input
        type="date"
        value={withdrawalDate}
        onChange={(e) => onWithdrawalDateChange(e.target.value)}
        className={DATE_CLASS}
      />
    </>
  )
}
