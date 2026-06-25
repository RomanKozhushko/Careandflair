"use client";

import { useEffect, useMemo, useState } from "react";
import { quoteRequestStatuses, type QuoteRequestRecord, type QuoteRequestStatus } from "@/lib/quoteRequests";

type LoadState = "loading" | "ready" | "error";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatMoney(value?: number | null) {
  if (typeof value !== "number") return "-";
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);
}

function summarizeJson(value: unknown) {
  if (!value) return "-";
  if (Array.isArray(value)) {
    if (value.length === 0) return "-";
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "title" in item) return String(item.title);
        if (item && typeof item === "object" && "id" in item) return String(item.id);
        return JSON.stringify(item);
      })
      .join(", ");
  }
  return typeof value === "string" ? value : JSON.stringify(value);
}

export function AdminQuoteRequests() {
  const [items, setItems] = useState<QuoteRequestRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0], [items, selectedId]);

  async function loadItems() {
    setState("loading");
    setMessage("");

    const response = await fetch("/api/admin/quote-requests");
    const result = (await response.json().catch(() => null)) as { items?: QuoteRequestRecord[]; error?: string } | null;

    if (!response.ok || !result?.items) {
      setItems([]);
      setState("error");
      setMessage(result?.error ?? "Quote requests could not be loaded.");
      return;
    }

    setItems(result.items);
    setSelectedId((current) => current ?? result.items?.[0]?.id ?? null);
    setState("ready");
  }

  async function updateSelected(updates: { status?: QuoteRequestStatus; admin_notes?: string | null }) {
    if (!selected) return;
    setSaving(true);
    setMessage("");

    const response = await fetch(`/api/admin/quote-requests/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const result = (await response.json().catch(() => null)) as { item?: QuoteRequestRecord; error?: string } | null;

    if (!response.ok || !result?.item) {
      setMessage(result?.error ?? "Quote request could not be updated.");
      setSaving(false);
      return;
    }

    setItems((current) => current.map((item) => (item.id === result.item?.id ? result.item : item)));
    setSaving(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadItems();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="quote-requests" className="scroll-mt-6 rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#746754]">Supabase database</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0a2a24]">Quote Requests</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#746754]">
            Newest quote builder submissions. This is a simple inbox only, not a CRM.
          </p>
        </div>
        <button type="button" onClick={() => void loadItems()} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-semibold text-[#0a2a24] hover:border-[#b07e33]/55">
          Refresh
        </button>
      </div>

      {state === "loading" ? <p className="mt-5 rounded-2xl bg-[#f5ecdc] p-4 text-sm text-[#746754]">Loading quote requests...</p> : null}
      {message ? <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">{message}</p> : null}

      {state === "ready" && items.length === 0 ? (
        <p className="mt-5 rounded-2xl bg-[#f5ecdc] p-4 text-sm text-[#746754]">No quote requests yet.</p>
      ) : null}

      {items.length > 0 ? (
        <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-2xl border border-[#E6D6BD]">
            <div className="grid grid-cols-[1fr_7rem] bg-[#f5ecdc] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#746754]">
              <span>Request</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-[#E6D6BD]">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`grid w-full grid-cols-[1fr_7rem] gap-3 px-4 py-3 text-left text-sm transition ${selected?.id === item.id ? "bg-[#fbf6ee]" : "bg-white hover:bg-[#f5ecdc]"}`}
                >
                  <span>
                    <span className="block font-semibold text-[#0a2a24]">{item.name || "No name"} · {item.postcode || "No postcode"}</span>
                    <span className="mt-1 block text-xs text-[#746754]">{formatDate(item.created_at)} · {item.selected_package || item.service_type || "No package"}</span>
                  </span>
                  <span className="self-center rounded-full border border-[#E6D6BD] bg-white px-3 py-1 text-center text-xs font-semibold text-[#0a2a24]">{item.status}</span>
                </button>
              ))}
            </div>
          </div>

          {selected ? (
            <div className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#746754]">Client</p>
                  <h3 className="mt-1 text-xl font-bold text-[#0a2a24]">{selected.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#14241F]">{selected.phone || "-"} · {selected.email || "-"}</p>
                  <p className="text-sm leading-6 text-[#14241F]">{selected.postcode || "-"}</p>
                </div>
                <div className="grid gap-3">
                  <label className="text-sm font-semibold text-[#14241F]">
                    Status
                    <select
                      value={selected.status}
                      onChange={(event) => void updateSelected({ status: event.target.value as QuoteRequestStatus })}
                      disabled={saving}
                      className="mt-2 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-2 text-sm font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                    >
                      {quoteRequestStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </label>
                  <p className="text-sm text-[#746754]">Created: {formatDate(selected.created_at)}</p>
                </div>
              </div>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold text-[#746754]">Service type</dt><dd className="mt-1 text-[#14241F]">{selected.service_type || "-"}</dd></div>
                <div><dt className="font-semibold text-[#746754]">Selected package</dt><dd className="mt-1 text-[#14241F]">{selected.selected_package || "-"}</dd></div>
                <div><dt className="font-semibold text-[#746754]">Property</dt><dd className="mt-1 text-[#14241F]">{selected.property_category || "-"} · {selected.property_type || "-"}</dd></div>
                <div><dt className="font-semibold text-[#746754]">Estimated price</dt><dd className="mt-1 text-[#14241F]">{formatMoney(selected.estimated_price)}</dd></div>
                <div className="sm:col-span-2"><dt className="font-semibold text-[#746754]">Problems</dt><dd className="mt-1 text-[#14241F]">{summarizeJson(selected.selected_problems)}</dd></div>
                <div className="sm:col-span-2"><dt className="font-semibold text-[#746754]">Upgrades</dt><dd className="mt-1 text-[#14241F]">{summarizeJson(selected.selected_upgrades)}</dd></div>
                <div className="sm:col-span-2"><dt className="font-semibold text-[#746754]">Message</dt><dd className="mt-1 whitespace-pre-wrap text-[#14241F]">{selected.message || "-"}</dd></div>
              </dl>

              <label className="mt-5 block text-sm font-semibold text-[#14241F]">
                Admin notes
                <textarea
                  value={selected.admin_notes ?? ""}
                  onChange={(event) => setItems((current) => current.map((item) => (item.id === selected.id ? { ...item, admin_notes: event.target.value } : item)))}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-2 text-sm font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                />
              </label>
              <button
                type="button"
                onClick={() => void updateSelected({ admin_notes: selected.admin_notes ?? null })}
                disabled={saving}
                className="mt-3 rounded-full bg-[#0a2a24] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save notes"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
