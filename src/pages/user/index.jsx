import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import ChatBar from './ChatBar'
import Header from './Header'
import Sidebar from './Sidebar'

/**
 * User actor layout. Owns local theme (dark/light), sidebar collapse, the Spaces
 * dropdown, and the shared search query, then renders the top bar, left nav, and
 * the routed page via <Outlet>. Light/dark is driven by toggling the `dark` class
 * on the outer wrapper so every descendant resolves the project's `dark:` variants.
 */
const UserRootPage = () => {
  const [theme, setTheme] = useState('dark')
  const [collapsed, setCollapsed] = useState(false)
  const [spacesOpen, setSpacesOpen] = useState(true)
  const [view, setView] = useState('foryou')
  const [activeSpace, setActiveSpace] = useState(null)
  const [query, setQuery] = useState('')

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex h-svh flex-col overflow-hidden bg-[#eef1f5] text-[#1a1f29] dark:bg-[#0c0f13] dark:text-[#e7edf4]">
        <Header
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          query={query}
          setQuery={setQuery}
        />
        <div className="flex min-h-0 flex-1">
          <Sidebar
            collapsed={collapsed}
            view={view}
            setView={setView}
            spacesOpen={spacesOpen}
            setSpacesOpen={setSpacesOpen}
            activeSpace={activeSpace}
            setActiveSpace={setActiveSpace}
          />
          <main className="flex-1 overflow-y-auto bg-[#f7f8fa] dark:bg-[#0f1318]">
            <Outlet context={{ query }} />
          </main>
          <ChatBar />
        </div>
      </div>
    </div>
  )
}

export default UserRootPage
