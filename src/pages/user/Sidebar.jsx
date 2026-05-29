import { useState } from 'react'
import { ArrowRight, ChevronRight, Compass, Plus, User } from 'lucide-react'

import SpaceCreationDialog from '@/components/common/SpaceCreationDialog'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

import { SPACES } from './home-page/data'

const navItem = 'flex h-9.5 w-full items-center gap-3 rounded-lg px-[11px] text-sm font-medium whitespace-nowrap transition-colors'
const navIdle = 'text-[#4b5564] hover:bg-[#eef1f5] hover:text-[#1a1f29] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d] dark:hover:text-[#e7edf4]'
const navActive = 'bg-[#1d7afc]/15 font-semibold text-[#1a6bde] dark:text-[#77affd]'
const subItem = 'ml-3.5 flex h-8.5 w-full items-center gap-2.5 rounded-[7px] border-l border-[#e3e7ee] pl-3.5 pr-[11px] text-[13.5px] whitespace-nowrap transition-colors dark:border-white/[0.07]'

/**
 * Collapsible left navigation: "For you" and the "Spaces" dropdown.
 * @param {{ collapsed: boolean, view: string, setView: (v: string) => void,
 *   spacesOpen: boolean, setSpacesOpen: (v: boolean) => void,
 *   activeSpace: string|null, setActiveSpace: (id: string) => void,
 *   onCreateSpace?: (values: { name: string, description: string }) => (void | Promise<void>) }} props
 */
const Sidebar = ({ collapsed, view, setView, spacesOpen, setSpacesOpen, activeSpace, setActiveSpace, onCreateSpace }) => {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <aside className={cn('flex flex-col overflow-hidden border-r border-[#e3e7ee] bg-[#eef1f5] transition-[width] duration-200 dark:border-white/[0.07] dark:bg-[#0c0f13]', collapsed ? 'w-16' : 'w-62')}>
      <div className={cn('flex-1 overflow-y-auto overflow-x-hidden pb-5 pt-2.5', collapsed ? 'px-0' : 'px-3')}>
        <button
          type="button"
          onClick={() => setView('foryou')}
          title="For you"
          className={cn(navItem, collapsed && 'justify-center px-0', view === 'foryou' ? navActive : navIdle)}
        >
          <span className="grid w-5 flex-shrink-0 place-items-center">
            <User className="size-4.5" />
          </span>
          {!collapsed && <span className="flex-1 overflow-hidden text-left">For you</span>}
        </button>

        <div className="mx-1.5 my-3 h-px bg-[#e3e7ee] dark:bg-white/[0.07]" />

        {collapsed ? (
          <button
            type="button"
            onClick={() => setView('spaces')}
            title="Spaces"
            className={cn(navItem, 'justify-center px-0', view === 'spaces' ? navActive : navIdle)}
          >
            <span className="grid w-5 flex-shrink-0 place-items-center">
              <Compass className="size-4.5" />
            </span>
          </button>
        ) : (
          <Collapsible open={spacesOpen} onOpenChange={setSpacesOpen}>
            <CollapsibleTrigger className={cn(navItem, view === 'spaces' ? navActive : navIdle)}>
              <span className="grid w-5 flex-shrink-0 place-items-center">
                <Compass className="size-4.5" />
              </span>
              <span className="flex-1 overflow-hidden text-left">Spaces</span>
              <span
                role="button"
                tabIndex={-1}
                title="Create space"
                onClick={(e) => {
                  e.stopPropagation()
                  setCreateOpen(true)
                }}
                className="grid size-6 place-items-center rounded-md text-[#8b95a4] hover:bg-[#f1f3f7] hover:text-[#1a1f29] dark:text-[#6b7684] dark:hover:bg-[#1b2129] dark:hover:text-[#e7edf4]"
              >
                <Plus className="size-4" />
              </span>
              <span className={cn('text-[#8b95a4] transition-transform duration-200 dark:text-[#6b7684]', spacesOpen && 'rotate-90')}>
                <ChevronRight className="size-[15px]" />
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="py-1.5 pl-6.5 text-[11px] font-bold uppercase tracking-[0.07em] text-[#8b95a4] dark:text-[#6b7684]">
                Recent
              </div>
              {SPACES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSpace(s.id)}
                  title={s.name}
                  className={cn(subItem, activeSpace === s.id ? 'font-semibold text-[#1a1f29] dark:text-[#e7edf4]' : 'text-[#4b5564] hover:bg-[#eef1f5] hover:text-[#1a1f29] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d] dark:hover:text-[#e7edf4]')}
                >
                  <span className="grid size-5 flex-shrink-0 place-items-center rounded-[5px] text-[11px] font-bold text-white" style={{ background: s.color }}>
                    {s.letter}
                  </span>
                  <span className="overflow-hidden text-ellipsis">{s.name}</span>
                </button>
              ))}
              <button type="button" className={cn(subItem, 'font-semibold text-[#1a6bde] hover:bg-[#eef1f5] dark:text-[#77affd] dark:hover:bg-[#1e242d]')}>
                <span className="grid size-5 flex-shrink-0 place-items-center">
                  <ArrowRight className="size-3.5" />
                </span>
                <span>View all spaces</span>
              </button>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      <SpaceCreationDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={onCreateSpace} />
    </aside>
  )
}

export default Sidebar
