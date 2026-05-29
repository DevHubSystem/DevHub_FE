import { useState } from 'react'
import { Columns3, Star } from 'lucide-react'

import { cn } from '@/lib/utils'

import { SPACES } from './data'

const qlCount = 'ml-auto rounded-[5px] bg-[#f1f3f7] px-2 py-px text-xs font-semibold text-[#4b5564] dark:bg-[#1b2129] dark:text-[#aeb8c4]'

/** "Recent spaces" card grid for the "For you" page. */
const RecentSpaces = () => {
  const [stars, setStars] = useState(() => Object.fromEntries(SPACES.map((s) => [s.id, s.starred])))

  return (
    <section className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="mb-4 mt-[34px] flex items-center justify-between">
        <h2 className="text-base font-bold tracking-[-0.2px] text-[#1a1f29] dark:text-[#e7edf4]">Recent spaces</h2>
        <button type="button" className="rounded-md px-2 py-1.5 text-[13.5px] font-semibold text-[#1a6bde] hover:bg-[#1d7afc]/15 dark:text-[#77affd]">
          View all spaces
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
        {SPACES.slice(0, 3).map((s) => (
          <div
            key={s.id}
            className="relative cursor-pointer overflow-hidden rounded-xl border border-[#e3e7ee] bg-white p-4 pb-3.5 transition-[border-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-[#d4dae3] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:border-white/[0.07] dark:bg-[#151a21] dark:hover:border-white/[0.12] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
          >
            <span className="absolute inset-y-0 left-0 w-1" style={{ background: s.color }} />

            <button
              type="button"
              title="Star"
              onClick={() => setStars((v) => ({ ...v, [s.id]: !v[s.id] }))}
              className={cn(
                'absolute right-3 top-3 grid size-7 place-items-center rounded-md hover:bg-[#f1f3f7] dark:hover:bg-[#1b2129]',
                stars[s.id] ? 'text-[#f5b544]' : 'text-[#8b95a4] dark:text-[#6b7684]',
              )}
            >
              <Star className="size-4" fill={stars[s.id] ? 'currentColor' : 'none'} />
            </button>

            <div className="flex items-center gap-3">
              <div className="grid size-[38px] flex-shrink-0 place-items-center rounded-[9px] text-base font-bold text-white" style={{ background: s.color }}>
                {s.letter}
              </div>
              <div>
                <div className="text-[15px] font-bold text-[#1a1f29] dark:text-[#e7edf4]">{s.name}</div>
                <div className="mt-px text-[12.5px] text-[#8b95a4] dark:text-[#6b7684]">{s.type}</div>
              </div>
            </div>

            <div>
              <div className="mb-2 mt-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#8b95a4] dark:text-[#6b7684]">Quick links</div>
              <a className="flex cursor-pointer items-center gap-2 py-[5px] text-[13.5px] text-[#1a6bde] dark:text-[#77affd]">
                <span className="underline underline-offset-2">My open work items</span>
                <span className={qlCount}>{s.open}</span>
              </a>
              <a className="flex cursor-pointer items-center gap-2 py-[5px] text-[13.5px] text-[#1a6bde] dark:text-[#77affd]">
                <span className="underline underline-offset-2">Done work items</span>
                <span className={qlCount}>{s.done}</span>
              </a>
            </div>

            <div className="mt-3.5 flex items-center gap-[7px] border-t border-[#e3e7ee] pt-3 text-[13px] text-[#4b5564] dark:border-white/[0.07] dark:text-[#aeb8c4]">
              <Columns3 className="size-[14px]" /> {s.boards} board{s.boards > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentSpaces
