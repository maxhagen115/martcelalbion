"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/layout/container";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const WORK_ITEMS = [
  { href: "/paintings", label: "Paintings" },
  { href: "/photography", label: "Photography" },
  { href: "/sculptures-3D", label: "Sculptures and 3D Art" },
  { href: "/model-and-decor", label: "Model and Decor Design" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false); // mobile dropdown

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // set initial state on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]); // re-evaluate when route changes

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const isHome = pathname === "/";
  const solidHeader = scrolled || !isHome;
  const bgClass = solidHeader ? "bg-white shadow-sm" : "bg-transparent";
  const textClass = solidHeader ? "text-black" : "text-white";
  const linkHover = solidHeader ? "hover:opacity-70" : "hover:opacity-80";
  const underlineBase =
    "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";
  const underlineActive = "after:scale-x-100";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-colors ${bgClass}`}>
      <Container>
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className={`flex items-center gap-3 ${textClass}`}>
            <Image src="/logo/logo-transparent.png" alt="Martcel Albion" width={100} height={100} priority />
            <span className="font-serif text-xl tracking-wide">Martcel Albion</span>
          </Link>

          <nav className={`hidden md:flex items-center gap-10 text-base ${textClass}`}>
            {/* Home */}
            <Link
              href="/"
              prefetch
              className={`${linkHover} ${underlineBase} ${isActive("/") ? underlineActive : ""}`}
            >
              Home
            </Link>

            {/* Work dropdown */}
            <div className="relative group">
              <button
                className={`inline-flex items-center gap-1 ${linkHover} ${underlineBase}`}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Portfolio
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full translate-y-3 min-w-[14rem] rounded-md bg-white shadow-lg ring-1 ring-black/10 p-2 text-black before:content-[''] before:absolute before:-top-4 before:left-0 before:h-4 before:w-full">
                {WORK_ITEMS.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    prefetch
                    className={`block rounded px-3 py-2 text-sm hover:bg-black/5 ${isActive(w.href) ? "bg-black/5" : ""}`}
                  >
                    {w.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Remaining top-level */}
            {NAV.filter((n) => n.href !== "/").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`${linkHover} ${underlineBase} ${isActive(item.href) ? underlineActive : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded border ${solidHeader ? "text-black border-black/20" : "text-white border-white/40"}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={`block h-[2px] w-5 ${solidHeader ? "bg-black" : "bg-white"}`} />
              <span className={`block h-[2px] w-5 ${solidHeader ? "bg-black" : "bg-white"}`} />
              <span className={`block h-[2px] w-5 ${solidHeader ? "bg-black" : "bg-white"}`} />
            </div>
          </button>
        </div>

        {open && (
          <div className={`md:hidden pb-4 ${textClass}`}>
            <nav className="flex flex-col gap-2 text-base">
              <Link
                href="/"
                prefetch
                onClick={() => setOpen(false)}
                className={`py-2 ${underlineBase} ${isActive("/") ? underlineActive : ""}`}
              >
                Home
              </Link>

              {/* Mobile Work accordion */}
              <button
                className={`flex w-full items-center justify-between py-2 ${underlineBase}`}
                onClick={() => setWorkOpen((v) => !v)}
                aria-expanded={workOpen}
                aria-controls="mobile-work-menu"
              >
                <span>Work</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              {workOpen && (
                <div id="mobile-work-menu" className="ml-3 flex flex-col gap-1">
                  {WORK_ITEMS.map((w) => (
                    <Link
                      key={w.href}
                      href={w.href}
                      prefetch
                      onClick={() => setOpen(false)}
                      className={`py-2 ${underlineBase} ${isActive(w.href) ? underlineActive : ""}`}
                    >
                      {w.label}
                    </Link>
                  ))}
                </div>
              )}

              {NAV.filter((n) => n.href !== "/").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  onClick={() => setOpen(false)}
                  className={`py-2 ${underlineBase} ${isActive(item.href) ? underlineActive : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
