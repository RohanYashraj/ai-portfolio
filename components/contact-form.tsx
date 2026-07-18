"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/(site)/contact/actions";
import { cx } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const fieldBase =
  "w-full rounded-md border bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-indigo/30 bg-wash p-6 text-ink"
      >
        <p className="font-display text-lg">Message sent</p>
        <p className="mt-1 text-sm text-slate">{state.message}</p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={cx(fieldBase, err.name ? "border-red-500/60" : "border-line")}
          />
          {err.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{err.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={cx(fieldBase, err.email ? "border-red-500/60" : "border-line")}
          />
          {err.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{err.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="eyebrow mb-2 block">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          className={cx(fieldBase, err.subject ? "border-red-500/60" : "border-line")}
        />
        {err.subject && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{err.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={cx(fieldBase, "resize-y", err.message ? "border-red-500/60" : "border-line")}
        />
        {err.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{err.message}</p>}
      </div>

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}
