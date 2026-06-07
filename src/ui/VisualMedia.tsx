import Image from "next/image";

type VisualMediaProps = {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
};

export function BrandedPlaceholder({ label = "Care & Flair visual" }: { label?: string }) {
  return (
    <div className="flex h-full min-h-36 w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0f172a,#1e293b_55%,#f5ecdc)] p-5 text-center">
      <div className="rounded-3xl border border-white/20 bg-white/10 px-5 py-4 text-white shadow-md shadow-slate-950/10">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f8e7b0]">Care & Flair</p>
        <p className="mt-2 text-sm font-semibold">{label}</p>
      </div>
    </div>
  );
}

export function VisualMedia({ src, alt, label, className = "", imageClassName = "object-cover", sizes = "100vw", priority = false, quality = 72 }: VisualMediaProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} quality={quality} className={imageClassName} sizes={sizes} />
      ) : (
        <BrandedPlaceholder label={label ?? alt} />
      )}
    </div>
  );
}
