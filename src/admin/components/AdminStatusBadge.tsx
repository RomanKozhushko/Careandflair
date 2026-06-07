import type { AdminSection } from "@/admin/types";

type AdminStatusBadgeProps = {
  status: AdminSection["status"] | "warning" | "readonly" | "active";
  children: string;
};

const styles: Record<AdminStatusBadgeProps["status"], string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  live: "border-emerald-200 bg-emerald-50 text-emerald-800",
  mock: "border-[#b07e33]/25 bg-[#E6D6BD]/55 text-[#14241F]",
  readonly: "border-[#E6D6BD] bg-white text-[#0a2a24]",
  warning: "border-red-200 bg-red-50 text-red-800",
  "coming-soon": "border-[#E6D6BD] bg-[#f5ecdc] text-[#746754]",
};

export function AdminStatusBadge({ status, children }: AdminStatusBadgeProps) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${styles[status]}`}>{children}</span>;
}
