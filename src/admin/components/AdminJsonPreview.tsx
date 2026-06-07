import type { JsonValue } from "@/admin/types";

type AdminJsonPreviewProps = {
  data: JsonValue;
};

export function AdminJsonPreview({ data }: AdminJsonPreviewProps) {
  return (
    <details className="rounded-2xl border border-[#b07e33]/20 bg-[#061A17] text-[#f5ecdc]">
      <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-[#b07e33]">JSON preview</summary>
      <pre className="max-h-80 overflow-auto border-t border-[#b07e33]/20 p-4 text-xs leading-5 text-[#E6D6BD]">{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}
