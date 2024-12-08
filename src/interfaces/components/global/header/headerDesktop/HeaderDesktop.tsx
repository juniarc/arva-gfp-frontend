"use client";

import { FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaHeart, FaRegHeart } from "react-icons/fa6";
import Logo from "@/../public/logos/logo-green.svg";
import Link from "next/link";
import Image from "next/image";
import SearchWrapper from "./SearchWrapper";
import CartNavDesktop from "./CartNavDesktop";
import ShopNavDekstop from "./ShopNavDekstop";
import UserNavDesktop from "./UserNavDesktop";

export default function HeaderDesktop() {
  return (
    <div className="w-screen ">
      <div className="w-full flex items-center gap-10 justify-end bg-primary text-white  px-[120px] py-2">
        <p>Languange</p>
        <div className="w-[1px] h-7 bg-white"></div>
        <p>Bulk Order Inquiries</p>
        <div className="w-[1px] h-7 bg-white"></div>
        <div className="flex items-center gap-5">
          <p>Follow Us on</p>
          <div className="flex items-center gap-3">
            <FaInstagram />
            <FaYoutube />
            <FaTwitter />
            <FaTiktok />
          </div>
        </div>
        <div className="w-[1px] h-7 bg-white"></div>
        <p>Helf Center</p>
      </div>
      <header className="header-desktop w-full h-[86px] bg-white">
        <div className="w-full h-full flex items-center justify-between px-[120px]">
          <Link href="/" className="mr-auto">
            <Image src={Logo} alt="Logo" className="w-[106px]" />
          </Link>
          <SearchWrapper />
          <div className="flex items-center gap-10 ml-auto">
            <button className="flex items-center gap-3">
              <FaRegHeart className="text-xl" />
              Wishlist
            </button>
            <CartNavDesktop />
            <div className="w-[1px] h-7 bg-black"></div>
            <ShopNavDekstop />
            <UserNavDesktop />
          </div>
        </div>
      </header>
    </div>
  );
}
