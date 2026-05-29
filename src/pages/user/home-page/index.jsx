import { useOutletContext } from 'react-router-dom'

import RecentSpaces from './RecentSpaces'
import WorkTabs from './WorkTabs'

/**
 * DevHub "For you" home page for the user actor. Rendered inside the user layout's
 * <Outlet>; reads the shared search query from the outlet context.
 */
const UserHomePage = () => {
  const { query } = useOutletContext()

  return (
    <section className="mx-auto max-w-270 px-10 pb-20 pt-8.5">
      <h1 className="mb-1 text-[28px] font-extrabold tracking-[-0.6px] text-[#1a1f29] dark:text-[#e7edf4]">For you</h1>
      <p className="text-sm text-[#8b95a4] dark:text-[#6b7684]">Your spaces and work, all in one place.</p>
      <RecentSpaces />
      <div className="h-2.5" />
      <WorkTabs query={query} />
    </section>
  )
}

export default UserHomePage
