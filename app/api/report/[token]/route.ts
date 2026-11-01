import { NextRequest, NextResponse } from "next/server";
import { dbLeadEngine } from "@/lib/db";
import { guideRequests, operationsReports } from "@/lib/db/schema/lead-engine";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || !/^[0-9a-f-]{36}$/i.test(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    const rows = await dbLeadEngine
      .select()
      .from(operationsReports)
      .where(eq(operationsReports.token, token))
      .limit(1);

    if (!rows.length) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const row = rows[0];

    // Entry 19 §11: hide the report's guide line for someone who already
    // requested the guide. Worked out here so the page never sees the email.
    let guideRequested = false;
    try {
      const g = await dbLeadEngine
        .select({ id: guideRequests.id })
        .from(guideRequests)
        .where(eq(guideRequests.email, row.email.trim().toLowerCase()))
        .limit(1);
      guideRequested = g.length > 0;
    } catch (err) {
      console.error("Report guide lookup failed:", err); // show the line; harmless
    }

    return NextResponse.json({
      name: row.name,
      level: row.level,
      levelLabel: row.levelLabel,
      painTag: row.painTag,
      segmentB: row.segmentB,
      answers: row.answers,
      areas: row.areas,
      template: row.template,
      synthesis: row.synthesis,
      createdAt: row.createdAt,
      guideRequested,
    });
  } catch (err) {
    console.error("Report fetch error:", err);
    return NextResponse.json({ error: "Failed to load report" }, { status: 500 });
  }
}
