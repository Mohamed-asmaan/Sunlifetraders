import type { Metadata } from "next";
import { Geist, Host_Grotesk, Instrument_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { RoiOverlayProvider } from "@/components/roi/RoiOverlay";
import MarketingPopup from "@/components/MarketingPopup";
import { CalculatorFloat, MobileStickyBar } from "@/components/ConversionWidgets";
import { getSite } from "@/lib/cms";
import { seo } from "@/lib/data";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();

  return (
    <html
      lang="en"
      className={`${instrument.variable} ${host.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white pb-[72px] text-ink lg:pb-0" suppressHydrationWarning>
        <SmoothScroll>
          <RoiOverlayProvider>
            <Header navLinks={site.navLinks} cta={site.headerCta} />
            <main>{children}</main>
            <Footer
              company={site.company}
              navLinks={site.navLinks}
              footerLinks={site.footerLinks}
              socials={site.socials}
            />
            <WhatsAppFloat href={site.company.whatsappHref} />
            <CalculatorFloat />
            <MobileStickyBar phoneHref={site.company.phoneHref} />
            <MarketingPopup />
          </RoiOverlayProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
