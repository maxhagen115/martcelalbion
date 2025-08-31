// src/app/(site)/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <section className="grid h-[90vh] md:h-screen grid-cols-1 md:grid-cols-2 -mt-28 md:-mt-32">
      {/* Left side - Paintings */}
      <div
        className="relative flex items-center justify-center text-white bg-cover bg-center pt-28 md:pt-32"
        style={{ backgroundImage: "url('/art/painting.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center p-8 z-10">
          <h1 className="font-serif text-4xl md:text-6xl">Paintings</h1>
          <p className="mt-3 text-neutral-200 max-w-md mx-auto">
            Explore original paintings.
          </p>
          <Link
            href="/paintings"
            className="mt-6 inline-block border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            View Paintings
          </Link>
        </div>
      </div>

      {/* Right side - Photography */}
      <div
        className="relative flex items-center justify-center text-white bg-cover bg-center pt-28 md:pt-32"
        style={{ backgroundImage: "url('/photo/download (1).jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center p-8 z-10">
          <h1 className="font-serif text-4xl md:text-6xl">Photography</h1>
          <p className="mt-3 text-neutral-200 max-w-md mx-auto">
            Discover fine art photography.
          </p>
          <Link
            href="/photography"
            className="mt-6 inline-block border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            View Photography
          </Link>
        </div>
      </div>
    </section>
  );
}
