import type { Metadata } from "next";
import { poppins, playfairDisplay } from "@/interfaces/fonts/fonts";
import "@/styles/globals.css";
import Header from "@/interfaces/components/global/header/Header";
import HeaderWrapper from "@/interfaces/components/global/header/HeaderWrapper";
import Footer from "@/interfaces/components/global/footer/Footer";
import AddToCartModal from "@/interfaces/components/modals/AddToCartModal";

export const metadata: Metadata = {
  title: "Arva",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfairDisplay.variable}`}>
      <body className="w-screen min-h-screen antialiased overflow-x-hidden">
        <HeaderWrapper />
        {children}
        <Footer />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
