import { Bell, CircleHelp, Code2, Moon, PanelLeft, Search, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const iconBtn = 'size-[34px] text-[#4b5564] hover:bg-[#eef1f5] hover:text-[#1a1f29] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d] dark:hover:text-[#e7edf4]'

/**
 * Top app bar: brand, sidebar toggle, search, theme/help/notifications, avatar.
 * @param {{ collapsed: boolean, onToggleSidebar: () => void, theme: 'dark'|'light',
 *   onToggleTheme: () => void, query: string, setQuery: (v: string) => void }} props
 */
const Header = ({ collapsed, onToggleSidebar, theme, onToggleTheme, query, setQuery }) => {
  return (
    <header className="z-30 flex flex-shrink-0 items-center gap-3.5 border-b border-[#e3e7ee] bg-[#eef1f5] px-4 py-4 dark:border-white/[0.07] dark:bg-[#0c0f13]">
      <div className={cn('flex flex-shrink-0 items-center gap-2.5 transition-[width] duration-200', collapsed ? 'w-[48px]' : 'w-[216px]')}>
        <div className="grid size-[30px] flex-shrink-0 place-items-center rounded-lg bg-[linear-gradient(140deg,#1d7afc,#475ff8)] text-white shadow-[0_3px_10px_rgba(29,122,252,0.4)]">
          <Code2 className="size-[17px]" />
        </div>
        {!collapsed && (
          <div className="whitespace-nowrap text-[18px] font-extrabold tracking-[-0.4px] text-[#1a1f29] dark:text-[#e7edf4]">
            Dev<b className="text-[#1a6bde] dark:text-[#77affd]">Hub</b>
          </div>
        )}
      </div>

      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className={iconBtn} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        <PanelLeft className="size-[19px]" />
      </Button>

      <div className="relative max-w-[540px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-[17px] -translate-y-1/2 text-[#8b95a4] dark:text-[#6b7684]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search work, spaces, people…"
          className="h-[38px] rounded-[9px] border-[#e3e7ee] bg-white pl-[38px] text-sm text-[#1a1f29] placeholder:text-[#8b95a4] focus-visible:border-[#1d7afc] focus-visible:ring-3 focus-visible:ring-[#1d7afc]/15 dark:border-white/[0.07] dark:bg-[#151a21] dark:text-[#e7edf4] dark:placeholder:text-[#6b7684]"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" onClick={onToggleTheme} className={iconBtn} title="Toggle theme">
          {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <Button variant="ghost" size="icon" className={iconBtn} title="Help">
          <CircleHelp className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className={cn('relative', iconBtn)} title="Notifications">
          <Bell className="size-5" />
          <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-[9px] border-2 border-[#eef1f5] bg-[#e5484d] px-1 text-[10px] font-bold text-white dark:border-[#0c0f13]">
            3
          </span>
        </Button>
        <button
          type="button"
          title="You"
          className="grid size-8 flex-shrink-0 place-items-center rounded-full border-2 border-transparent bg-[linear-gradient(135deg,#ff9a62,#ff5e8a)] text-[13px] font-bold text-white hover:border-[#d4dae3] dark:hover:border-white/[0.12]"
        >
          YK
        </button>
      </div>
    </header>
  )
}

export default Header
