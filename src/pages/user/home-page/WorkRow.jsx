import { Bookmark, Bug, SquareCheck, Zap } from 'lucide-react'

import { cn } from '@/lib/utils'

import { PEOPLE, STATUS, TYPES } from './data'

// lucide glyph per work-item type.
const TYPE_ICON = { story: Bookmark, task: SquareCheck, bug: Bug, epic: Zap }

// Status pill colour per status key (fixed across themes, matching the design).
const STATUS_PILL = {
  todo: 'bg-[#f1f3f7] text-[#4b5564] dark:bg-[#1b2129] dark:text-[#aeb8c4]',
  prog: 'bg-[#1d7afc]/[0.16] text-[#4d9bff]',
  review: 'bg-[#9b63ff]/[0.16] text-[#b18bff]',
  done: 'bg-[#22a863]/[0.16] text-[#3bbd75]',
}

/**
 * A single work-item row.
 * @param {{ it: { key: string, title: string, type: string, status: string,
 *   space: string, when: string, who: string } }} props
 */
const WorkRow = ({ it }) => {
  const type = TYPES[it.type]
  const status = STATUS[it.status]
  const who = PEOPLE[it.who] || PEOPLE.you
  const Glyph = TYPE_ICON[type.icon]

  return (
    <div className="-mx-3 flex cursor-pointer items-center gap-3 rounded-[9px] px-3 py-[11px] transition-colors hover:bg-[#eef1f5] dark:hover:bg-[#1e242d]">
      <span className="grid size-5.5 flex-shrink-0 place-items-center rounded-[5px] text-white" style={{ background: type.color }}>
        <Glyph className="size-[13px]" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-[#1a1f29] dark:text-[#e7edf4]">{it.title}</div>
        <div className="mt-0.5 flex items-center gap-[7px] text-[12.5px] text-[#8b95a4] dark:text-[#6b7684]">
          <span className="font-mono font-medium">{it.key}</span>
          <span>·</span>
          <span>{it.space}</span>
          <span>·</span>
          <span>{it.when}</span>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-3.5">
        <span className={cn('whitespace-nowrap rounded-[5px] px-[9px] py-[3px] text-[11px] font-bold uppercase tracking-[0.04em]', STATUS_PILL[it.status])}>
          {status.label}
        </span>
        <span className="grid size-6.5 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: who.color }} title={who.name}>
          {who.init}
        </span>
      </div>
    </div>
  )
}

export default WorkRow
