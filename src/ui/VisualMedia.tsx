import Image from "next/image";

type VisualMediaProps = {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function BrandedPlaceholder({ label = "Care & Flair visual" }: { label?: string }) {
  return (
    <div className="flex h-full min-h-36 w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(215,181,109,0.34),transparent_28%),linear-gradient(135deg,#0f172a,#1e293b_55%,#f8f5ef)] p-5 text-center">
      <div className="rounded-3xl border border-white/20 bg-white/10 px-5 py-4 text-white shadow-2xl shadow-slate-950/20 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f8e7b0]">Care & Flair</p>
        <p className="mt-2 text-sm font-semibold">{label}</p>
      </div>
    </div>
  );
}

export function VisualMedia({ src, alt, label, className = "", imageClassName = "object-cover", sizes = "100vw", priority = false }: VisualMediaProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} className={imageClassName} sizes={sizes} />
      ) : (
        <BrandedPlaceholder label={label ?? alt} />
      )}
    </div>
  );
}
