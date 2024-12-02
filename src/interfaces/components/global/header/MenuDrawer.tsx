import Image from "next/image";
import React from "react";
import { LuX } from "react-icons/lu";
import dummyPhotoProfile from "@/../public/images/dummy-photo-product.jpg";
import Link from "next/link";
import MenuDrawerContent from "./MenuDrawerContent";

interface MenuDrawerProps {
  overlayRef: React.RefObject<HTMLDivElement>;
  menuDrawerRef: React.RefObject<HTMLDivElement>;
  handleCloseDrawer: () => void;
  isOpen: boolean;
}
export default function MenuDrawer({ overlayRef, menuDrawerRef, handleCloseDrawer, isOpen }: MenuDrawerProps) {
  return (
    <>
      <div ref={overlayRef} className={`w-screen h-screen bg-black opacity-30 absolute top-0 right-0 ${isOpen ? "block" : "hidden"}`}></div>
      <div ref={menuDrawerRef} className={`w-56 h-screen bg-white absolute translate-x-full top-0 right-0 ${isOpen ? "block" : "hidden"}`}>
        <div className="relative w-full h-full ">
          <button onClick={handleCloseDrawer} className="absolute top-5 right-5 w-15 h-15 flex items-center justify-center">
            <LuX className="text-base text-white" />
          </button>
          <div className="w-full h-55 bg-primary px-10 pt-15 pb-10 flex items-center gap-10">
            <div className="w-30 h-30 rounded-full overflow-hidden">
              <Image src={dummyPhotoProfile} className="w-full h-full object-cover object-center" alt="Profile Image" />
            </div>
            <Link href="/login" className="font-bold text-white">
              Login
            </Link>
          </div>
          <MenuDrawerContent />
        </div>
      </div>
    </>
  );
}
