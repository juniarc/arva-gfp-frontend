"use client";

import React, { useState, useRef } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import ShopIcon from "@/../public/icons/shopping-bag-white.svg";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useDeviceCategory from "@/hooks/useDeviceCategory";

gsap.registerPlugin(useGSAP);

export default function CartNav() {
  const [isTablet, isDekstop] = useDeviceCategory();
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
        className="w-15 h-15 tablet:w-30 tablet:h-30 border-solid border border-white rounded text-white flex items-center justify-center relative"
      >
        <Image src={ShopIcon} alt="Shop icon" width={isTablet ? 33 : 24} height={isTablet ? 33 : 24} />
        <span className="absolute top-1 right-1 min-w-6 min-h-6 tablet:min-h-13 tablet:min-w-13 bg-red rounded align-middle text-center text-[0.5rem] tablet:text-sm tablet:p-1">
          5
        </span>
      </button>
      <CartDrawer overlayRef={overlayRef} cartDrawerRef={cartDrawerRef} handleCloseDrawer={handleCloseDrawer} isOpen={isOpen} />
    </div>
  );
}
