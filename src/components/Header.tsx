"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings, NavMenus } from "@/types/wordpress";

const DEFAULT_NAV = [
  { label: "Home",               url: "/" },
  { label: "About",              url: "/about" },
  { label: "Building Materials", url: "/building-materials" },
  { label: "Safety Products",    url: "/safety-products" },
];

interface HeaderProps {
  activePage?:   string; // Kept for backward compatibility but optional
  siteSettings?: SiteSettings | null;
  navMenus?:     NavMenus | null;
}

export default function Header({
  activePage,
  siteSettings,
  navMenus,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Use pathname if activePage is not provided
  const currentPath = activePage || pathname;

  const phone           = siteSettings?.top_phone         || "+971 50 688 9285";
  const email           = siteSettings?.top_email         || "info@astrotrading.ae";
  const openingHours    = siteSettings?.top_hours         || "Mon – Sat 8AM – 5PM";
  const locationText    = siteSettings?.top_location_text || "Find our store";
  const requestQuoteBtn = siteSettings?.header_cta_text   || "Request A Quote";

  const navLinks = navMenus?.primary?.length ? navMenus.primary : DEFAULT_NAV;

  return (
    <header className="bg-white border-b border-[#026BAE]/40 sticky top-0 z-30">

      {/* ── Main bar ──────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 xl:px-10 h-[70px] xl:h-[100px] flex items-center justify-between">

        {/* Mobile hamburger (left) */}
        <span className="xl:hidden order-1">
          <button
            id="hamburger"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-start gap-[6px] transition-all duration-300 text-[#026BAE]"
          >
            <span className={`line block h-[2px] w-full bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`line block h-[2px] w-full bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`line block h-[2px] bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px] w-full" : "w-5"}`} />
          </button>
        </span>

        {/* Logo */}
        <div className="flex-shrink-0 order-2 xl:order-1">
          <Link href="/">
            <Image
              src={siteSettings?.header_logo?.url || "/image/logo.png"}
              alt={siteSettings?.header_logo?.alt || "Astro Trading"}
              width={160}
              height={45}
              className="h-[25px] md:h-[41px] lg:h-[45px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-10 xl:order-2">
          <nav className="flex gap-8 text-[16px] text-[#026BAE] font-semibold font-heading">
            {navLinks.map((link) => {
              const isActive = currentPath === link.url;
              return (
                <Link
                  key={link.url}
                  href={link.url}
                  className={`hover:text-[#014F82] transition duration-300 ${
                    isActive ? "underline underline-offset-8 decoration-red-500" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CTA — desktop */}
        <div className="hidden xl:flex items-center gap-10 xl:order-3">
          <button className="bg-[#EC2226] text-white px-4 py-2 rounded-[3px] text-[14px] font-bold tracking-wider hover:bg-red-600 transition duration-300">
            {requestQuoteBtn}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <div
        id="mobileMenu"
        className={`xl:hidden border-t border-[#026BAE33] bg-white ${menuOpen ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col text-sm text-[#026BAE] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="px-6 py-4 border-b border-gray-100 hover:bg-[#026BAE]/5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <button className="w-full bg-[#EC2226] text-white py-3 rounded-[3px] text-sm font-bold tracking-wider">
              {requestQuoteBtn}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Top info bar (desktop only) ────────────────────────────── */}
      <div className="hidden lg:block bg-white text-[#026BAE] text-sm border-b border-[#026BAE]/20">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-4 divide-x divide-[#026BAE]/20 border-x border-[#026BAE]/20 h-[56px]">

            <div className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-phone text-[16px]" />
              <span className="font-medium">{phone}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-envelope text-[16px]" />
              <span className="font-medium">{email}</span>
            </div>

            <div className="flex items-center justify-center gap-3 cursor-pointer hover:bg-[#026BAE]/5 transition duration-300">
              <i className="fa-solid fa-location-dot text-[16px]" />
              <span className="font-medium">{locationText}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-clock text-[16px]" />
              <span className="font-medium">{openingHours}</span>
            </div>

          </div>
        </div>
      </div>

    </header>
  );
}