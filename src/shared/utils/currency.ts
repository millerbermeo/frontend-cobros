/**
 * Utilidades de formato de precios en pesos colombianos (COP).
 * - Miles separados por punto, decimales por coma (formato es-CO).
 * - El valor "canónico" (para schema/backend) usa punto decimal y sin miles: "10000000.5".
 */

const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

/** Formato de moneda para mostrar (tablas, cards): "$ 10.000.000". */
export function formatCOP(value: number | string): string {
  const n = typeof value === 'string' ? Number(value) : value
  if (!Number.isFinite(n)) return '—'
  return copFormatter.format(n)
}

/** Agrupa dígitos enteros con punto de miles: "10000000" → "10.000.000". */
function groupThousands(intDigits: string): string {
  const clean = intDigits.replace(/^0+(?=\d)/, '') // sin ceros a la izquierda
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export interface MoneyTyping {
  /** Texto formateado para mostrar en el input: "10.000.000,50". */
  display: string
  /** Valor limpio para el schema/backend: "10000000.50" (punto decimal, sin miles). */
  canonical: string
}

/**
 * Interpreta lo que escribe el usuario y devuelve la versión formateada y la canónica.
 * Punto = separador de miles (se ignora), coma = decimal (máx 2 dígitos).
 */
export function formatMoneyTyping(raw: string): MoneyTyping {
  const only = raw.replace(/[^\d.,]/g, '').replace(/\./g, '') // quita todo menos dígitos y coma
  const firstComma = only.indexOf(',')

  if (firstComma === -1) {
    const int = only
    return { display: groupThousands(int), canonical: int }
  }

  const intPart = only.slice(0, firstComma).replace(/,/g, '')
  const dec = only.slice(firstComma + 1).replace(/,/g, '').slice(0, 2)
  const intFmt = groupThousands(intPart) || '0'
  return {
    display: `${intFmt},${dec}`,
    canonical: dec.length ? `${intPart || '0'}.${dec}` : intPart || '0',
  }
}

/** Convierte un valor canónico ("10000000.5") a texto de input ("10.000.000,5"). */
export function moneyToDisplay(canonical: string | number | null | undefined): string {
  if (canonical === null || canonical === undefined || canonical === '') return ''
  const [int, dec] = String(canonical).split('.')
  const intFmt = groupThousands(int)
  return dec !== undefined ? `${intFmt},${dec}` : intFmt
}
