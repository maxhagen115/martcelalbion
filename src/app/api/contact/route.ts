import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const { name, email, message, productTitle, productSlug } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ---- DEBUG: print envs (niet de PASS) ----
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_SECURE:", process.env.SMTP_SECURE);
    console.log("CONTACT_FROM:", process.env.CONTACT_FROM);
    console.log("CONTACT_TO:", process.env.CONTACT_TO);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true", // true voor 465
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Check connectie & auth
    try {
      await transporter.verify();
      console.log("SMTP verified OK");
    } catch (e) {
      console.error("SMTP verify failed:", e);
      return NextResponse.json({ error: "SMTP verify failed" }, { status: 500 });
    }

    const subject = `Nieuw bericht: ${productTitle ?? "General"} – martcelalbion.com`;
    const productUrl = productSlug ? `https://martcelalbion.com/products/${productSlug}` : null;

    const html = `
      <h2>Nieuw bericht van Martcelalbion.com contact formulier</h2>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${productTitle ? `<p><strong>Work:</strong> ${productTitle}</p>` : ""}
      ${productUrl ? `<p><a href="${productUrl}">${productUrl}</a></p>` : ""}
      <p><strong>Bericht:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    const info = await transporter.sendMail({
      from: process.env.CONTACT_FROM!,   // moet meestal bestaan op je domein
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject,
      html,
    });

    console.log("Mail sent:", info.messageId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err?.message || err);
    return NextResponse.json({ error: "Mail failed" }, { status: 500 });
  }
}
