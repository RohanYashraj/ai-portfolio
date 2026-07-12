/**
 * The ONE health-checked HTTP client for the agent sidecar (AD-2). Every
 * web/ → agent/ call goes through here; the browser only ever talks to the
 * /api/docent proxy (AD-7). No AGENT_URL configured = agent off = ok:false.
 */

const AGENT_URL = process.env.AGENT_URL;

export async function checkAgentHealth(): Promise<{ ok: boolean }> {
  if (!AGENT_URL) return { ok: false };
  try {
    const res = await fetch(`${AGENT_URL}/health`, {
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
