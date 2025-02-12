"use client";

import { Product } from "@/types/types";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import AddToCartModal from "../../modals/AddToCartModal";
import uriHelpers from "@/utils/uriHelpers";
import CartIcon from "@/../public/icons/shopping-bag-white.svg";

interface ProductItemProps extends Product {
  token?: string | undefined;
  userId: number;
}

export default function ProductItem({
  product_id,
  product_name,
  image,
  category,
  discount,
  shop,
  ratings,
  sold,
  variant,
  product_type,
  token,
  userId,
}: ProductItemProps) {
  const firstImageUrl = useMemo(() => {
    const defaultUrl = "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY";

    const isValidUrl = (url: any) => {
      try {
        new URL(url); // Jika URL tidak valid, ini akan melempar error
        return true;
      } catch {
        return false;
      }
    };
    return typeof image?.[0] === "string" && isValidUrl(image[0]) ? image[0] : defaultUrl;
  }, [image]);

  // State for AddToCartModal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Formated product and shop name for URL
  const formatedShopnameForUrl = uriHelpers.formatStringForUrl(shop.shop_name ?? "shop");
  const formatedProductnameForUrl = uriHelpers.formatStringForUrl(product_name);

  // Formated price from first variant
  const getFormatedPrice = useMemo(() => {
    if (variant?.length !== 0) {
      return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(variant?.[0].variant_price ?? 0);
    }
    return "Rp. 0";
  }, [variant]);

  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);
  const formattedRatings = ratings ? parseFloat(parseFloat(ratings).toFixed(2)) : 0;
  if (!product_id)
    return (
      <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
        <div className="w-full h-1/2 bg-gray animate-pulse"></div>
        <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
          <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
          <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
          <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
          <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
          <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
        </div>
      </div>
    );
  return (
    <div className="shadow-md w-56 h-[330px] desktop:h-auto desktop:w-full bg-white rounded-lg flex flex-col relative mr-10">
      {product_type === "organic" && (
        <div className="absolute top-0 right-0 pb-1 px-10 bg-secondary rounded-tr-lg rounded-bl-lg">
          <span className="capitalize text-xs text-primary font-semibold">{product_type}</span>
        </div>
      )}
      <div className="w-full h-[176px] overflow-hidden">
        <Image
          src={firstImageUrl}
          width={112}
          height={88}
          quality={30}
          className="w-full h-full object-cover object-center rounded-t-lg"
          alt="Product Image"
        />
      </div>
      <div className="w-full flex-grow p-5 flex flex-col justify-between desktop:gap-3">
        <p className="text-dark-gray text-[0.5rem] tablet:text-xs capitalize desktop:text-xs">{category}</p>
        <a
          href={`/${formatedShopnameForUrl}-${shop.shop_id}/${formatedProductnameForUrl}-${product_id}`}
          className="text-base max-h-21 line-clamp-2 capitalize"
        >
          {product_name}
        </a>
        <div className="flex items-center gap-5">
          <p className="font-semibold text-primary">{getFormatedPrice}</p>
          {discountValue && <p className="text-red text-base bg-light-red px-3 desktop:text-xs">{discountValue?.discount_value} %</p>}
        </div>
        <div className="flex items-center text-xs gap-4">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow" />
            <p className="desktop:text-xs">{formattedRatings}</p>
          </div>
          <div>|</div>
          <p className="desktop:text-xs">{sold} Sold</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-gray">
          <FaLocationDot className="desktop:text-xs" />
          <p className="capitalize desktop:text-xs">{shop.shop_address_city}</p>
        </div>
      </div>
      <div className="absolute bottom-5 right-5">
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
          token={token}
          userId={userId}
        />
      </div>
    </div>
  );
}
