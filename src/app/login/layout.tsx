import type { Metadata } from "next";
import { poppins, playfairDisplay } from "@/interfaces/fonts/fonts";
import "@/styles/globals.css";
import Header from "@/interfaces/components/global/header/Header";
import Footer from "@/interfaces/components/global/footer/Footer";
import AddToCartModal from "@/interfaces/components/modals/AddToCartModal";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div id="modal-root"></div>
    </>
  );
}
