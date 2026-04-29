import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import MobileBottomBar from "@/components/MobileBottomBar";
import { EstimateModalProvider } from "@/context/EstimateModalContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mac's Timber & Terra | Michigan Excavation & Land Clearing",
  description:
    "From land clearing to final grade, we deliver rugged, reliable excavation and site prep that sets your property up for success. Proudly serving Michigan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} bg-background`}>
      <body className="font-sans antialiased">
        <EstimateModalProvider>
          {children}
          <MobileBottomBar />
        </EstimateModalProvider>
      </body>
    </html>
  );
}
