import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cobranzaService } from '../services/cobranza.service'

const QUERY_KEY = 'cobranza'

export function useCuotas() {
  return useQuery({
    queryKey: [QUERY_KEY, 'cuotas'],
    queryFn: () => cobranzaService.getCuotas().then((r) => r.data),
  })
}

export function useCobranzaResumen() {
  return useQuery({
    queryKey: [QUERY_KEY, 'resumen'],
    queryFn: () => cobranzaService.getResumen().then((r) => r.data),
  })
}

export function useRegistrarPago() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ cuotaId, monto }: { cuotaId: string; monto: number }) =>
      cobranzaService.registrarPago(cuotaId, monto),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
