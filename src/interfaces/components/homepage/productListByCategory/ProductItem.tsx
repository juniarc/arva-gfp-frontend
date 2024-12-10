"use client";

import { Product } from "@/types/types";
import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import AddToCartModal from "../../modals/AddToCartModal";
import Link from "next/link";
import uriHelpers from "@/utils/uriHelpers";

export default function ProductItem({ id, name, price, imageUrl, category, discount, shop, rating, sold, variants, stocks, unit }: Product) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formatedShopnameForUrl = uriHelpers.formatStringForUrl(shop.name);
  const formatedProductnameForUrl = uriHelpers.formatStringForUrl(name);
  return (
    <div className="shadow-md w-56 h-[330px] desktop:h-auto desktop:w-full bg-white rounded-lg flex flex-col relative mr-10">
      <div className="w-full h-[176px] overflow-hidden">
        <Image
          src={`${imageUrl[0]}`}
          width={224}
          height={176}
          quality={100}
          className="w-full h-full object-cover object-center rounded-t-lg"
          alt="Product Image"
        />
      </div>
      <div className="w-full flex-grow p-5 flex flex-col justify-between desktop:gap-3">
        <p className="text-dark-gray text-[0.5rem] tablet:text-xs capitalize desktop:text-xs">{category}</p>
        <Link href={`/${formatedShopnameForUrl}/${formatedProductnameForUrl}-${id}`} className="text-base max-h-21 line-clamp-2">
          {name}
        </Link>
        <div className="flex items-center gap-5">
          <p className="font-semibold text-primary">Rp. {price}</p>
          <p className="text-red text-base bg-light-red px-3 desktop:text-xs">{discount} %</p>
        </div>
        <div className="flex items-center text-xs gap-4">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow" />
            <p className="desktop:text-xs">{rating}</p>
          </div>
          <div>|</div>
          <p className="desktop:text-xs">{sold} Sold</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-gray">
          <FaLocationDot className="desktop:text-xs" />
          <p className="capitalize desktop:text-xs">{shop.addressCity}</p>
        </div>
      </div>
      <div className="absolute bottom-5 right-5">
        <button
          onClick={() => setIsOpen(true)}
          data-modal-target="addToCartModal"
          data-modal-toggle="addToCartModal"
          className="bg-secondary w-15 h-15 rounded flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors ease-in"
        >
          <MdOutlineShoppingBag />
        </button>
        <AddToCartModal
          isOpen={isOpen}
          handleCloseModal={() => setIsOpen(false)}
          {...{ id, name, price, imageUrl, category, variants, stocks, unit, discount }}
        />
      </div>
    </div>
  );
}
