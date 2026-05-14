import type { AdminSection } from "@/admin/types";

type AdminStatusBadgeProps = {
  status: AdminSection["status"] | "warning" | "readonly" | "active";
  children: string;
};

const styles: Record<AdminStatusBadgeProps["status"], string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  live: "border-emerald-200 bg-emerald-50 text-emerald-800",
  mock: "border-amber-200 bg-amber-50 text-amber-800",
  readonly: "border-sky-200 bg-sky-50 text-sky-800",
  warning: "border-red-200 bg-red-50 text-red-800",
  "coming-soon": "border-slate-200 bg-slate-100 text-slate-700",
};

export function AdminStatusBadge({ status, children }: AdminStatusBadgeProps) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${styles[status]}`}>{children}</span>;
}
