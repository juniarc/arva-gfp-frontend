"use client";

import React, { useState, useRef } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import CartDrawer from "./CartDrawer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function CartNav() {
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
        <MdOutlineShoppingBag size={19} />
        <span className="absolute top-1 right-1 min-w-6 min-h-6 bg-red rounded align-middle text-center text-[0.5rem]">5</span>
      </button>
      <CartDrawer overlayRef={overlayRef} cartDrawerRef={cartDrawerRef} handleCloseDrawer={handleCloseDrawer} isOpen={isOpen} />
    </div>
  );
}
