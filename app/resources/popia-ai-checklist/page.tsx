import { notFound } from "next/navigation";

// Retired: this page collected name, email and consent but sent nothing, and
// carried unsourced claims. It returns 404 until a working, consented version
// is built inside the Resources hub.
export default function POPIAChecklistPage() {
  notFound();
}
