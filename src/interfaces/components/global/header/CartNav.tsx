"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import ShopIcon from "@/../public/icons/shopping-bag-white.svg";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/cart/CartContext";

gsap.registerPlugin(useGSAP);

export default function CartNav({ userId }: { userId: number }) {
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

  const cartDrawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseDrawer = () => {
    gsap.to(cartDrawerRef.current, {
      x: "100%",
      duration: 0.5,
      onComplete: () => {
        setIsOpen(false);
      },
    });
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
    gsap.to(cartDrawerRef.current, {
      x: "0",
      duration: 0.5,
    });
  };

  return (
    <div>
      <button
        onClick={handleOpenDrawer}
        className="w-15 h-15 border-solid border border-white rounded text-white flex items-center justify-center relative"
      >
        <Image src={ShopIcon} alt="Shop icon" width={24} height={24} />
        <span className="absolute top-1 right-1 min-w-6 min-h-6 bg-red rounded align-middle text-center text-[0.5rem]">{totalItems}</span>
      </button>
      <CartDrawer
        cart={separatedByShop}
        userId={userId}
        overlayRef={overlayRef}
        cartDrawerRef={cartDrawerRef}
        handleCloseDrawer={handleCloseDrawer}
        isOpen={isOpen}
      />
    </div>
  );
}
