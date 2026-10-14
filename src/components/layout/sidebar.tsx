import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/80 bg-sidebar px-4 py-5 lg:flex">
      <SidebarContent />
    </aside>
  );
}
