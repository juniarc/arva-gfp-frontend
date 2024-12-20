import React, { useEffect } from "react";
import { LuX } from "react-icons/lu";
import Link from "next/link";
import CartItem from "./CartItem";
import LineDivider from "../../dividers/LineDivider";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/cart/CartContext";
import { CartState } from "@/hooks/cart/cartReducer";
import { CartItem as CartItemTypes } from "@/types/types";
import Image from "next/image";

interface CartDrawerProps {
  overlayRef: React.RefObject<HTMLDivElement>;
  cartDrawerRef: React.RefObject<HTMLDivElement>;
  handleCloseDrawer: () => void;
  isOpen: boolean;
  userId: number;
  cart: Record<number, { shop_name: string; products: CartItemTypes[]; shop_id: number }>;
}
export default function CartDrawer({ overlayRef, cartDrawerRef, handleCloseDrawer, isOpen, userId, cart }: CartDrawerProps) {
  return (
    <>
      <div ref={overlayRef} className={`w-screen h-screen bg-black opacity-30 absolute top-0 right-0 ${isOpen ? "block" : "hidden"}`}></div>
      <div
        ref={cartDrawerRef}
        className={`w-56 tablet:w-[414px] h-screen overflow-scroll bg-white absolute translate-x-full top-0 right-0 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="relative w-full h-full px-10 pt-25 tablet:pt-[80px]">
          <button onClick={handleCloseDrawer} className="absolute top-5 right-5 w-15 h-15 tablet:w-30 tablet:h-30 flex items-center justify-center">
            <LuX className="text-base tablet:text-[2rem]" />
          </button>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <h3>Cart</h3>
              <span className="text-xs tablet:text-base text-dark-gray">(0)</span>
            </div>
            <a href="/cart" className="text-primary font-semibold text-xs tablet:text-base underline">
              See
            </a>
          </div>
          <LineDivider className="my-5" />
          <div>
            {Object.entries(cart).map(([shop_id, shop], index) => (
              <div key={index}>
                <div className="w-full flex items-center gap-3 mb-3">
                  <p className="font-semibold capitalize text-primary">{shop.shop_name}</p>
                </div>
                <div className="flex flex-col gap-5">
                  {shop.products.map((product, index) => (
                    <CartItem {...product} key={index} />
                  ))}
                </div>
                <LineDivider className="mt-10 mb-5 tablet:my-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
