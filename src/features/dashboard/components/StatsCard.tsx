import type { IconType } from 'react-icons'
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'

export type CardVariant = 'emerald' | 'blue' | 'violet' | 'indigo' | 'rose' | 'amber'

const VARIANT: Record<CardVariant, {
  bg: string
  iconBg: string
  iconText: string
  bar: string
  watermark: string
}> = {
  emerald: {
    bg:        'from-card to-emerald-50/60 dark:to-emerald-500/5',
    iconBg:    'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconText:  'text-emerald-600 dark:text-emerald-400',
    bar:       'from-emerald-400 to-emerald-600',
    watermark: 'text-emerald-500/10',
  },
  blue: {
    bg:        'from-card to-blue-50/60 dark:to-blue-500/5',
    iconBg:    'bg-blue-500/10 dark:bg-blue-500/15',
    iconText:  'text-blue-600 dark:text-blue-400',
    bar:       'from-blue-400 to-blue-600',
    watermark: 'text-blue-500/10',
  },
  violet: {
    bg:        'from-card to-violet-50/60 dark:to-violet-500/5',
    iconBg:    'bg-violet-500/10 dark:bg-violet-500/15',
    iconText:  'text-violet-600 dark:text-violet-400',
    bar:       'from-violet-400 to-violet-600',
    watermark: 'text-violet-500/10',
  },
  indigo: {
    bg:        'from-card to-indigo-50/60 dark:to-indigo-500/5',
    iconBg:    'bg-indigo-500/10 dark:bg-indigo-500/15',
    iconText:  'text-indigo-600 dark:text-indigo-400',
    bar:       'from-indigo-400 to-indigo-600',
    watermark: 'text-indigo-500/10',
  },
  rose: {
    bg:        'from-card to-rose-50/60 dark:to-rose-500/5',
    iconBg:    'bg-rose-500/10 dark:bg-rose-500/15',
    iconText:  'text-rose-600 dark:text-rose-400',
    bar:       'from-rose-400 to-rose-600',
    watermark: 'text-rose-500/10',
  },
  amber: {
    bg:        'from-card to-amber-50/60 dark:to-amber-500/5',
    iconBg:    'bg-amber-500/10 dark:bg-amber-500/15',
    iconText:  'text-amber-600 dark:text-amber-400',
    bar:       'from-amber-400 to-amber-600',
    watermark: 'text-amber-500/10',
  },
}

interface StatsCardProps {
  label: string
  value: string
  subtitle?: string
  icon: IconType
  variant: CardVariant
  trend?: { value: string; positive: boolean }
}

export function StatsCard({ label, value, subtitle, icon: Icon, variant, trend }: StatsCardProps) {
  const v = VARIANT[variant]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border',
        'bg-linear-to-br shadow-sm',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
        v.bg,
      )}
    >
      {/* Colored top bar */}
      <div className={cn('h-1 w-full bg-linear-to-r', v.bar)} />

      {/* Watermark icon */}
      <Icon className={cn('absolute -right-3 -bottom-3 w-24 h-24 pointer-events-none select-none', v.watermark)} />

      <div className="p-5">
        {/* Icon + trend */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', v.iconBg)}>
            <Icon className={cn('w-5 h-5', v.iconText)} />
          </div>

          {trend && (
            <span
              className={cn(
                'flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg',
                trend.positive
                  ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15'
                  : 'text-rose-600 bg-rose-100 dark:bg-rose-500/15'
              )}
            >
              {trend.positive
                ? <MdTrendingUp className="w-3.5 h-3.5" />
                : <MdTrendingDown className="w-3.5 h-3.5" />}
              {trend.value}
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-[11px] font-semibold text-foreground/45 uppercase tracking-widest mb-1.5">
          {label}
        </p>
        <p className="text-[1.6rem] font-bold text-foreground leading-none tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-foreground/40 mt-2 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
