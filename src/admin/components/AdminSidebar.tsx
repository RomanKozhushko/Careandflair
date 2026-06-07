import type { AdminSection } from "@/admin/types";
import { AdminStatusBadge } from "./AdminStatusBadge";

type AdminSidebarProps = {
  sections: AdminSection[];
};

export function AdminSidebar({ sections }: AdminSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <div className="rounded-[2rem] border border-[#b07e33]/20 bg-[#061A17] p-5 text-white shadow-xl shadow-[#061A17]/10">
        <p className="brand-label text-xs brass-text">Care & Flair</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Admin MVP</h2>
        <p className="mt-3 text-sm leading-6 text-[#E6D6BD]">Local JSON preview foundation. Editing, auth and database integration come later.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <AdminStatusBadge status="readonly">Read-only</AdminStatusBadge>
          <AdminStatusBadge status="mock">Local/mock</AdminStatusBadge>
        </div>
        <nav className="mt-6 grid gap-2" aria-label="Admin sections">
          <a href="#dashboard" className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">Dashboard</a>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#E6D6BD] transition hover:bg-white/10 hover:text-white">
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
