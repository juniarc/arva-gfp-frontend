"use client";

import { Product } from "@/types/types";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import CartIcon from "@/../public/icons/shopping-bag-white.svg";
import { MdOutlineShoppingBag } from "react-icons/md";
import AddToCartModal from "../modals/AddToCartModal";
import Link from "next/link";
import uriHelpers from "@/utils/uriHelpers";
import { formatPrice } from "@/utils/elementHelpers";

export default function ProductItem({ product_id, product_name, image, category, discount, shop, ratings, sold, variant, product_type }: Product) {
  // Set first Image
  const firstImageUrl = useMemo(() => {
    return image?.[0] ?? "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY";
  }, [image]);

  // State for AddToCartModal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Formated product and shop name for URL
  const formatedShopnameForUrl = uriHelpers.formatStringForUrl("shop-1");
  const formatedProductnameForUrl = uriHelpers.formatStringForUrl(product_name);

  // Formated price from first variant
  const getFormatedPrice = useMemo(() => {
    if (variant?.length !== 0) {
      return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(variant?.[0].variant_price ?? 0);
    }
    return "Rp. 0";
  }, [variant]);

  // Find percentage discount
  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);
  const formattedRatings = ratings ? parseFloat(parseFloat(ratings).toFixed(2)) : 0;

  return (
    <div className="shadow-lg w-full h-[300px] desktop:h-auto desktop:w-full bg-white rounded-lg flex flex-col relative mr-10">
      <div className="w-full h-1/2 overflow-hidden relative">
        <div className="w-full h-full overflow-hidden">
          <img
            src={`${firstImageUrl}`}
            width={224}
            height={176}
            className="w-full h-full min-h-full min-w-full object-cover object-center rounded-t-lg"
            alt="Product Image"
          />
        </div>
        <div className="absolute top-0 right-0 bg-secondary rounded-tr-lg rounded-bl-lg px-5 py-1">
          <p className="text-xs font-semibold text-primary">Organic</p>
        </div>
      </div>
      <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
        <p className="text-dark-gray mb-3 text-[0.5rem] tablet:text-xs capitalize desktop:text-xs">{category}</p>
        <Link
          href={`/${formatedShopnameForUrl}/${formatedProductnameForUrl}-${product_id}`}
          className="text-base line-clamp-2 text-overflow-ellipsis capitalize mb-auto"
        >
          {product_name}
        </Link>
        <div className="flex items-center gap-5 mb-3 mt-3">
          <p className="font-semibold text-primary tablet:text-[1.375rem]">{getFormatedPrice}</p>
          {discountValue && (
            <p className="text-red bg-light-red px-3 tablet:py-2 text-xs tablet:text-[0.9375rem]">{discountValue.discount_value} %</p>
          )}
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow text-xs tablet:text-[0.9375rem]" />
            <p className="text-xs tablet:text-[0.9375rem]">{formattedRatings ?? 0}</p>
          </div>
          <div className="w-[0.5px] h-5 bg-black"></div>
          <p className="text-xs tablet:text-[0.9375rem]">{sold} Sold</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-gray">
          <FaLocationDot className="text-xs tablet:text-[0.9375rem]" />
          <p className="capitalize text-xs tablet:text-[0.9375rem]">{shop.shop_address_city}</p>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 tablet:bottom-7 tablet:right-7">
        <button
          onClick={() => setIsOpen(true)}
          data-modal-target="addToCartModal"
          data-modal-toggle="addToCartModal"
          className="bg-primary w-15 h-15 rounded flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors ease-in"
        >
          <div>
            <Image src={CartIcon} className="w-10 h-10" alt="Cart Icon" />
          </div>
        </button>
        <AddToCartModal
          isOpen={isOpen}
          handleCloseModal={() => setIsOpen(false)}
          {...{ product_id, product_name, category, variant, discount }}
          imageUrl={firstImageUrl}
        />
      </div>
    </div>
  );
}
