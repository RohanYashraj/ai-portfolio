import { NextResponse } from "next/server";
import { checkAgentHealth } from "../../../../lib/agent";

/* Liveness only (AD-2). Probed once per session on first page load; the
   probe doubles as the Cloud Run warm-up call. */
export async function GET() {
  const health = await checkAgentHealth();
  return NextResponse.json(health, {
    headers: { "cache-control": "no-store" },
  });
}
