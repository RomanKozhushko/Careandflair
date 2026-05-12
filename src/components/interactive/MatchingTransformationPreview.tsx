import beforeAfterData from "@/data/before-after.json";
import type { BeforeAfterItem } from "@/lib/types";

const categoryToCaseId: Record<string, string> = {
  mould: "mould-wet-area-preview",
  bathroom: "bathroom-reset-preview",
  "patio-driveway": "driveway-kerb-appeal-preview",
  carpet: "carpet-extraction-preview",
  odour: "carpet-extraction-preview",
  windows: "window-frame-detail-preview",
  kitchen: "kitchen-turnover-preview",
  exterior: "exterior-entrance-preview",
  "full-property": "full-property-reset-preview",
};

type MatchingTransformationPreviewProps = {
  label: string;
  category?: string;
  fallbackTitle: string;
  fallbackText: string;
};

function findCase(category?: string) {
  const items = beforeAfterData as BeforeAfterItem[];
  const caseId = category ? categoryToCaseId[category] : undefined;
  return items.find((item) => item.visible && item.id === caseId) ?? items.find((item) => item.visible && item.id === "full-property-reset-preview");
}

function VisualFallback({ title }: { title: string }) {
  return (
    <div className="grid min-h-48 place-items-center rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,_#f4d98b,_transparent_30%),linear-gradient(135deg,_#0f172a,_#334155)] p-6 text-center text-white">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Care & Flair</p>
        <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
        <p className="mt-2 text-sm text-slate-300">Premium property reset preview</p>
      </div>
    </div>
  );
}

export function MatchingTransformationPreview({ label, category, fallbackTitle, fallbackText }: MatchingTransformationPreviewProps) {
  const item = findCase(category);
  if (!item) return null;

  const hasImages = Boolean(item.beforeImage && item.afterImage);

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {hasImages ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <img className="h-44 w-full rounded-[1.5rem] object-cover" src={item.beforeImage} alt={item.beforeAlt} />
            <img className="h-44 w-full rounded-[1.5rem] object-cover" src={item.afterImage} alt={item.afterAlt} />
          </div>
        ) : (
          <VisualFallback title={fallbackTitle} />
        )}
        <div>
          <h4 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h4>
          <p className="mt-2 text-sm font-semibold text-[#9b7b35]">{item.serviceType}</p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
            <p><span className="font-semibold text-slate-950">Problem:</span> {item.problem}</p>
            <p><span className="font-semibold text-slate-950">Solution:</span> {item.solution}</p>
            <p><span className="font-semibold text-slate-950">Result:</span> {item.result}</p>
            {!hasImages ? <p className="rounded-2xl bg-[#fff7df] p-3 text-slate-700">{fallbackText}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
