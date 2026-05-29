import { useState } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, SquarePen } from 'lucide-react'

import { cn } from '@/lib/utils'

// Presence ∈ online | away | offline — dot colour on each avatar.
const PRESENCE_DOT = {
  online: 'bg-[#1aa06d]',
  away: 'bg-[#f0913b]',
  offline: 'bg-[#8b95a4] dark:bg-[#4b5564]',
}

// Mock team roster for the active workspace chat rail.
const MEMBERS = [
  { id: 'maya', name: 'Maya Chen', init: 'MC', color: 'linear-gradient(135deg,#1d7afc,#5b8def)', presence: 'online', note: 'Pushed to apollo/main' },
  { id: 'dev', name: 'Dev Patel', init: 'DP', color: 'linear-gradient(135deg,#1aa06d,#3bbd75)', presence: 'online', note: 'Reviewing APOLLO-230' },
  { id: 'lina', name: 'Lina Ortiz', init: 'LO', color: 'linear-gradient(135deg,#7b5bff,#b18bff)', presence: 'away', note: 'Back in 20m' },
  { id: 'sam', name: 'Sam Iverson', init: 'SI', color: 'linear-gradient(135deg,#ff9a62,#ffb347)', presence: 'online', note: 'Typing…', typing: true },
  { id: 'noor', name: 'Noor Haddad', init: 'NH', color: 'linear-gradient(135deg,#ff5e8a,#f0577a)', presence: 'offline', note: 'Last seen 2h ago' },
  { id: 'kenji', name: 'Kenji Sato', init: 'KS', color: 'linear-gradient(135deg,#1ab5c4,#22c7d6)', presence: 'offline', note: 'Last seen yesterday' },
]

const onlineCount = MEMBERS.filter((m) => m.presence === 'online').length

/**
 * Right-hand team chat rail. Collapsible via the rounded arrow on its top-left
 * edge: open shows each member's avatar + name + presence note; collapsed shows
 * just the avatars (with presence dot) as a slim icon rail.
 */
const ChatBar = () => {
  const [open, setOpen] = useState(true)

  return (
    <aside
      className={cn(
        'relative flex flex-shrink-0 flex-col border-l border-[#e3e7ee] bg-[#eef1f5] transition-[width] duration-200 dark:border-white/[0.07] dark:bg-[#0c0f13]',
        open ? 'w-64' : 'w-14',
      )}
    >
      {/* Toggle — rounded arrow straddling the left edge */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title={open ? 'Collapse chat' : 'Expand chat'}
        className="absolute -left-3.5 top-4 z-10 grid size-7 place-items-center rounded-full border border-[#e3e7ee] bg-white text-[#4b5564] shadow-[0_2px_8px_rgba(15,20,30,0.12)] transition-colors hover:text-[#1a1f29] dark:border-white/[0.08] dark:bg-[#151a21] dark:text-[#aeb8c4] dark:hover:text-[#e7edf4]"
      >
        {open ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
      </button>

      {/* Header */}
      <div className={cn('flex h-[57px] flex-shrink-0 items-center border-b border-[#e3e7ee] dark:border-white/[0.07]', open ? 'gap-2.5 px-4' : 'justify-center px-0')}>
        <MessageSquare className="size-[18px] flex-shrink-0 text-[#1a6bde] dark:text-[#77affd]" />
        {open && (
          <>
            <span className="flex-1 whitespace-nowrap text-[15px] font-bold text-[#1a1f29] dark:text-[#e7edf4]">Team chat</span>
            <button
              type="button"
              title="New message"
              className="grid size-7 place-items-center rounded-md text-[#8b95a4] hover:bg-[#e3e7ee] hover:text-[#1a1f29] dark:text-[#6b7684] dark:hover:bg-[#1b2129] dark:hover:text-[#e7edf4]"
            >
              <SquarePen className="size-[15px]" />
            </button>
          </>
        )}
      </div>

      {/* Roster */}
      <div className={cn('flex-1 overflow-y-auto overflow-x-hidden py-3', open ? 'px-3' : 'px-0')}>
        {open && (
          <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-[#8b95a4] dark:text-[#6b7684]">
            Online — {onlineCount}
          </div>
        )}

        {MEMBERS.map((m) => (
          <button
            key={m.id}
            type="button"
            title={m.name}
            className={cn(
              'flex w-full items-center rounded-lg transition-colors hover:bg-[#e3e7ee] dark:hover:bg-[#1e242d]',
              open ? 'gap-3 px-2 py-2' : 'justify-center px-0 py-2',
            )}
          >
            <span className="relative flex-shrink-0">
              <span
                className="grid size-9 place-items-center rounded-full text-[13px] font-bold text-white"
                style={{ background: m.color }}
              >
                {m.init}
              </span>
              <span
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#eef1f5] dark:border-[#0c0f13]',
                  PRESENCE_DOT[m.presence],
                )}
              />
            </span>

            {open && (
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-semibold text-[#1a1f29] dark:text-[#e7edf4]">{m.name}</span>
                <span
                  className={cn(
                    'block truncate text-[13px]',
                    m.typing ? 'italic text-[#1a6bde] dark:text-[#77affd]' : 'text-[#8b95a4] dark:text-[#6b7684]',
                  )}
                >
                  {m.note}
                </span>
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default ChatBar
