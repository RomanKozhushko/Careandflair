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
    <main className="flex min-h-screen items-center justify-center bg-[#061A17] px-4 text-[#f5ecdc]">
      <section className="w-full max-w-lg rounded-3xl border border-[#b07e33]/20 bg-[#0a2a24] p-6 shadow-2xl shadow-black/30">
        <p className="brand-label text-sm brass-text">Admin access</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Care & Flair Admin</h1>
        <p className="mt-3 text-[#E6D6BD]">
          {passwordConfigured
            ? "Enter the admin password to edit live site content."
            : "ADMIN_PASSWORD is not configured. Admin editing is disabled until it is set in the environment."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-bold text-[#f5ecdc]">
            Admin password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!passwordConfigured}
              className="mt-2 w-full rounded-2xl border border-[#b07e33]/20 bg-[#061A17] px-4 py-3 text-[#f5ecdc] outline-none ring-[#b07e33]/20 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>

          <button
            type="submit"
            disabled={!passwordConfigured || loading}
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0a2a24] ring-1 ring-[#b07e33]/20 hover:bg-[#f5ecdc] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking..." : "Unlock admin"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </section>
    </main>
  );
}
