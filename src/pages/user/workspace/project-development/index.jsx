import { useState } from 'react'
import { ExternalLink, GitBranch, Info, Plug } from 'lucide-react'

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

const RELATED_TABS = ['Pull requests', 'Repositories', 'Deployments']

const card = 'rounded-xl border border-[#e3e7ee] bg-white p-4 dark:border-white/[0.07] dark:bg-[#151a21]'
const metricLabel = 'flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1f29] dark:text-[#e7edf4]'
const metricSub = 'mt-0.5 text-[12.5px] text-[#8b95a4] dark:text-[#6b7684]'

/** Workspace "Development" view — DevOps key metrics + related-work panel. */
const ProjectDevelopment = () => {
  const [tab, setTab] = useState('Deployments')

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
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <a
            href="https://github.com/org/apollo-api"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#e3e7ee] px-3 py-1.5 text-sm font-medium text-[#1a1f29] hover:bg-[#eef1f5] dark:border-white/[0.07] dark:text-[#e7edf4] dark:hover:bg-[#1e242d]"
          >
            github.com/org/apollo-api
            <ExternalLink className="size-3.5 text-[#8b95a4] dark:text-[#6b7684]" />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {RELATED_TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors',
                  tab === t
                    ? 'border border-[#e3e7ee] bg-white text-[#1a1f29] shadow-sm dark:border-white/[0.07] dark:bg-[#1e242d] dark:text-[#e7edf4]'
                    : 'border border-transparent text-[#4b5564] hover:text-[#1a1f29] dark:text-[#aeb8c4] dark:hover:text-[#e7edf4]',
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
          <GitBranch className="size-7" />
        </span>
        <h3 className="text-lg font-bold text-[#1a1f29] dark:text-[#e7edf4]">No {tab.toLowerCase()} to show yet</h3>
        <p className="mt-1 max-w-md text-[13px] text-[#8b95a4] dark:text-[#6b7684]">
          Once your repository activity syncs, it will appear here automatically.
        </p>
      </div>
    </section>
  )
}

export default ProjectDevelopment
