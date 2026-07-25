import Link from "next/link";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import type { MarketingPageContent } from "@/marketing/pageContent";

function whatsappHref(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function MarketingLandingPage({
  content,
  page,
  showAreaLinks = false,
}: {
  content: ContentBundle;
  page: MarketingPageContent;
  showAreaLinks?: boolean;
}) {
  const { areas, beforeAfterItems, servicePackages, siteSettings, visibleSorted } = createContentHelpers(content);
  const packages = visibleSorted(servicePackages);
  const proof = visibleSorted(beforeAfterItems).filter((item) => item.beforeImage || item.afterImage).slice(0, 3);
  const wa = whatsappHref(siteSettings.phone, `Hi Care & Flair, I'd like a quote for ${page.title}. I can send photos and the deadline.`);

  return (
    <div className="min-h-screen bg-[var(--cf-ivory)] text-[var(--cf-text)]">
      <Header content={content} />
      <main>
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 rounded-[28px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)] lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">{page.eyebrow}</p>
              <h1 className="mt-5 font-serif text-[42px] font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--cf-navy)] sm:text-6xl">{page.title}</h1>
              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[var(--cf-text-soft)]">{page.intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={wa} className="inline-flex h-12 items-center justify-center rounded-[14px] border border-[rgba(8,27,45,0.16)] bg-white px-6 text-sm font-extrabold text-[var(--cf-navy)] shadow-sm transition hover:-translate-y-px">
                  {page.primaryCta ?? "Send photos on WhatsApp"}
                </a>
                <Link href="/quote" className="inline-flex h-12 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-6 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(138,15,46,0.2)] transition hover:-translate-y-px">
                  {page.secondaryCta ?? "Get a quote"}
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.bullets.map((bullet) => (
                <div key={bullet} className="rounded-[18px] border border-[var(--cf-border)] bg-[var(--cf-ivory)] p-4 text-sm font-bold leading-6 text-[var(--cf-navy)]">
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-5 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
              <h2 className="font-serif text-[28px] font-semibold leading-tight text-[var(--cf-navy)]">{section.title}</h2>
              <p className="mt-4 text-[15px] leading-7 text-[var(--cf-text-soft)]">{section.text}</p>
              {section.bullets ? (
                <ul className="mt-4 grid gap-2 text-sm font-semibold text-[var(--cf-navy)]">
                  {section.bullets.map((bullet) => <li key={bullet}>- {bullet}</li>)}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[var(--cf-border-dark)] bg-[linear-gradient(135deg,var(--cf-navy),var(--cf-navy-2))] p-6 text-white shadow-[var(--cf-shadow-navy)] lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold-soft)]">Proof</p>
                <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight">Visible results matter.</h2>
                <p className="mt-4 text-[16px] leading-7 text-white/78">Before/after evidence, photo updates and a clear scope help you see what was handled.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {proof.map((item) => (
                  <article key={item.id} className="rounded-[20px] border border-white/14 bg-white/[0.06] p-4">
                    <p className="text-sm font-black text-[var(--cf-gold-soft)]">{item.location}</p>
                    <h3 className="mt-3 text-lg font-extrabold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/76">{item.result}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {packages.length ? (
          <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-3">
              {packages.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">From £{item.startingPrice.toLocaleString("en-GB")}</p>
                  <h2 className="mt-3 text-[22px] font-extrabold text-[var(--cf-navy)]">{item.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--cf-text-soft)]">{item.description}</p>
                  <Link href={`/quote?preset=${item.id}`} className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-4 text-sm font-extrabold text-white">
                    Get {item.name} quote
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {showAreaLinks ? (
          <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
              <h2 className="font-serif text-[32px] font-semibold text-[var(--cf-navy)]">Local area pages</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {visibleSorted(areas).map((area) => (
                  <Link key={area.id} href={`/areas/${area.id}`} className="rounded-full border border-[var(--cf-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--cf-navy)] hover:border-[var(--cf-gold)]">
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer content={content} />
    </div>
  );
}
