import type { Metadata } from "next";
import ConfirmNotes from "./ConfirmNotes";

/**
 * Double opt-in landing for the guide's notes list (entry 19 §7). The email
 * links here; the button posts to /api/guides/confirm, so a mail scanner that
 * prefetches the link cannot subscribe anyone. Always noindex.
 *
 * DRAFT WORDING (in ConfirmNotes) — entry 19 has no copy for this page.
 */
export const metadata: Metadata = {
  title: "Confirm your notes | Maru Online",
  robots: { index: false, follow: false },
};

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <section className="px-6 md:px-[60px] pt-48 pb-32" style={{ background: "var(--gradient-surface)" }}>
      <div className="max-w-[640px] mx-auto card-lift p-8 md:p-12">
        <ConfirmNotes token={token ?? ""} />
      </div>
    </section>
  );
}
