"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaLocationDot, FaHeart, FaRegHeart } from "react-icons/fa6";
import ShopIcon from "@/../public/icons/shopping-bag-white.svg";
import AddToCartModal from "../modals/AddToCartModal";
import { Discount, Product, Variant, WishlistItem } from "@/types/types";
import { useMemo, useState } from "react";
import uriHelpers from "@/utils/uriHelpers";

interface ProductItemProps extends WishlistItem {
  isWishlist: boolean;
  token: string | undefined;
}

export default function ProductItem({
  product_id,
  product_name,
  image,
  category_name,
  discount,
  shop,
  rating,
  sold,
  variant,
  product_type,
  token,
  isWishlist,
}: ProductItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formatedShopnameForUrl = uriHelpers.formatStringForUrl(shop.shop_name);
  const formatedProductnameForUrl = uriHelpers.formatStringForUrl(product_name);

  const getFormatedPrice = useMemo(() => {
    if (variant?.length !== 0) {
      return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(variant?.[0].price ?? 0);
    }
    return "Rp. 0";
  }, [variant]);

  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);
  const formattedRatings = rating ? parseFloat(parseFloat(rating).toFixed(2)) : 0;

  const mappedVariant = variant.map((item) => ({
    variant_id: item.variant_id,
    variant_name: item.variant_name,
    variant_price: item.price,
    variant_stock: item.stock,
    variant_unit: item.unit,
  }));

  return (
    <div className="shadow-md max-w-[188px] tablet:max-w-full w-full min-h-[330px] desktop:w-full desktop:max-w-[220px] bg-white rounded-lg flex flex-col relative mr-10">
      <div className="w-full h-[144px] tablet:h-1/2 desktop:h-1/2 overflow-hidden">
        <Image
          src={image[0].image_data}
          width={188}
          height={176}
          quality={100}
          className="w-full h-full object-cover object-center rounded-t-lg"
          alt="Product Image"
        />
      </div>
      <div className="w-full flex-grow p-5 tablet:p-7 desktop:p-7 flex flex-col justify-between desktop:gap-3">
        <p className="text-dark-gray text-[0.5rem]  tablet:text-xs capitalize desktop:text-base mb-3">{category_name}</p>
        <a
          href={`/${formatedShopnameForUrl}-${shop.shop_id}/${formatedProductnameForUrl}-${product_id}`}
          className="text-sm desktop:text-base max-h-21 mb-3 line-clamp-2 capitalize"
        >
          {product_name}
        </a>
        <div className="flex items-center gap-5 mb-3">
          <p className="font-semibold text-primary tablet:text-[1.375rem] desktop:text-xl">{getFormatedPrice}</p>
          <p className="text-red bg-light-red px-3 text-xs tablet:text-[0.9375rem] desktop:text-base">{discountValue?.discount_value} %</p>
        </div>
        <div className="flex items-center text-xs gap-4 mb-3">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow text-xs text-[0.9375rem] desktop:text-base" />
            <p className=" text-xs text-[0.9375rem] desktop:text-xs">{formattedRatings ?? 0}</p>
          </div>
          <div>|</div>
          <p className="text-xs text-[0.9375rem]">{sold} Sold</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[0.9375rem] text-dark-gray">
          <FaLocationDot className=" text-xs text-[0.9375rem]" />
          <p className="capitalize text-xs text-[0.9375rem]">{shop.shop_address_city}</p>
        </div>
        <div className="flex items-center gap-2 tablet:gap-5 mt-5 tablet:mt-10 desktop:mt-10">
          <button className="border border-red border-solid rounded h-15 w-15 min-w-15 tablet:w-20 tablet:min-w-20 tablet:h-20 desktop:w-20 desktop:min-w-20 desktop:h-20 flex items-center justify-center hover:text-white hover:bg-red">
            <FaHeart className="text-sm tablet:text-xl desktop:text-xl text-red hover:text-white" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            data-modal-target="addToCartModal"
            data-modal-toggle="addToCartModal"
            className="bg-primary w-full h-15 desktop:h-20 tablet:h-20 px-5 rounded flex items-center justify-between tablet:justify-center desktop:justify-center tablet:gap-10 desktop:gap-3 hover:bg-primary hover:text-white transition-colors ease-in"
          >
            <div>
              <Image src={ShopIcon} className="w-9 h-9 tablet:w-12 tablet:h-12 desktop:w-12 desktop:h-12" alt="shop Icon" />
            </div>
            <span className="text-xs text-[0.9375rem] desktop:text-[0.9375rem] font-semibold text-white">Add To Cart</span>
          </button>
          <AddToCartModal
            isOpen={isOpen}
            handleCloseModal={() => setIsOpen(false)}
            {...{ product_id, product_name, variant, discount }}
            imageUrl={image[0].image_data}
            category={category_name}
            token={token}
            variant={mappedVariant}
          />
        </div>
      </div>
    </div>
  );
}
