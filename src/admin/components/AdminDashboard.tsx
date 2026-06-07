import type { AdminSection, JsonValue } from "@/admin/types";
import { AdminStatusBadge } from "./AdminStatusBadge";

type AdminDashboardProps = {
  sections: AdminSection[];
  stats: {
    packages: number;
    solutions: number;
    beforeAfter: number;
    interactiveProblems: number;
    faqs: number;
  };
  activeRoutes: string[];
};

function countGroups(value: JsonValue): number {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return 1;
}

export function AdminDashboard({ sections, stats, activeRoutes }: AdminDashboardProps) {
  const statCards = [
    ["Packages", stats.packages],
    ["Solutions", stats.solutions],
    ["Before/after cases", stats.beforeAfter],
    ["Interactive problems", stats.interactiveProblems],
    ["FAQs", stats.faqs],
    ["Admin sections", sections.length],
  ] as const;

  return (
    <section id="dashboard" className="scroll-mt-6 rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="brand-label text-xs text-[#b07e33]">Phase 3</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0a2a24] sm:text-4xl">Admin MVP Foundation</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#746754]">Preview local JSON content and admin information architecture before Phase 3.1 editable admin work.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminStatusBadge status="warning">Unprotected MVP</AdminStatusBadge>
          <AdminStatusBadge status="readonly">No database</AdminStatusBadge>
          <AdminStatusBadge status="mock">Mock/local only</AdminStatusBadge>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-900">
        This admin MVP is not protected. Do not deploy as production admin without authentication.
        <br />Admin is currently local/mock only. No production auth yet.
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">{label}</p>
            <p className="mt-2 text-3xl font-black text-[#0a2a24]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E6D6BD] p-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#746754]">Active routes</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeRoutes.map((route) => <AdminStatusBadge key={route} status="active">{route}</AdminStatusBadge>)}
          </div>
        </div>
        <div className="rounded-2xl border border-[#E6D6BD] p-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#746754]">Section data sources</h2>
          <ul className="mt-3 grid gap-2 text-sm text-[#14241F]">
            {sections.map((section) => <li key={section.id} className="flex justify-between gap-3"><span>{section.label}</span><span className="font-mono text-xs text-[#746754]">{countGroups(section.items)}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
