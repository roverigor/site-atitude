import { NextRequest, NextResponse } from "next/server";
import { sendLeadCapi } from "@/lib/meta-capi";

/**
 * Lead capture endpoint.
 *
 * Current state of the lead flow:
 * - `ContactPage.tsx` form submits redirect users to WhatsApp directly
 *   (no fetch to this endpoint). This route exists as a future-proof hook
 *   for webhook-based lead routing (CRM, n8n, email).
 * - If `LEAD_WEBHOOK_URL` is set in the environment, the payload is
 *   forwarded there. Failures are logged but never surfaced to the client.
 * - Without `LEAD_WEBHOOK_URL`, the route logs and returns 200 so callers
 *   can fire-and-forget.
 *
 * To wire a real destination: set `LEAD_WEBHOOK_URL` to an n8n/CRM webhook
 * URL via Vercel env vars. No code change required.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, whatsapp, mensagem, origem, eventId, fbp, fbc, eventSourceUrl } =
      body;

    if (!nome || !whatsapp) {
      return NextResponse.json(
        { error: "Nome e WhatsApp são obrigatórios" },
        { status: 400 }
      );
    }

    const payload = {
      nome,
      whatsapp,
      mensagem,
      origem,
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Segredo compartilhado com o Athy (/api/webhooks/lead exige x-lead-secret).
            ...(process.env.LEAD_INTAKE_SECRET
              ? { "x-lead-secret": process.env.LEAD_INTAKE_SECRET }
              : {}),
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Webhook unreachable — log but don't fail the lead capture
        console.error("[lead] webhook forward failed", err);
      }
    } else {
      console.log("[lead]", payload);
    }

    // Meta CAPI (server-side) — evento Lead com dedup via eventId. Non-blocking.
    try {
      const clientIp =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        undefined;
      const capi = await sendLeadCapi({
        whatsapp,
        nome,
        eventId,
        fbp,
        fbc,
        eventSourceUrl: eventSourceUrl || req.headers.get("referer") || undefined,
        clientIp,
        userAgent: req.headers.get("user-agent") || undefined,
        origem,
        campaign: origem,
      });
      if (!capi.ok) console.error("[lead] CAPI", capi.detail);
    } catch (err) {
      console.error("[lead] CAPI threw", err);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
