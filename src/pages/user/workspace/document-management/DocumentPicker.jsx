import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'

import { cn } from '@/lib/utils'

import { DOC_FILTERS } from './data'
import DocIcon from './DocIcon'

const badge = 'rounded px-1.5 py-0.5 text-[11px] font-semibold'
const driveBadge = cn(badge, 'bg-[#e7f0ff] text-[#1a6bde] dark:bg-[#1d7afc]/15 dark:text-[#77affd]')
const uploadBadge = cn(badge, 'bg-[#eef1f5] text-[#6b7684] dark:bg-white/[0.08] dark:text-[#aeb8c4]')

/**
 * Searchable, filterable document picker. Trigger shows the active document;
 * the popup lists documents grouped/filtered by source with name search.
 * @param {{ documents: Array, selectedId: string, onSelect: (id: string) => void }} props
 */
const DocumentPicker = ({ documents, selectedId, onSelect }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const active = documents.find((d) => d.id === selectedId)
  const results = documents.filter(
    (d) => (filter === 'all' || d.group === filter) && d.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const pick = (id) => {
    onSelect(id)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative w-full max-w-130">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-lg border bg-white px-3 py-2.5 text-left transition-colors dark:bg-[#151a21]',
          open
            ? 'border-[#1d7afc] ring-2 ring-[#1d7afc]/25 dark:border-[#1d7afc]'
            : 'border-[#e3e7ee] hover:border-[#cdd5e0] dark:border-white/[0.07] dark:hover:border-white/15',
        )}
      >
        <DocIcon type={active?.type ?? 'drive'} className="size-6" />
        <span className="flex-1 truncate text-sm font-semibold text-[#1a1f29] dark:text-[#e7edf4]">{active?.name ?? 'Chọn tài liệu'}</span>
        {active && <span className={active.group === 'drive' ? driveBadge : uploadBadge}>{active.badge}</span>}
        <ChevronDown className={cn('size-4 text-[#8b95a4] transition-transform dark:text-[#6b7684]', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full overflow-hidden rounded-xl border border-[#e3e7ee] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#161b22]">
          <div className="border-b border-[#e3e7ee] p-2.5 dark:border-white/[0.07]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4] dark:text-[#6b7684]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tài liệu…"
                className="w-full rounded-lg border border-[#e3e7ee] bg-[#f7f8fa] py-2 pl-8.5 pr-3 text-sm text-[#1a1f29] outline-none placeholder:text-[#8b95a4] focus:border-[#1d7afc] dark:border-white/[0.07] dark:bg-[#0f1318] dark:text-[#e7edf4] dark:placeholder:text-[#6b7684]"
              />
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              {DOC_FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    'rounded-md px-2.5 py-1 text-[12.5px] font-semibold transition-colors',
                    filter === f.key
                      ? 'bg-[#e7f0ff] text-[#1a6bde] dark:bg-[#1d7afc]/15 dark:text-[#77affd]'
                      : 'text-[#4b5564] hover:bg-[#eef1f5] dark:text-[#aeb8c4] dark:hover:bg-white/[0.05]',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="max-h-80 overflow-y-auto p-1.5">
            {results.length === 0 && (
              <li className="px-3 py-8 text-center text-[13px] text-[#8b95a4] dark:text-[#6b7684]">Không tìm thấy tài liệu nào.</li>
            )}
            {results.map((d) => {
              const selected = d.id === selectedId
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => pick(d.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                      selected ? 'bg-[#e7f0ff] dark:bg-[#1d7afc]/15' : 'hover:bg-[#eef1f5] dark:hover:bg-white/[0.05]',
                    )}
                  >
                    <DocIcon type={d.type} className="size-9" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-[#1a1f29] dark:text-[#e7edf4]">{d.name}</span>
                      <span className="block text-[12px] text-[#8b95a4] dark:text-[#6b7684]">{d.modified}</span>
                    </span>
                    <span className={d.group === 'drive' ? driveBadge : uploadBadge}>{d.badge}</span>
                    {selected && <Check className="size-4 shrink-0 text-[#1a6bde] dark:text-[#77affd]" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DocumentPicker
