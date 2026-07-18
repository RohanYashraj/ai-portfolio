"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { createPostHogClient } from "@/lib/posthog-server";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(100),
  email: z.string().trim().email("Please enter a valid email."),
  subject: z.string().trim().min(1, "Please add a subject.").max(150),
  message: z.string().trim().min(10, "Please write a little more.").max(5000),
  // Honeypot: real people leave this empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
};

const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || "rohanyashraj@gmail.com";

// Branded Resend template used for the auto-acknowledgement to the sender.
// Override via env; defaults to the template created in the Resend dashboard.
// The template should reference these variables: name, email, subject, message.
const ACK_TEMPLATE_ID =
  process.env.RESEND_ACK_TEMPLATE_ID || "5d5d3029-f1b1-46bf-93a8-37edc63ad2cd";

async function captureContactEvent(
  event: "contact_form_submitted" | "contact_form_failed",
  outcome: "delivered" | "rate_limited" | "email_unconfigured" | "delivery_error",
  error?: unknown,
) {
  const posthog = createPostHogClient();
  posthog.capture({
    distinctId: "portfolio_contact_form",
    event,
    properties: { outcome },
  });
  if (error) posthog.captureException(error, "portfolio_contact_form");
  await posthog.shutdown();
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

// On-brand HTML for the notification that lands in the owner's inbox.
function notificationHtml(d: { name: string; email: string; subject: string; message: string }): string {
  const ink = "#17181c", muted = "#6a6e78", indigo = "#4338ca", line = "#ecebe5", bg = "#fbfaf8";
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${line};font-family:${font}">
        <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${muted}">${label}</div>
        <div style="font-size:15px;color:${ink};margin-top:4px">${value}</div>
      </td>
    </tr>`;
  return `<!doctype html><html><body style="margin:0;background:${bg};padding:32px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border:1px solid ${line};border-radius:16px;overflow:hidden">
        <tr><td style="height:4px;background:${indigo}"></td></tr>
        <tr><td style="padding:28px 32px 8px;font-family:${font}">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${indigo};font-weight:700">New contact message</div>
          <h1 style="margin:8px 0 0;font-size:22px;color:${ink};font-weight:700">${escapeHtml(d.subject)}</h1>
        </td></tr>
        <tr><td style="padding:8px 32px 28px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("From", `${escapeHtml(d.name)} &lt;${escapeHtml(d.email)}&gt;`)}
            ${row("Message", escapeHtml(d.message).replace(/\n/g, "<br>"))}
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px;border-top:1px solid ${line};font-family:${font};font-size:12px;color:${muted}">
          Reply directly to this email to respond to ${escapeHtml(d.name)}.
        </td></tr>
      </table>
    </td></tr></table>
  </body></html>`;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    // Honeypot tripped — pretend success, drop silently.
    if (raw.company) return { status: "success", message: "Thanks — your message is on its way." };
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the fields below.", fieldErrors };
  }

  // Rate limit per IP.
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  const { ok } = rateLimit(`contact:${ip}`);
  if (!ok) {
    await captureContactEvent("contact_form_failed", "rate_limited");
    return {
      status: "error",
      message: "Too many messages from this address. Please try again later.",
    };
  }

  const { name, email, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    await captureContactEvent("contact_form_failed", "email_unconfigured");
    return {
      status: "error",
      message: `The form isn't connected to email yet. Please write to ${CONTACT_EMAIL} directly.`,
    };
  }

  try {
    const resend = new Resend(apiKey);

    // 1) Notification to the site owner — on-brand HTML.
    await resend.emails.send({
      from,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      html: notificationHtml({ name, email, subject, message }),
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // 2) Auto-acknowledgement to the sender — uses the branded Resend template.
    await resend.emails.send({
      from,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "Thanks for reaching out",
      template: {
        id: ACK_TEMPLATE_ID,
        variables: { name, email, subject, message },
      },
    });

    await captureContactEvent("contact_form_submitted", "delivered");
    return {
      status: "success",
      message: "Thanks — your message is on its way. I'll reply soon.",
    };
  } catch (err) {
    console.error("Resend error:", err);
    await captureContactEvent("contact_form_failed", "delivery_error", err);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please write to ${CONTACT_EMAIL} directly.`,
    };
  }
}
