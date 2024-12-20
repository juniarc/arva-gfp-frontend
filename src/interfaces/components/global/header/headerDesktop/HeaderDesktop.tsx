"use client";

import { FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaHeart, FaRegHeart } from "react-icons/fa6";
import Logo from "@/../public/logos/logo-green.svg";
import Link from "next/link";
import Image from "next/image";
import SearchWrapper from "./SearchWrapper";
import CartNavDesktop from "./CartNavDesktop";
import ShopNavDekstop from "./ShopNavDekstop";
import UserNavDesktop from "./UserNavDesktop";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/cart/CartContext";
import { User } from "@/types/types";

export default function HeaderDesktop({ userId, user }: { userId: number; user: User }) {
  const pathname = usePathname();

  const { state, fetchCart } = useCart();
  const { items: separatedByShop, loading, error } = state;

  useEffect(() => {
    if (userId && pathname !== "/cart") {
      fetchCart(userId);
    }
  }, [userId]);

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const calculateTotalItems = () => {
      return Object.values(separatedByShop).reduce((total, shop) => {
        return total + shop.products.length;
      }, 0);
    };

    setTotalItems(calculateTotalItems);
  }, [separatedByShop]);
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
            <a href="/wishlist" className="flex items-center gap-3">
              <FaRegHeart className="text-xl" />
              Wishlist
            </a>
            <CartNavDesktop cart={separatedByShop} userId={userId} totalItems={totalItems} />
            <div className="w-[1px] h-7 bg-black"></div>
            <ShopNavDekstop />
            <UserNavDesktop user={user} />
          </div>
        </div>
      </header>
    </div>
  );
}
