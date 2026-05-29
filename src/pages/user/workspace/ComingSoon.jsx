import { Construction } from 'lucide-react'

/**
 * Generic placeholder for workspace tabs that aren't built yet (Summary, Board,
 * Backlog, Timeline, Docs, Forms, Reports, Calendar). Rendered into the
 * workspace <Outlet> so the tab bar stays fully navigable.
 * @param {{ title: string }} props
 */
const WorkspaceComingSoon = ({ title }) => (
  <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
    <Construction className="mb-4 size-12 text-[#8b95a4] dark:text-[#6b7684]" />
    <h2 className="text-lg font-bold text-[#1a1f29] dark:text-[#e7edf4]">{title}</h2>
    <p className="mt-1 text-sm text-[#8b95a4] dark:text-[#6b7684]">This view isn’t available yet — coming soon.</p>
  </section>
)

export default WorkspaceComingSoon
