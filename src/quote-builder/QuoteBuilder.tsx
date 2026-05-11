"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { optionalUpgrades, pricingMatrix, propertyCategories, propertyTypes, quoteBuilderConfig, servicePackages, visibleSorted } from "@/lib/content";
import { estimateQuote } from "@/lib/pricing";
import { parseProblemParams } from "@/lib/quotePrefill";
import { createInitialQuoteSelection, findSelectedCategory, findSelectedPackage, findSelectedPropertyType, findSelectedUpgrades, isContactComplete } from "@/lib/quote";
import type { QuoteSelection } from "@/lib/types";
import { ContactDetailsStep } from "@/quote-builder/ContactDetailsStep";
import { PackageStep } from "@/quote-builder/PackageStep";
import { PriceEstimator } from "@/quote-builder/PriceEstimator";
import { PropertyCategoryStep } from "@/quote-builder/PropertyCategoryStep";
import { PropertyTypeStep } from "@/quote-builder/PropertyTypeStep";
import { QuoteSummary } from "@/quote-builder/QuoteSummary";
import { UpgradesStep } from "@/quote-builder/UpgradesStep";

export function QuoteBuilder() {
  const searchParams = useSearchParams();
  const packages = useMemo(() => visibleSorted(servicePackages), []);
  const categories = useMemo(() => visibleSorted(propertyCategories), []);
  const types = useMemo(() => visibleSorted(propertyTypes), []);
  const upgrades = useMemo(() => visibleSorted(optionalUpgrades), []);
  const preset = searchParams?.get("preset") ?? null;
  const upgrade = searchParams?.get("upgrade") ?? null;
  const mode = searchParams?.get("mode") ?? null;
  const score = searchParams?.get("score") ?? null;
  const problems = parseProblemParams(searchParams?.get("problems") ?? null);
  const hasInteractivePrefill = Boolean(mode || score || problems.length);
  const [selection, setSelection] = useState<QuoteSelection>(() => createInitialQuoteSelection(preset, upgrade));
  const [stepIndex, setStepIndex] = useState(preset ? 1 : 0);
  const [submitted, setSubmitted] = useState(false);

  const estimate = estimateQuote(selection, pricingMatrix, upgrades);
  const selectedPackage = findSelectedPackage(selection, packages);
  const selectedCategory = findSelectedCategory(selection, categories);
  const selectedPropertyType = findSelectedPropertyType(selection, types);
  const selectedUpgrades = findSelectedUpgrades(selection, upgrades);
  const config = quoteBuilderConfig;

  function updateSelection(next: Partial<QuoteSelection>) {
    setSubmitted(false);
    setSelection((current) => ({ ...current, ...next }));
  }

  function canContinue() {
    if (stepIndex === 0) return Boolean(selection.packageId);
    if (stepIndex === 1) return Boolean(selection.propertyCategoryId);
    if (stepIndex === 2) return Boolean(selection.propertyTypeId);
    if (stepIndex === 3) return true;
    return isContactComplete(selection.contact);
  }

  function next() {
    if (!canContinue()) return;
    setStepIndex((current) => Math.min(config.steps.length - 1, current + 1));
  }

  function back() {
    setStepIndex((current) => Math.max(0, current - 1));
  }

  function toggleUpgrade(id: string) {
    const upgradeIds = selection.upgradeIds.includes(id) ? selection.upgradeIds.filter((item) => item !== id) : [...selection.upgradeIds, id];
    updateSelection({ upgradeIds });
  }

  function submit() {
    if (!canContinue()) return;
    setSubmitted(true);
  }

  function reset() {
    setSelection(createInitialQuoteSelection(null, null));
    setStepIndex(0);
    setSubmitted(false);
  }

  const currentStep = [
    <PackageStep key="package" config={config} packages={packages} selectedId={selection.packageId} onSelect={(packageId) => updateSelection({ packageId })} />,
    <PropertyCategoryStep key="category" config={config} categories={categories} selectedId={selection.propertyCategoryId} onSelect={(propertyCategoryId) => updateSelection({ propertyCategoryId, propertyTypeId: undefined })} />,
    <PropertyTypeStep key="type" config={config} propertyTypes={types} categoryId={selection.propertyCategoryId} selectedId={selection.propertyTypeId} onSelect={(propertyTypeId) => updateSelection({ propertyTypeId })} />,
    <UpgradesStep key="upgrades" config={config} upgrades={upgrades} selectedIds={selection.upgradeIds} onToggle={toggleUpgrade} />,
    <ContactDetailsStep key="contact" config={config} contact={selection.contact} onChange={(contact) => updateSelection({ contact })} />,
  ][stepIndex];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {hasInteractivePrefill ? (
          <div className="mb-6 rounded-3xl border border-[#d7b56d]/40 bg-[#fff7df] p-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-950">Based on your reset score, we pre-selected a recommended reset path.</p>
            <p className="mt-1 break-words">{score ? `Score: ${score}/100. ` : ""}{mode ? `Mode: ${mode}. ` : ""}{problems.length ? `Problems: ${problems.join(", ")}.` : ""}</p>
          </div>
        ) : null}
        <div className="mb-8 grid gap-2 sm:grid-cols-5">
          {config.steps.map((step, index) => (
            <button key={step} type="button" onClick={() => setStepIndex(index)} className={`rounded-full px-3 py-2 text-xs font-bold transition ${index === stepIndex ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
              {index + 1}. {config.stepLabels[step]}
            </button>
          ))}
        </div>

        {submitted ? (
          <QuoteSummary config={config} selectedPackage={selectedPackage} selectedCategory={selectedCategory} selectedPropertyType={selectedPropertyType} selectedUpgrades={selectedUpgrades} estimate={estimate} contact={selection.contact} success />
        ) : currentStep}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button type="button" onClick={back} disabled={stepIndex === 0 || submitted} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40">{config.actions.back}</button>
          <div className="flex gap-3">
            {submitted ? <button type="button" onClick={reset} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300">{config.actions.startAgain}</button> : null}
            {!submitted && stepIndex < config.steps.length - 1 ? <button type="button" onClick={next} disabled={!canContinue()} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">{config.actions.next}</button> : null}
            {!submitted && stepIndex === config.steps.length - 1 ? <button type="button" onClick={submit} disabled={!canContinue()} className="rounded-full bg-[#d7b56d] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e4c77f] disabled:cursor-not-allowed disabled:opacity-40">{config.actions.submit}</button> : null}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <PriceEstimator config={config} estimate={estimate} />
        {!submitted ? <QuoteSummary config={config} selectedPackage={selectedPackage} selectedCategory={selectedCategory} selectedPropertyType={selectedPropertyType} selectedUpgrades={selectedUpgrades} estimate={estimate} /> : null}
      </div>
    </div>
  );
}
