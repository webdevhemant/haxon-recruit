import { Brand } from './brand'
import { SidebarNav } from './sidebar-nav'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center px-6">
        <Brand />
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <SidebarNav />
      </div>
    </aside>
  )
}
