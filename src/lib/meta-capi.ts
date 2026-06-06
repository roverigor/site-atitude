/**
 * Meta Conversions API (server-side) — evento Lead.
 *
 * Dispara o evento `Lead` direto para o Meta a partir do servidor, com
 * `event_id` para deduplicar com o Pixel do browser (GTM) e dados de match
 * (telefone/nome hasheados, IP, UA, _fbp, _fbc). Resiliente a adblock/iOS.
 *
 * Config via env (Vercel): META_CAPI_TOKEN (token do System User "Conversions API")
 * e META_PIXEL_ID. Sem elas, vira no-op silencioso.
 */
import crypto from "node:crypto";

const GRAPH_VERSION = "v21.0";

function sha256(v: string): string {
  return crypto.createHash("sha256").update(v).digest("hex");
}

/** Telefone para o formato que o Meta espera no hash: só dígitos, com DDI 55. */
function normPhone(raw: string): string {
  let d = (raw || "").replace(/\D/g, "");
  if (d && !d.startsWith("55")) d = "55" + d;
  return d;
}

export interface LeadCapiInput {
  whatsapp?: string;
  nome?: string;
  eventId?: string;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  origem?: string;
  campaign?: string;
  testEventCode?: string;
}

export async function sendLeadCapi(
  input: LeadCapiInput,
): Promise<{ ok: boolean; detail?: unknown }> {
  const token = process.env.META_CAPI_TOKEN;
  const pixel = process.env.META_PIXEL_ID;
  if (!token || !pixel) return { ok: false, detail: "capi_not_configured" };

  const phone = normPhone(input.whatsapp ?? "");
  const firstName =
    (input.nome ?? "").trim().split(/\s+/)[0]?.toLowerCase() ?? "";

  const userData: Record<string, unknown> = {};
  if (phone) userData.ph = [sha256(phone)];
  if (firstName) userData.fn = [sha256(firstName)];
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
    custom_data: {
      content_name: input.campaign ?? input.origem ?? "lead",
      lead_source: input.origem ?? "lp",
    },
  };
  // event_id: deduplica com o Pixel do browser (mesmo id no GTM Lead tag).
  if (input.eventId) event.event_id = input.eventId;
  if (input.eventSourceUrl) event.event_source_url = input.eventSourceUrl;

  const payload: Record<string, unknown> = { data: [event] };
  if (input.testEventCode) payload.test_event_code = input.testEventCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixel}/events?access_token=${encodeURIComponent(token)}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, detail: json };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}
