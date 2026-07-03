import { useMemo, useState } from 'react'
import { Button } from '@heroui/react'
import { MdAdd, MdDescription } from 'react-icons/md'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { RetirosStatsCards } from '../components/RetirosStatsCards'
import { RetirosTable } from '../components/RetirosTable'
import { RetirosFilters } from '../components/RetirosFilters'
import { RetiroForm } from '../components/RetiroForm'
import { useWithdrawals, useCreateRetiro } from '../hooks/useRetiros'
import type { RetiroFormValues } from '../schemas/retiro.schema'

export function RetirosPage() {
  const { open, close } = useModal()
  const createRetiro = useCreateRetiro()

  const [nameInput, setNameInput] = useState('')
  const [documentInput, setDocumentInput] = useState('')
  const [withdrawnByInput, setWithdrawnByInput] = useState('')
  const [withdrawalDate, setWithdrawalDate] = useState('')

  const name = useDebounce(nameInput, 400)
  const document = useDebounce(documentInput, 400)
  const withdrawnBy = useDebounce(withdrawnByInput, 400)

  const params = useMemo(
    () => ({
      ...(name ? { name } : {}),
      ...(document ? { document } : {}),
      ...(withdrawnBy ? { withdrawn_by: withdrawnBy } : {}),
      ...(withdrawalDate ? { withdrawal_date: withdrawalDate } : {}),
    }),
    [name, document, withdrawnBy, withdrawalDate],
  )

  const { data, isLoading, isFetching } = useWithdrawals(params)

  const retiros = data?.data ?? []
  const totals = data?.totals ?? { total_amount: '0', available_amount: '0', recorded_amount: '0' }
  const month = data?.month ?? ''

  const handleCreate = async (formData: RetiroFormValues) => {
    alert.loading('Registrando retiro...')
    try {
      const { data: res } = await createRetiro.mutateAsync(formData)
      alert.closeLoading()
      close()
      alert.toast(res.message || 'Retiro registrado correctamente')
    } catch {
      alert.closeLoading()
      alert.toast('Error al registrar el retiro', 'error')
    }
  }

  const openCreate = () => {
    open({
      title: 'Registrar Retiro',
      size: 'md',
      content: <RetiroForm onSuccess={handleCreate} onCancel={close} isSubmitting={createRetiro.isPending} />,
    })
  }

  const filters = (
    <RetirosFilters
      name={nameInput}
      document={documentInput}
      withdrawnBy={withdrawnByInput}
      withdrawalDate={withdrawalDate}
      onNameChange={setNameInput}
      onDocumentChange={setDocumentInput}
      onWithdrawnByChange={setWithdrawnByInput}
      onWithdrawalDateChange={setWithdrawalDate}
    />
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Retiros</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Registro de retiros de dinero y desembolsos</p>
        </div>
        <Button variant="primary" className="gap-1.5 bg-emerald-600! hover:bg-emerald-700!" onPress={openCreate}>
          <MdAdd className="h-4 w-4" />
          Registrar Retiro
        </Button>
      </div>

      <RetirosStatsCards totals={totals} month={month} />

      {/* Historial */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 bg-slate-700 dark:bg-slate-800 px-5 py-3.5 text-white">
          <MdDescription className="h-5 w-5" />
          <h2 className="text-sm font-semibold">Historial de Retiros</h2>
        </div>

        <div className="p-5">
          <RetirosTable retiros={retiros} isLoading={isLoading || isFetching} filters={filters} />
        </div>

        <div className="px-5 py-3.5 border-t border-border text-sm">
          <p className="text-foreground/60">
            Total de retiros registrados: <span className="font-semibold text-foreground">{retiros.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
