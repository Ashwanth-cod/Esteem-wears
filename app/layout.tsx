import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Esteem Innerwear",
    template: "%s | Esteem Innerwear",
  },

  description:
    "Premium cotton innerwear for men and kids. Comfortable, durable, and affordable everyday wear designed for maximum comfort.",

  keywords: [
    "innerwear",
    "mens briefs",
    "kids wear",
    "cotton underwear",
    "comfortable innerwear",
    "affordable innerwear India",
    "best men's underwear",
    "kids underwear online",
  ],

  authors: [{ name: "Esteem Innerwear" }],

  creator: "Esteem Innerwear",

  publisher: "Esteem Innerwear",

  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Esteem Innerwear - Comfortable Everyday Wear",
    description:
      "Shop premium cotton innerwear for men and kids. Soft, durable, and affordable daily comfort wear.",
    url: "https://your-domain.com",
    siteName: "Esteem Innerwear",
    images: [
      {
        url: "https://res.cloudinary.com/desmywzoz/image/upload/vXXXXX/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Esteem Innerwear Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Esteem Innerwear",
    description:
      "Premium cotton innerwear for men and kids. Comfort that lasts all day.",
    images: [
      "https://res.cloudinary.com/desmywzoz/image/upload/vXXXXX/og-banner.png",
    ],
  },

  icons: {
    icon: "/favicon.ico",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
