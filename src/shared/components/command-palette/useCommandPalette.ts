import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { fuzzyMatch } from '@/shared/utils/fuzzyMatch'
import type { CommandPaletteItem } from './types'

export function useCommandPalette(items: CommandPaletteItem[]) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    return items
      .map((item) => ({ item, score: fuzzyMatch(query, item.label) }))
      .filter((entry): entry is { item: CommandPaletteItem; score: number } => entry.score !== null)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item)
  }, [items, query])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const select = useCallback((item: CommandPaletteItem) => {
    navigate(item.path)
    close()
  }, [navigate, close])

  const updateQuery = useCallback((value: string) => {
    setQuery(value)
    setActiveIndex(0)
  }, [])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    function handleOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) close()
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen, close])

  useEffect(() => {
    function handleGlobalKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filteredItems.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const item = filteredItems[activeIndex]
      if (item) select(item)
    } else if (event.key === 'Escape') {
      close()
    }
  }, [filteredItems, activeIndex, select, close])

  return {
    isOpen,
    query,
    setQuery: updateQuery,
    activeIndex,
    setActiveIndex,
    filteredItems,
    inputRef,
    containerRef,
    open: () => setIsOpen(true),
    close,
    handleKeyDown,
    select,
  }
}
