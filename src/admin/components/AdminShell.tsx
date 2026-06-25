import type { AdminSection } from "@/admin/types";
import { AdminDashboard } from "./AdminDashboard";
import { AdminDataTable } from "./AdminDataTable";
import { AdminJsonPreview } from "./AdminJsonPreview";
import { AdminQuoteRequests } from "./AdminQuoteRequests";
import { AdminSectionCard } from "./AdminSectionCard";
import { AdminSidebar } from "./AdminSidebar";

type AdminShellProps = {
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

export function AdminShell({ sections, stats, activeRoutes }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-[#f5ecdc] px-4 py-6 text-[#14241F] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[18rem_1fr]">
        <AdminSidebar sections={sections} />
        <div className="grid gap-6">
          <AdminDashboard sections={sections} stats={stats} activeRoutes={activeRoutes} />
          <AdminQuoteRequests />
          {sections.map((section) => (
            <AdminSectionCard key={section.id} section={section}>
              <div className="grid gap-4">
                <AdminDataTable items={section.items} fields={section.previewFields} />
                <AdminJsonPreview data={section.items} />
              </div>
            </AdminSectionCard>
          ))}
        </div>
      </div>
    </main>
  );
}
