import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, whatsapp, mensagem, origem } = body;

    // Validação básica
    if (!nome || !whatsapp) {
      return NextResponse.json({ error: "Nome e WhatsApp são obrigatórios" }, { status: 400 });
    }

    // Log para debug (substituir por integração real: CRM, e-mail, n8n, etc.)
    console.log("[lead]", { nome, whatsapp, mensagem, origem, timestamp: new Date().toISOString() });

    // TODO: integrar com n8n webhook, CRM ou envio de e-mail
    // const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    // if (webhookUrl) await fetch(webhookUrl, { method: 'POST', body: JSON.stringify(body), headers: {'Content-Type':'application/json'} });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
