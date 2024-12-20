"use client";

import Image from "next/image";
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import ShopIcon from "@/../public/icons/shopping-bag.svg";
import LineDivider from "@/interfaces/components/dividers/LineDivider";
import { CartItem as CartItemTypes } from "@/types/types";
import CartItem from "./CartItem";

interface CartNavDesktop {
  userId: number;
  cart: Record<number, { shop_name: string; products: CartItemTypes[]; shop_id: number }>;
  totalItems: number;
}

export default function CartNavDesktop({ userId, cart, totalItems }: CartNavDesktop) {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <button className="flex items-center justify-center gap-3 rounded-lg py-2 px-4 hover:bg-light-gray transition ease-in-out duration-300">
          <span className="w-full h-full relative">
            <Image src={ShopIcon} alt="Cart Icon" />
            <span className="absolute top-1 right-1 min-w-6 min-h-6 tablet:min-h-13 tablet:min-w-13 bg-red text-white rounded align-middle text-center text-[0.5rem] tablet:text-sm tablet:p-1">
              {totalItems}
            </span>
          </span>
          <span>Cart</span>
        </button>
      </PopoverHandler>
      <PopoverContent className="w-[464px] min-h-[200px] z-50 shadow-lg">
        <div className="w-full h-full p-10">
          <div className="w-full flex items-center justify-between">
            <h3>Cart</h3>
            <a href="/cart" className="font-semibold text-primary">
              See
            </a>
          </div>
          <LineDivider className="my-10" />
          {Object.keys(cart).length !== 0 ? (
            <div className="flex flex-col gap-5">
              {Object.entries(cart).map(([shop_id, shop], index) => (
                <div key={index}>
                  <p className="text-sm capitalize font-semibold">{shop.shop_name}</p>
                  <div className="flex flex-col gap-5">
                    {shop.products.map((product, index) => (
                      <CartItem {...product} key={index} />
                    ))}
                  </div>
                  <LineDivider className="my-10" />
                </div>
              ))}
            </div>
          ) : (
            <p className="w-full text-center mt-20">No product in cart</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
