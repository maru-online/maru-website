import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Page not found | Maru Online",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      light="This page does not exist"
      strong="or has moved."
      lead={
        <>
          Return to the{" "}
          <Link href="/" className="underline underline-offset-4 hover:no-underline">
            homepage
          </Link>
          , or{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:no-underline">
            contact us
          </Link>{" "}
          if you expected to find something here.
        </>
      }
    />
  );
}
