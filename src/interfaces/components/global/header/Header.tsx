import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logos/logo.svg";
import SearchNav from "./SearchNav";
import CartNav from "./CartNav";
import MenuNav from "./MenuNav";

export default function Header() {
  return (
    <header className="w-full h-24 bg-primary py-2 px-10 sticky top-0 left-0 right-0 flex items-center justify-between z-30">
      <Link href="/">
        <Image src={Logo} alt="Logo" />
      </Link>
      <div className="flex items-center gap-10">
        <SearchNav />
        <CartNav />
        <MenuNav />
      </div>
    </header>
  );
}
