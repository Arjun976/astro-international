import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Industries We Serve", href: "/industries" },
  { label: "Product Catalog", href: "/catalog" },
  { label: "Contact Us", href: "/contact" },
];

const customerLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "SiteMap", href: "/sitemap" },
];

export default function Footer({ activePage = "" }: { activePage?: string }) {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-10 py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[1fr_minmax(0,147px)_minmax(0,254px)] lg:grid-cols-[1fr_minmax(0,176px)_minmax(0,166px)_minmax(0,273px)] gap-y-12 gap-x-6 md:gap-[56px] lg:gap-[90px]">
        {/* Logo & About */}
        <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <div className="flex flex-wrap items-center justify-between lg:block">
            <Image
              src="/image/logo.png"
              alt="Astro International"
              width={200}
              height={80}
              className="h-10 md:h-20 object-contain mb-6 w-auto"
            />
            <p className="text-black text-base font-light leading-relaxed mb-6 w-full order-3 md:order-3 lg:order-none max-w-2xl md:max-w-none">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s.
            </p>
            <div className="hidden md:flex gap-6 text-2xl text-gray-700 mb-6 lg:mb-8">
              <i className="fab fa-facebook-f cursor-pointer hover:text-[#026BAE] transition duration-300 w-[28px] h-[28px]" />
              <i className="fab fa-instagram cursor-pointer hover:text-[#026BAE] transition duration-300 w-[28px] h-[28px]" />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-semibold text-[18px] uppercase text-black mb-6">
            QUICK LINKS
          </h3>
          <ul className="space-y-4 text-gray-800 text-base">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:text-[#026BAE] transition duration-300 ${
                    activePage === link.href ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-semibold text-[18px] uppercase text-black mb-6">
            CUSTOMER
          </h3>
          <ul className="space-y-4 text-gray-800 text-base">
            {customerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[#026BAE] transition duration-300"
                >
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
              <i className="fa-solid fa-location-dot text-[#026BAE] text-lg mt-1" />
              <span className="leading-relaxed">
                Al Habtoor Building Opp: Leader - Showroom 5 - Deira - Al
                Khabaisi - Dubai
              </span>
            </li>
            <li className="flex items-center gap-4">
              <i className="fa-solid fa-phone text-[#026BAE] text-lg" />
              <span>+971 50 688 9285</span>
            </li>
            <li className="flex items-center gap-4">
              <i className="fa-solid fa-envelope text-[#026BAE] text-lg" />
              <span>info@astrotrading.ae</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#026BAE] text-center text-white text-base py-6 font-light">
        Copyright © 2026 Astro International. All Rights Reserved.
      </div>
    </footer>
  );
}