import Container from "@/components/layout/container";
import InquiryForm from "@/components/forms/inquiry-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Martcel Albion",
  description: "Explore original paintings by Martcel Albion.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-16 max-w-2xl">
        <h1 className="font-serif text-3xl">Contact</h1>
        <div className="mt-6">
          <InquiryForm productTitle="" productSlug="" />
        </div>
      </div>
    </Container>
  );
}
