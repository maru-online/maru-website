/**
 * GET /downloads/ai-and-popia-guide.pdf — the guide, hosted on maruonline.com
 * (entry 19 §6: no dependency on Brevo or a drive link).
 *
 * Serves GUIDE_PDF_FILE from content/guides/ while GUIDE_LIVE is on; 404
 * otherwise. The route is not secret, so the form is a courtesy gate, not
 * security (§6).
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { GUIDE_INDEXABLE, GUIDE_LIVE, GUIDE_PDF_FILE } from "@/lib/guides/config";

export async function GET() {
  if (!GUIDE_LIVE) return new Response("Not found", { status: 404 });
  try {
    const file = await readFile(path.join(process.cwd(), "content", "guides", GUIDE_PDF_FILE));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="AI-and-POPIA-guide.pdf"',
        "Cache-Control": "public, max-age=300",
        ...(GUIDE_INDEXABLE ? {} : { "X-Robots-Tag": "noindex, nofollow" }),
      },
    });
  } catch (err) {
    console.error("guide pdf: file missing", { file: GUIDE_PDF_FILE, err });
    return new Response("Not found", { status: 404 });
  }
}
