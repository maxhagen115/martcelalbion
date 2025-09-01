// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-3xl">Page not found</h1>
        <p className="mt-3 text-neutral-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-6">
          <Link href="/" className="underline underline-offset-4">Go back home</Link>
        </div>
      </div>
    </div>
  );
}
