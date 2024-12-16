"use client";

import React, { useState, useRef } from "react";
import { LuMenu } from "react-icons/lu";
import MenuDrawer from "./MenuDrawer";
import gsap from "gsap";
export default function MenuNav() {
  const menuDrawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseDrawer = () => {
    gsap.to(menuDrawerRef.current, {
      x: "100%",
      duration: 0.5,
      onComplete: () => {
        setIsOpen(false);
      },
    });
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
    gsap.to(menuDrawerRef.current, {
      x: "0",
      duration: 0.5,
    });
  };
  return (
    <div>
      <button onClick={handleOpenDrawer} className="w-15 h-15 border-solid border border-white rounded text-white flex items-center justify-center">
        <LuMenu />
      </button>
      <MenuDrawer overlayRef={overlayRef} menuDrawerRef={menuDrawerRef} handleCloseDrawer={handleCloseDrawer} isOpen={isOpen} />
    </div>
  );
}
