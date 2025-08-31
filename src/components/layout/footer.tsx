'use client';

import Container from "@/components/layout/container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-4 py-12 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>© {year} Martcel Albion. All rights reserved.</p>

          <nav className="flex gap-6">
            <a href="/privacy" className="hover:opacity-70">Privacy</a>
            <a href="/terms" className="hover:opacity-70">Terms</a>
            <a href="mailto:art@martcelalbion.com" className="hover:opacity-70">
              art@martcelalbion.com
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
