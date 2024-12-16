"use client";

import React, { useState, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import SearchDrawer from "./SeachDrawer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function SearchNav() {
  const searchDrawerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDrawer = () => {
    const drawerOpenAnimation = gsap.fromTo(
      searchDrawerRef.current,
      {
        y: "-100%",
      },
      {
        y: "0",
        duration: 0.5,
      },
    );
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 600);
      drawerOpenAnimation.reverse(1);
    } else {
      setIsOpen(true);
      drawerOpenAnimation.play();
    }
  };

  return (
    <div>
      <button onClick={handleOpenDrawer} className="w-15 h-15 border-solid border border-white rounded text-white flex items-center justify-center">
        <LuSearch />
      </button>
      <SearchDrawer ref={searchDrawerRef} isOpen={isOpen} />
    </div>
  );
}
