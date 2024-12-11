"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaLocationDot, FaHeart, FaRegHeart } from "react-icons/fa6";
import ShopIcon from "@/../public/icons/shopping-bag-white.svg";
import AddToCartModal from "../modals/AddToCartModal";
import { Variants } from "@/types/types";
import { useState } from "react";
import uriHelpers from "@/utils/uriHelpers";

export interface ProductItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string[];
  category: string;
  stocks: number;
  unit: string;
  discount: number;
  rating: number;
  shop: { id: number; name: string; imageUrl: string; addressCity: string; shippingChannel: string[] };
  sold: number;
  variants: Variants[];
  tags: string[];
}

export default function ProductItem({ id, name, price, imageUrl, category, discount, shop, rating, sold, variants, stocks, unit }: ProductItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formatedShopnameForUrl = uriHelpers.formatStringForUrl(shop.name);
  const formatedProductnameForUrl = uriHelpers.formatStringForUrl(name);

  return (
    <div className="shadow-md max-w-[188px] w-full min-h-[330px] bg-white rounded-lg flex flex-col relative mr-10">
      <div className="w-full h-[144px] overflow-hidden">
        <Image
          src={`${imageUrl[0]}`}
          width={188}
          height={176}
          quality={100}
          className="w-full h-full object-cover object-center rounded-t-lg"
          alt="Product Image"
        />
      </div>
      <div className="w-full flex-grow p-5 flex flex-col justify-between desktop:gap-3">
        <p className="text-dark-gray text-[0.5rem]  tablet:text-xs capitalize desktop:text-xs mb-3">{category}</p>
        <Link href={`/${formatedShopnameForUrl}/${formatedProductnameForUrl}-${id}`} className="text-sm max-h-21 mb-3 line-clamp-2">
          {name}
        </Link>
        <div className="flex items-center gap-5 mb-3">
          <p className="font-semibold text-primary">Rp. {price}</p>
          <p className="text-red bg-light-red px-3 text-xs">{discount} %</p>
        </div>
        <div className="flex items-center text-xs gap-4 mb-3">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow text-xs" />
            <p className=" text-xs">{rating}</p>
          </div>
          <div>|</div>
          <p className="text-xs">{sold} Sold</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-gray">
          <FaLocationDot className=" text-xs" />
          <p className="capitalize text-xs">{shop.addressCity}</p>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <button className="border border-red border-solid rounded h-15 w-15 min-w-15 flex items-center justify-center hover:text-white hover:bg-red">
            <FaHeart className="text-sm text-red hover:text-white" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            data-modal-target="addToCartModal"
            data-modal-toggle="addToCartModal"
            className="bg-primary w-full h-15 px-5 rounded flex items-center justify-between hover:bg-primary hover:text-white transition-colors ease-in"
          >
            <div>
              <Image src={ShopIcon} className="w-9 h-9" alt="shop Icon" />
            </div>
            <span className="text-xs font-semibold text-white">Add To Cart</span>
          </button>
          <AddToCartModal
            isOpen={isOpen}
            handleCloseModal={() => setIsOpen(false)}
            {...{ id, name, price, imageUrl, category, variants, stocks, unit, discount }}
          />
        </div>
      </div>
    </div>
  );
}
