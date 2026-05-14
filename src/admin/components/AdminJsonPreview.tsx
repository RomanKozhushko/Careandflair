import type { JsonValue } from "@/admin/types";

type AdminJsonPreviewProps = {
  data: JsonValue;
};

export function AdminJsonPreview({ data }: AdminJsonPreviewProps) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-950 text-slate-100">
      <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-[#d7b56d]">JSON preview</summary>
      <pre className="max-h-80 overflow-auto border-t border-white/10 p-4 text-xs leading-5 text-slate-200">{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}
