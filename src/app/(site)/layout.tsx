// src/app/(site)/layout.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PrefetchRoutes from "@/components/prefetch-routes";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrefetchRoutes />
      <Header />
      <main className="min-h-dvh pt-28 md:pt-32">{children}</main>
      <Footer />
    </>
  );
}
