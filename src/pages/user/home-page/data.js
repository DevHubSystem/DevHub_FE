// data.js — mock dev-flavoured data for the DevHub "For you" home page.
// Pure data only; all styling lives in the components as Tailwind classes.

export const SPACES = [
  { id: 'apollo', name: 'Apollo API', type: 'Team-managed software', color: '#1d7afc', letter: 'AP', boards: 2, starred: true, open: 8, done: 41 },
  { id: 'nebula', name: 'Nebula Web', type: 'Company-managed software', color: '#7b5bff', letter: 'NB', boards: 1, starred: false, open: 5, done: 33 },
  { id: 'orbit', name: 'Orbit Mobile', type: 'Team-managed software', color: '#1aa06d', letter: 'OR', boards: 1, starred: true, open: 3, done: 27 },
  { id: 'pipe', name: 'Pipeline CI', type: 'Team-managed software', color: '#f0913b', letter: 'PI', boards: 1, starred: false, open: 6, done: 19 },
]

// People referenced by work items. `color` is a CSS gradient used via inline style.
export const PEOPLE = {
  you: { name: 'You', init: 'YK', color: 'linear-gradient(135deg,#ff9a62,#ff5e8a)' },
  maya: { name: 'Maya Chen', init: 'MC', color: 'linear-gradient(135deg,#1d7afc,#5b8def)' },
  dev: { name: 'Dev Patel', init: 'DP', color: 'linear-gradient(135deg,#1aa06d,#3bbd75)' },
  lina: { name: 'Lina Ortiz', init: 'LO', color: 'linear-gradient(135deg,#7b5bff,#b18bff)' },
}

// Status key -> display label. Pill colours are mapped in the WorkRow component.
export const STATUS = {
  todo: { label: 'To Do' },
  prog: { label: 'In Progress' },
  review: { label: 'In Review' },
  done: { label: 'Done' },
}

// Work-item type -> { icon (lucide name resolved in WorkRow), color }.
export const TYPES = {
  story: { icon: 'story', color: '#1aa06d' },
  task: { icon: 'task', color: '#1d7afc' },
  bug: { icon: 'bug', color: '#e5484d' },
  epic: { icon: 'epic', color: '#7b5bff' },
}

// Each tab has its own ordered list of items.
export const WORK = {
  worked: [
    { key: 'APOLLO-238', title: 'Rate-limit middleware for public REST gateway', type: 'task', status: 'prog', space: 'Apollo API', when: 'Edited 2h ago', who: 'you' },
    { key: 'PIPE-77', title: 'Flaky e2e test on deploy-preview workflow', type: 'bug', status: 'review', space: 'Pipeline CI', when: 'Edited 5h ago', who: 'you' },
    { key: 'NEBULA-401', title: 'Dark-mode token audit across design system', type: 'story', status: 'prog', space: 'Nebula Web', when: 'Edited yesterday', who: 'maya' },
    { key: 'ORBIT-19', title: 'Offline cache eviction policy', type: 'task', status: 'done', space: 'Orbit Mobile', when: 'Edited 2d ago', who: 'you' },
  ],
  viewed: [
    { key: 'NEBULA-401', title: 'Dark-mode token audit across design system', type: 'story', status: 'prog', space: 'Nebula Web', when: 'Viewed 30m ago', who: 'maya' },
    { key: 'APOLLO-230', title: 'GraphQL schema federation spike', type: 'epic', status: 'review', space: 'Apollo API', when: 'Viewed 3h ago', who: 'dev' },
    { key: 'ORBIT-22', title: 'Push notification batching', type: 'task', status: 'todo', space: 'Orbit Mobile', when: 'Viewed 6h ago', who: 'lina' },
    { key: 'PIPE-77', title: 'Flaky e2e test on deploy-preview workflow', type: 'bug', status: 'review', space: 'Pipeline CI', when: 'Viewed yesterday', who: 'you' },
    { key: 'APOLLO-238', title: 'Rate-limit middleware for public REST gateway', type: 'task', status: 'prog', space: 'Apollo API', when: 'Viewed yesterday', who: 'you' },
  ],
  assigned: [
    { key: 'APOLLO-238', title: 'Rate-limit middleware for public REST gateway', type: 'task', status: 'prog', space: 'Apollo API', when: 'Sprint 14', who: 'you' },
    { key: 'APOLLO-241', title: 'Webhook retry with exponential backoff', type: 'story', status: 'prog', space: 'Apollo API', when: 'Sprint 14', who: 'you' },
    { key: 'PIPE-77', title: 'Flaky e2e test on deploy-preview workflow', type: 'bug', status: 'review', space: 'Pipeline CI', when: 'Sprint 14', who: 'you' },
    { key: 'ORBIT-31', title: 'Crash on cold-start with empty auth token', type: 'bug', status: 'todo', space: 'Orbit Mobile', when: 'Backlog', who: 'you' },
    { key: 'NEBULA-410', title: 'Migrate settings page to new layout primitives', type: 'task', status: 'todo', space: 'Nebula Web', when: 'Backlog', who: 'you' },
  ],
}

// Group order used when rendering work items (grouped by status, like Jira).
export const GROUP_ORDER = ['prog', 'review', 'todo', 'done']
