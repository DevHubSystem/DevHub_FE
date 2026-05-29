import { useState } from 'react'
import { GitPullRequest, Info, Plug } from 'lucide-react'

import { cn } from '@/lib/utils'

// Large headline metrics (top row, 4 across).
const PRIMARY_METRICS = [
  { label: 'Work items', value: '1', sub: 'Completed this week', spark: true },
  { label: 'Pull request cycle time', value: '0', sub: 'Rolling 7-day median' },
  { label: 'Lead time for changes', value: '0', sub: 'Rolling 12-week average' },
  { label: 'Deployment frequency', value: '0', sub: 'Weekly average' },
]

// Compact counters (second row, 5 across).
const SECONDARY_METRICS = [
  { label: 'Work items', value: '2', sub: 'Overdue' },
  { label: 'Work items', value: '0', sub: 'Reopened' },
  { label: 'Bugs', value: '0', sub: 'Open' },
  { label: 'Pull requests', value: '0', sub: 'Open' },
  { label: 'Vulnerabilities', value: '0', sub: 'Critical' },
]

const RELATED_TABS = ['Pull requests', 'Repositories', 'Vulnerabilities', 'Deployments', 'Work suggestions']

const card = 'rounded-xl border border-[#e3e7ee] bg-white p-4 dark:border-white/[0.07] dark:bg-[#151a21]'
const metricLabel = 'flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1f29] dark:text-[#e7edf4]'
const metricSub = 'mt-0.5 text-[12.5px] text-[#8b95a4] dark:text-[#6b7684]'

/** Workspace "Development" view — DevOps key metrics + related-work panel. */
const ProjectDevelopment = () => {
  const [tab, setTab] = useState('Pull requests')

  return (
    <section className="px-6 py-6">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-bold tracking-[-0.2px] text-[#1a1f29] dark:text-[#e7edf4]">Key metrics</h2>
        <span className="rounded border border-[#7b5bff]/40 px-1.5 py-px text-[10px] font-bold uppercase tracking-[0.06em] text-[#9b63ff] dark:text-[#b18bff]">
          Beta
        </span>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {PRIMARY_METRICS.map((m) => (
          <div key={m.sub} className={card}>
            <div className="flex items-start justify-between">
              <div className={metricLabel}>
                {m.label}
                <Info className="size-3.5 text-[#8b95a4] dark:text-[#6b7684]" />
              </div>
              {m.spark && (
                <svg viewBox="0 0 60 24" className="h-6 w-16 flex-shrink-0" fill="none" aria-hidden="true">
                  <polyline points="0,22 30,22 42,20 52,4 60,2" stroke="#1d7afc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="mt-2 text-[28px] font-extrabold leading-none tracking-[-0.5px] text-[#1a1f29] dark:text-[#e7edf4]">{m.value}</div>
            <div className={metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        {SECONDARY_METRICS.map((m) => (
          <div key={m.sub} className={card}>
            <div className={metricLabel}>
              {m.label}
              <Info className="size-3.5 text-[#8b95a4] dark:text-[#6b7684]" />
            </div>
            <div className="mt-2 text-[22px] font-extrabold leading-none text-[#1a1f29] dark:text-[#e7edf4]">{m.value}</div>
            <div className={metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold tracking-[-0.2px] text-[#1a1f29] dark:text-[#e7edf4]">Related work</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-[#eef1f5] p-0.5 dark:bg-[#1b2129]">
            {RELATED_TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors',
                  tab === t
                    ? 'bg-white text-[#1a6bde] shadow-sm dark:bg-[#151a21] dark:text-[#77affd]'
                    : 'text-[#4b5564] hover:text-[#1a1f29] dark:text-[#aeb8c4] dark:hover:text-[#e7edf4]',
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button type="button" className="grid size-9 place-items-center rounded-lg border border-[#e3e7ee] text-[#8b95a4] hover:bg-[#eef1f5] dark:border-white/[0.07] dark:text-[#6b7684] dark:hover:bg-[#1e242d]" title="Connect a tool">
            <Plug className="size-4.5" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-[#8b95a4] dark:text-[#6b7684]">
        Your team’s linked {tab.toLowerCase()} from the last 30 days, limited to your repository access.{' '}
        <a className="cursor-pointer text-[#1a6bde] underline-offset-2 hover:underline dark:text-[#77affd]">Learn more</a>
      </p>

      <div className={cn(card, 'mt-3 flex flex-col items-center justify-center px-6 py-16 text-center')}>
        <span className="mb-4 grid size-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#9b63ff,#1d7afc)] text-white shadow-[0_8px_30px_rgba(29,122,252,0.3)]">
          <GitPullRequest className="size-7" />
        </span>
        <h3 className="text-lg font-bold text-[#1a1f29] dark:text-[#e7edf4]">No {tab.toLowerCase()} yet</h3>
        <p className="mt-1 max-w-md text-[13px] text-[#8b95a4] dark:text-[#6b7684]">
          Connect a repository to see your team’s {tab.toLowerCase()} surface here automatically.
        </p>
      </div>
    </section>
  )
}

export default ProjectDevelopment
