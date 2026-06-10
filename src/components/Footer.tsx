import Image from "next/image";
import Link from "next/link";
import type { SiteSettings, NavMenus } from "@/types/wordpress";

// Fallback customer links — these are static, rarely come from WP
const DEFAULT_CUSTOMER_LINKS = [
  { label: "Terms & Conditions", url: "/terms" },
  { label: "Privacy Policy",     url: "/privacy" },
  { label: "SiteMap",            url: "/sitemap" },
];

const DEFAULT_QUICK_LINKS = [
  { label: "Home",                url: "/" },
  { label: "About",               url: "/about" },
  { label: "Products",            url: "/products" },
  { label: "Industries We Serve", url: "/industries" },
  { label: "Product Catalog",     url: "/catalog" },
  { label: "Contact Us",          url: "/contact" },
];

interface FooterProps {
  activePage?:   string;
  siteSettings?: SiteSettings | null;
  navMenus?:     NavMenus | null;
}

export default function Footer({
  activePage = "",
  siteSettings,
  navMenus,
}: FooterProps) {
  const phone        = siteSettings?.phone          || "+971 50 688 9285";
  const email        = siteSettings?.email          || "info@astrotrading.ae";
  const address      = siteSettings?.address        || "Al Habtoor Building Opp: Leader - Showroom 5 - Deira - Al Khabaisi - Dubai";
  const footerDesc   = siteSettings?.footer_desc    || "Astro International is a UAE-based company specializing in the supply of building materials and safety equipment.";
  const copyright    = siteSettings?.copyright_text || "Copyright © 2026 Astro International. All Rights Reserved.";
  const facebookUrl  = siteSettings?.facebook_url   || "#";
  const instagramUrl = siteSettings?.instagram_url  || "#";

  const quickLinks    = navMenus?.footer_quick?.length    ? navMenus.footer_quick    : DEFAULT_QUICK_LINKS;
  const customerLinks = navMenus?.footer_customer?.length ? navMenus.footer_customer : DEFAULT_CUSTOMER_LINKS;

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[1fr_minmax(0,147px)_minmax(0,254px)] lg:grid-cols-[1fr_minmax(0,176px)_minmax(0,166px)_minmax(0,273px)] gap-y-12 gap-x-6 md:gap-[56px] lg:gap-[90px]">

        {/* Logo & About */}
        <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <Image
            src="/image/logo.png"
            alt="Astro International"
            width={200}
            height={80}
            className="h-10 md:h-20 object-contain mb-6 w-auto"
          />
          <p className="text-black text-base font-light leading-relaxed mb-6">
            {footerDesc}
          </p>
          <div className="hidden md:flex gap-6 text-2xl text-gray-700 mb-6">
            <Link href={facebookUrl} aria-label="Facebook">
              <i className="fab fa-facebook-f cursor-pointer hover:text-[#026BAE] transition duration-300" />
            </Link>
            <Link href={instagramUrl} aria-label="Instagram">
              <i className="fab fa-instagram cursor-pointer hover:text-[#026BAE] transition duration-300" />
            </Link>
          </div>
        </div>

        {/* Quick Links — from WordPress footer-quick-links menu */}
        <div className="col-span-1">
          <h3 className="font-semibold text-[18px] uppercase text-black mb-6">
            QUICK LINKS
          </h3>
          <ul className="space-y-4 text-gray-800 text-base">
            {quickLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className={`hover:text-[#026BAE] transition duration-300 ${
                    activePage === link.url ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Links */}
        <div className="col-span-1">
          <h3 className="font-semibold text-[18px] uppercase text-black mb-6">
            CUSTOMER
          </h3>
          <ul className="space-y-4 text-gray-800 text-base">
            {customerLinks.map((link) => (
              <li key={link.url}>
                <Link href={link.url} className="hover:text-[#026BAE] transition duration-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-semibold text-[18px] uppercase text-black mb-6">
            CONTACT
          </h3>
          <ul className="space-y-4 text-gray-800 text-base">
            <li className="flex items-start gap-4">
              <i className="fa-solid fa-location-dot text-[#026BAE] text-lg mt-1 flex-shrink-0" />
              <span className="leading-relaxed">{address}</span>
            </li>
            <li className="flex items-center gap-4">
              <i className="fa-solid fa-phone text-[#026BAE] text-lg flex-shrink-0" />
              <span>{phone}</span>
            </li>
            <li className="flex items-center gap-4">
              <i className="fa-solid fa-envelope text-[#026BAE] text-lg flex-shrink-0" />
              <span>{email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#026BAE] text-center text-white text-base py-6 font-light">
        {copyright}
      </div>
    </footer>
  );
}