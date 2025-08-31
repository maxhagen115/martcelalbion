import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/container";

export const metadata = {
  title: "About | Martcel Albion",
  description: "About Martcel Albion – visual artist exploring light, texture and memory.",
};

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20">
      {/* Hero */}
      <section className="pb-16">
        <Container>
          <div className="grid md:grid-cols-[1.1fr_0.9fr] items-center gap-10">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-balance">
                About Martcel Albion
              </h1>
              <p className="mt-5 text-base/7 text-black/70">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem adipisci reiciendis aut illo temporibus odit minima ad optio magni. Voluptatum dolores ipsam alias ullam, temporibus ipsa obcaecati quos ducimus iste in consequatur incidunt at praesentium quod consequuntur possimus quis hic, aut necessitatibus saepe totam velit commodi! In velit maiores dolorem.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm">
              <Image
                src="/logo/portret.jpg"
                alt="Portrait of Martcel Albion in the studio"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40rem, 24rem"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Artist statement */}
      <section className="py-12 bg-black/[0.03]">
        <Container>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <h2 className="font-serif text-2xl md:text-3xl">Artist Statement</h2>
            <div className="md:col-span-2 space-y-5 text-black/80">
              <p>
                My practice moves between painting and photography. Painting
                allows me to slow time—layering translucent tones until the
                surface begins to breathe. Photography, by contrast, offers a
                precise cut of reality. Together they form a conversation about
                presence, absence, and the edges where forms dissolve.
              </p>
              <p>
                The recurring subjects in my work—windows, thresholds, and
                quiet urban corners—act as invitations to linger. I am drawn to
                moments when light transforms the ordinary into something
                fragile and sublime.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <h2 className="font-serif text-2xl md:text-3xl">Process</h2>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/art/painting.jpg"
                    alt="Layered oil painting detail"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 28rem, 100vw"
                  />
                </div>
                <p className="text-black/80">
                  Thin glazes, slow drying times, and gentle abrasion build a
                  surface that keeps a record of time spent looking.
                </p>
              </div>
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/photo/download.jpg"
                    alt="Quiet city photograph at dusk"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 28rem, 100vw"
                  />
                </div>
                <p className="text-black/80">
                  Photography frames the fleeting: an index of light that
                  informs the compositions of the studio.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Exhibitions & collections */}
      <section className="py-12 bg-black/[0.03]">
        <Container>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <h2 className="font-serif text-2xl md:text-3xl">Exhibitions</h2>
            <ul className="md:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-black/80">
              <li>2025 – Light Studies, Studio Show, Amsterdam</li>
              <li>2024 – Quiet Thresholds, Group Show, Rotterdam</li>
              <li>2023 – Night Windows, Solo, Antwerp</li>
              <li>2022 – Between Frames, Group Show, Utrecht</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="pt-12">
        <Container>
          <div className="rounded-xl bg-black text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl">Studio visits & inquiries</h3>
              <p className="mt-2 text-white/80">
                For available works, commissions, or collaborations, I’m happy
                to connect.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white text-black px-5 py-2 text-sm font-medium hover:bg-white/90 transition"
                prefetch
              >
                Contact
              </Link>
              <Link
                href="/paintings"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-2 text-sm font-medium hover:bg-white/10 transition"
                prefetch
              >
                View works
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}



