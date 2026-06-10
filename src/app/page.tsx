import Link from "next/link";
import { getGlobalData } from "@/lib/wordpress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Home | Astro International",
  description: "Providing high-quality medical equipment and safety products across the UAE and GCC region.",
};

export default async function HomePage() {
  const { siteSettings, navMenus } = await getGlobalData();

  return (
    <>
      <Header activePage="/" siteSettings={siteSettings} navMenus={navMenus} />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-5 py-20 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-[#026BAE] mb-6 uppercase leading-tight">
            Welcome to Astro International
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-light">
            Your trusted partner for certified medical equipment, personal protective safety products, and industrial solutions across Dubai and the wider GCC region.
          </p>

          <div className="flex justify-center gap-4">
            {/* Navigation Button to About Page */}
            <Link 
              href="/about"
              className="inline-block bg-[#EC2226] text-white font-semibold text-[16px] md:text-[18px] px-8 py-4 rounded-[3px] hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Learn More About Us
            </Link>

            <button className="inline-block bg-white text-[#026BAE] border-2 border-[#026BAE] font-semibold text-[16px] md:text-[18px] px-8 py-4 rounded-[3px] hover:bg-[#026BAE]/5 transition-all duration-300">
              View Products
            </button>
          </div>
        </div>
      </main>
      <Footer activePage="/" siteSettings={siteSettings} navMenus={navMenus} />
    </>
  );
}