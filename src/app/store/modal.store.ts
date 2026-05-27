import { create } from 'zustand'
import type { ReactNode } from 'react'

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'full' | 'cover'
export type ModalButtonVariant =
  | 'primary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'danger-soft'
  | 'secondary'
  | 'tertiary'

export interface ModalAction {
  label: string
  onPress: () => void
  variant?: ModalButtonVariant
  isLoading?: boolean
}

export interface ModalConfig {
  title: string
  content: ReactNode
  size?: ModalSize
  actions?: ModalAction[]
}

interface ModalStore {
  isOpen: boolean
  config: ModalConfig | null
  open: (config: ModalConfig) => void
  close: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  config: null,
  open: (config) => set({ isOpen: true, config }),
  close: () => set({ isOpen: false }),
}))

export function useModal() {
  const open = useModalStore((s) => s.open)
  const close = useModalStore((s) => s.close)
  return { open, close }
}
