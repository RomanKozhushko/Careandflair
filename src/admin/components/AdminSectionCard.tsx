import type { ReactNode } from "react";
import type { AdminSection } from "@/admin/types";
import { AdminStatusBadge } from "./AdminStatusBadge";

type AdminSectionCardProps = {
  section: AdminSection;
  children: ReactNode;
};

function itemCount(items: AdminSection["items"]): string {
  if (Array.isArray(items)) return `${items.length} items`;
  if (items && typeof items === "object") return `${Object.keys(items).length} groups`;
  return "1 item";
}

export function AdminSectionCard({ section, children }: AdminSectionCardProps) {
  return (
    <section id={section.id} className="scroll-mt-6 rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-[#E6D6BD] pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="brand-label text-xs brass-text">{section.fileName}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0a2a24]">{section.label}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#746754]">{section.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminStatusBadge status={section.status}>{section.status === "coming-soon" ? "Coming soon" : section.status}</AdminStatusBadge>
          <AdminStatusBadge status="readonly">{itemCount(section.items)}</AdminStatusBadge>
          <button type="button" disabled className="rounded-full border border-[#E6D6BD] bg-[#f5ecdc] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#746754]/60">
            Edit disabled
          </button>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
