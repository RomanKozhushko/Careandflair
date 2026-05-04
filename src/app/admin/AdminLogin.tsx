"use client";

import { useState } from "react";

export default function AdminLogin({ passwordConfigured }: { passwordConfigured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!passwordConfigured) return;

    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    setError(result?.error ?? "Login failed.");
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section className="w-full max-w-lg rounded-3xl border border-amber-200/20 bg-slate-900 p-6 shadow-2xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Admin locked</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Care & Flair Admin</h1>
        <p className="mt-3 text-slate-300">
          {passwordConfigured
            ? "Enter the temporary admin password to edit local JSON content."
            : "ADMIN_PASSWORD is not configured. Admin editing is disabled until it is set in the environment."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-bold text-slate-200">
            Admin password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!passwordConfigured}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-amber-300/30 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>

          <button
            type="submit"
            disabled={!passwordConfigured || loading}
            className="w-full rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking..." : "Unlock admin"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </section>
    </main>
  );
}
