import {
  Calendar,
  ClipboardList,
  Code2,
  Columns3,
  FileText,
  GanttChart,
  Globe,
  Import,
  List,
  ListOrdered,
  Maximize2,
  MoreHorizontal,
  Plus,
  Share2,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { SPACES } from '@/pages/user/home-page/data'

// Tab definitions in display order. `to` is the relative child route segment.
const TABS = [
  { to: 'summary', label: 'Summary', icon: Globe },
  { to: 'list', label: 'List', icon: List },
  { to: 'board', label: 'Board', icon: Columns3 },
  { to: 'backlog', label: 'Backlog', icon: ListOrdered },
  { to: 'development', label: 'Development', icon: Code2 },
  { to: 'docs', label: 'Docs', icon: FileText },
  { to: 'reports', label: 'Reports', icon: TrendingUp },
  { to: 'calendar', label: 'Calendar', icon: Calendar },
]

const iconBtn =
  'grid size-8 flex-shrink-0 place-items-center rounded-md text-[#8b95a4] transition-colors hover:bg-[#eef1f5] hover:text-[#1a1f29] dark:text-[#6b7684] dark:hover:bg-[#1e242d] dark:hover:text-[#e7edf4]'

// Active tab gets a blue underline + strong text; idle tabs are muted.
const tabClass = ({ isActive }) =>
  cn(
    'relative flex items-center gap-2 whitespace-nowrap px-1 py-3 text-sm font-semibold transition-colors',
    isActive
      ? "text-[#1a1f29] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded after:bg-[#1d7afc] after:content-[''] dark:text-[#e7edf4]"
      : 'text-[#8b95a4] hover:text-[#4b5564] dark:text-[#6b7684] dark:hover:text-[#aeb8c4]',
  )

/**
 * Workspace (space) shell. Owns the space breadcrumb header and the tab bar of
 * NavLinks; the selected view (List, Development, …) renders into <Outlet>.
 * Reads the active space from the `:spaceId` route param.
 */
const WorkspaceManagement = () => {
  const { spaceId } = useParams()
  const space =
    SPACES.find((s) => s.id === spaceId) ?? {
      name: spaceId ?? 'Workspace',
      letter: (spaceId ?? 'WS').slice(0, 2).toUpperCase(),
      color: '#1d7afc',
    }

  return (
    <div className="flex flex-col bg-[#f7f8fa] dark:bg-[#0f1318]">
      <div className="border-b border-[#e3e7ee] px-6 pt-5 dark:border-white/[0.07]">
        <div className="mb-2 text-[12.5px] font-medium text-[#8b95a4] dark:text-[#6b7684]">Spaces</div>

        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="grid size-7 flex-shrink-0 place-items-center rounded-md text-[12px] font-bold text-white"
            style={{ background: space.color }}
          >
            {space.letter}
          </span>
          <h1 className="text-lg font-extrabold tracking-[-0.3px] text-[#1a1f29] dark:text-[#e7edf4]">{space.name}</h1>
          <button type="button" className={iconBtn} title="Members">
            <Users className="size-4.5" />
          </button>
          <button type="button" className={iconBtn} title="More options">
            <MoreHorizontal className="size-4.5" />
          </button>

        </div>

        <nav className="flex items-center gap-5">
          {TABS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={tabClass}>
              <Icon className="size-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet />
    </div>
  )
}

export default WorkspaceManagement
