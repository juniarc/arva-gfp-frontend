import React from "react";
import { LuX } from "react-icons/lu";
import Link from "next/link";
import CartItem from "./CartItem";
import LineDivider from "../../dividers/LineDivider";

interface CartDrawerProps {
  overlayRef: React.RefObject<HTMLDivElement>;
  cartDrawerRef: React.RefObject<HTMLDivElement>;
  handleCloseDrawer: () => void;
  isOpen: boolean;
}
export default function CartDrawer({ overlayRef, cartDrawerRef, handleCloseDrawer, isOpen }: CartDrawerProps) {
  return (
    <>
      <div ref={overlayRef} className={`w-screen h-screen bg-black opacity-30 absolute top-0 right-0 ${isOpen ? "block" : "hidden"}`}></div>
      <div ref={cartDrawerRef} className={`w-56 h-screen bg-white absolute translate-x-full top-0 right-0 ${isOpen ? "block" : "hidden"}`}>
        <div className="relative w-full h-full px-10 pt-25">
          <button onClick={handleCloseDrawer} className="absolute top-5 right-5 w-15 h-15 flex items-center justify-center">
            <LuX className="text-base" />
          </button>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <h3>Cart</h3>
              <span className="text-xs text-dark-gray">(0)</span>
            </div>
            <Link href="/cart" className="text-primary font-semibold text-xs underline">
              See
            </Link>
          </div>
          <LineDivider className="my-5" />
          <div>
            <CartItem />
          </div>
        </div>
      </div>
    </>
  );
}
