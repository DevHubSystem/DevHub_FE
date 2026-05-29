import { useState } from 'react'
import {
  Bookmark,
  Bug,
  ChevronDown,
  ChevronUp,
  Columns2,
  Equal,
  Filter,
  Layers,
  LayoutList,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  SquareCheck,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Work-item type -> glyph + accent colour (matches the home-page palette).
const TYPE = {
  epic: { Icon: Zap, color: '#7b5bff' },
  task: { Icon: SquareCheck, color: '#1d7afc' },
  bug: { Icon: Bug, color: '#e5484d' },
  story: { Icon: Bookmark, color: '#1aa06d' },
}

// Priority -> chevron/equals glyph + colour.
const PRIORITY = {
  Low: { Icon: ChevronDown, color: 'text-[#3bbd75]' },
  Medium: { Icon: Equal, color: 'text-[#f0913b]' },
  High: { Icon: ChevronUp, color: 'text-[#e5484d]' },
}

// Status -> pill label + colour (Todo grey / In Progress blue / Done green).
const STATUS = {
  todo: { label: 'TO DO', cls: 'bg-[#e7eaef] text-[#4b5564] dark:bg-[#2a313b] dark:text-[#aeb8c4]' },
  prog: { label: 'IN PROGRESS', cls: 'bg-[#1d7afc]/[0.16] text-[#4d9bff]' },
  done: { label: 'DONE', cls: 'bg-[#22a863]/[0.16] text-[#3bbd75]' },
}

const TASKS = [
  { key: 'DIC-1', title: 'Epic 1', type: 'epic', assignee: null, reporter: 'AD', status: 'todo' },
  { key: 'DIC-6', title: 'ghfghfg', type: 'epic', assignee: null, reporter: 'AD', status: 'todo' },
  { key: 'DIC-3', title: 'Task 4', type: 'bug', assignee: null, reporter: 'AD', status: 'done' },
]

const toolbarBtn =
  'flex items-center gap-1.5 rounded-lg border border-[#e3e7ee] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#4b5564] transition-colors hover:bg-[#eef1f5] dark:border-white/[0.07] dark:bg-[#151a21] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d]'
const th = 'px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.05em] text-[#8b95a4] dark:text-[#6b7684]'
const td = 'px-4 py-2.5 align-middle'

/** Small initial avatar; `null` initials render the grey "Unassigned" pill. */
const Person = ({ initials, name, color }) => (
  <span className="flex items-center gap-2 text-[13px] text-[#4b5564] dark:text-[#aeb8c4]">
    {initials ? (
      <span className="grid size-5.5 flex-shrink-0 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: color }}>
        {initials}
      </span>
    ) : (
      <span className="grid size-5.5 flex-shrink-0 place-items-center rounded-full bg-[#e7eaef] text-[#8b95a4] dark:bg-[#2a313b] dark:text-[#6b7684]">
        <User className="size-3.5" />
      </span>
    )}
    {name}
  </span>
)

/** Workspace "List" view — a flat, Jira-style table of work items. */
const TaskManagement = () => {
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const rows = q ? TASKS.filter((t) => `${t.title} ${t.key}`.toLowerCase().includes(q)) : TASKS

  return (
    <section className="px-6 py-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button type="button" className={toolbarBtn}>
          <Sparkles className="size-4 text-[#7b5bff]" />
          Ask AI
        </button>

        <div className="relative w-57.5">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4] dark:text-[#6b7684]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search work"
            className="h-9 rounded-lg border-[#e3e7ee] bg-white pl-8 text-[13px] text-[#1a1f29] placeholder:text-[#8b95a4] focus-visible:border-[#1d7afc] focus-visible:ring-3 focus-visible:ring-[#1d7afc]/15 dark:border-white/[0.07] dark:bg-[#151a21] dark:text-[#e7edf4] dark:placeholder:text-[#6b7684]"
          />
        </div>

        <div className="flex items-center -space-x-1.5">
          <span className="grid size-7 place-items-center rounded-full border-2 border-[#f7f8fa] bg-[#e7eaef] text-[#8b95a4] dark:border-[#0f1318] dark:bg-[#2a313b] dark:text-[#6b7684]">
            <User className="size-4" />
          </span>
          <span className="grid size-7 place-items-center rounded-full border-2 border-[#f7f8fa] bg-[linear-gradient(135deg,#1d7afc,#5b8def)] text-[11px] font-bold text-white dark:border-[#0f1318]">
            AD
          </span>
        </div>

        <button type="button" className={toolbarBtn}>
          <Filter className="size-4" />
          Filter
        </button>
        <button type="button" className={toolbarBtn}>
          <Layers className="size-4" />
          Group
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-[#4b5564] hover:bg-[#eef1f5] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d]">
            Saved filters
            <ChevronDown className="size-4" />
          </button>
          <div className="flex items-center gap-0.5 rounded-lg border border-[#e3e7ee] p-0.5 dark:border-white/[0.07]">
            <button type="button" className="grid size-7 place-items-center rounded-md bg-[#1d7afc]/15 text-[#1a6bde] dark:text-[#77affd]" title="List view">
              <LayoutList className="size-4" />
            </button>
            <button type="button" className="grid size-7 place-items-center rounded-md text-[#8b95a4] hover:bg-[#eef1f5] dark:text-[#6b7684] dark:hover:bg-[#1e242d]" title="Split view">
              <Columns2 className="size-4" />
            </button>
          </div>
          <button type="button" className="grid size-8 place-items-center rounded-lg text-[#8b95a4] hover:bg-[#eef1f5] dark:text-[#6b7684] dark:hover:bg-[#1e242d]" title="More">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e3e7ee] bg-white dark:border-white/[0.07] dark:bg-[#151a21]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e3e7ee] dark:border-white/[0.07]">
                <th className={cn(th, 'w-10 pr-0')}>
                  <input type="checkbox" className="size-3.5 accent-[#1d7afc]" />
                </th>
                <th className={th}>Work</th>
                <th className={th}>Assignee</th>
                <th className={th}>Reporter</th>
                <th className={th}>Priority</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => {
                const { Icon, color } = TYPE[t.type]
                const { Icon: PIcon, color: pColor } = PRIORITY.Medium
                const status = STATUS[t.status]
                const done = t.status === 'done'
                return (
                  <tr key={t.key} className="border-b border-[#eef1f5] last:border-0 hover:bg-[#f7f8fa] dark:border-white/[0.04] dark:hover:bg-[#1e242d]">
                    <td className={cn(td, 'pr-0')}>
                      <input type="checkbox" className="size-3.5 accent-[#1d7afc]" />
                    </td>
                    <td className={td}>
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-4.5 flex-shrink-0 place-items-center rounded-[4px] text-white" style={{ background: color }}>
                          <Icon className="size-3" />
                        </span>
                        <a className={cn('font-mono text-[13px] font-semibold text-[#1a6bde] underline-offset-2 hover:underline dark:text-[#77affd]', done && 'line-through')}>
                          {t.key}
                        </a>
                        <span className="text-[13px] font-medium text-[#1a1f29] dark:text-[#e7edf4]">{t.title}</span>
                      </div>
                    </td>
                    <td className={td}>
                      <Person initials={t.assignee} name={t.assignee ? 'Anh Đức' : 'Unassigned'} color="#1d7afc" />
                    </td>
                    <td className={td}>
                      <Person initials={t.reporter} name="Anh Đức" color="#1d7afc" />
                    </td>
                    <td className={td}>
                      <span className="flex items-center gap-1.5 text-[13px] text-[#4b5564] dark:text-[#aeb8c4]">
                        <PIcon className={cn('size-4', pColor)} />
                        Medium
                      </span>
                    </td>
                    <td className={td}>
                      <button type="button" className={cn('flex items-center gap-1 rounded px-2 py-1 text-[11px] font-bold uppercase tracking-[0.04em]', status.cls)}>
                        {status.label}
                        <ChevronDown className="size-3" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <button type="button" className="flex w-full items-center gap-2 border-t border-[#eef1f5] px-4 py-2.5 text-[13px] font-semibold text-[#4b5564] hover:bg-[#f7f8fa] dark:border-white/[0.04] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d]">
          <Plus className="size-4" />
          Create
        </button>

        <div className="flex items-center justify-center gap-2 border-t border-[#eef1f5] px-4 py-2.5 text-[12.5px] text-[#8b95a4] dark:border-white/[0.04] dark:text-[#6b7684]">
          {rows.length} of {TASKS.length}
          <RotateCcw className="size-3.5" />
        </div>
      </div>
    </section>
  )
}

export default TaskManagement
