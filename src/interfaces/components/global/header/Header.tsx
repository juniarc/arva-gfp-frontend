"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Logo from "@/../public/logos/logo.svg";
import SearchNav from "./SearchNav";
import CartNav from "./CartNav";
import MenuNav from "./MenuNav";
import { User } from "@/types/types";

interface HeaderProps {
  token: string | undefined;
  userId: number;
  user: User;
}
export default function Header({ userId, token, user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full h-24 tablet:h-30 bg-primary py-2 px-10 tablet:px-15 sticky top-0 left-0 right-0 flex items-center justify-between z-30">
      {pathname === "/" || pathname === "/login" || pathname === "/register" ? (
        <Link href="/" className="tablet:w-[90px] w-[72px]">
          <Image src={Logo} alt="Logo" className="w-full" />
        </Link>
      ) : (
        <button>
          <FaArrowLeftLong onClick={() => router.back()} className="text-white" />
        </button>
      )}
      <div className="flex items-center gap-10">
        <SearchNav />
        <CartNav userId={userId} />
        <MenuNav user={user} />
      </div>
    </header>
  );
}
