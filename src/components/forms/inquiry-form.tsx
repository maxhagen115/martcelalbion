"use client";

import { useState } from "react";

type Props = {
  productTitle?: string;
  productSlug?: string;
};

export default function InquiryForm({ productTitle, productSlug }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      productTitle,
      productSlug,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 w-full border p-2"
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full border p-2"
        />
      </div>
      <div>
        <label className="block text-sm">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-1 w-full border p-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="border px-5 py-3 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "ok" && <p className="text-green-600">Thank you! We’ll get back to you.</p>}
      {status === "error" && <p className="text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
