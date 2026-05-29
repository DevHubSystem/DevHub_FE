import { useState } from 'react'
import { Inbox } from 'lucide-react'

import { cn } from '@/lib/utils'

import { GROUP_ORDER, WORK } from './data'
import WorkRow from './WorkRow'

const TABS = [
  { id: 'worked', label: 'Worked on', list: WORK.worked },
  { id: 'viewed', label: 'Viewed', list: WORK.viewed },
  { id: 'assigned', label: 'Assigned to me', list: WORK.assigned },
]

/**
 * Tabbed work list (Worked on / Viewed / Assigned to me), grouped by status.
 * @param {{ query: string }} props
 */
const WorkTabs = ({ query }) => {
  const [tab, setTab] = useState('assigned')

  let list = TABS.find((t) => t.id === tab).list
  const q = query.trim().toLowerCase()
  if (q) list = list.filter((i) => `${i.title} ${i.key} ${i.space}`.toLowerCase().includes(q))

  let body
  if (list.length === 0) {
    body = (
      <div className="px-5 py-[60px] text-center text-[#8b95a4] dark:text-[#6b7684]">
        <Inbox className="mx-auto mb-3 size-10 opacity-50" />
        <div>No matching work items.</div>
      </div>
    )
  } else {
    body = GROUP_ORDER.map((g) => {
      const items = list.filter((i) => i.status === g)
      if (!items.length) return null
      return (
        <div key={g}>
          {items.map((it, i) => (
            <WorkRow key={it.key + i} it={it} />
          ))}
        </div>
      )
    })
  }

  return (
    <section className="mt-2">
      <div className="mb-1.5 flex gap-1 border-b border-[#e3e7ee] dark:border-white/[0.07]">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'relative mr-[18px] flex items-center gap-2 px-1 py-[11px] text-sm font-semibold transition-colors',
                active
                  ? "text-[#1a1f29] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded after:bg-[#1d7afc] after:content-[''] dark:text-[#e7edf4]"
                  : 'text-[#8b95a4] hover:text-[#4b5564] dark:text-[#6b7684] dark:hover:text-[#aeb8c4]',
              )}
            >
              {t.label}
              <span
                className={cn(
                  'rounded-[20px] px-[7px] py-px text-[11.5px] font-bold',
                  active ? 'bg-[#1d7afc]/15 text-[#1a6bde] dark:text-[#77affd]' : 'bg-[#f1f3f7] text-[#4b5564] dark:bg-[#1b2129] dark:text-[#aeb8c4]',
                )}
              >
                {t.list.length}
              </span>
            </button>
          )
        })}
      </div>
      <div key={tab} className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
        {body}
      </div>
    </section>
  )
}

export default WorkTabs
