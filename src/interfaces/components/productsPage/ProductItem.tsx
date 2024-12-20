"use client";

import { Discount, Product, Variant } from "@/types/types";
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
export interface productTest {
  product_id: number;
  product_name: string;
  description: string;
  product_type: string;
  images: string[];
  category: string;
  discounts: Discount[];
  ratings: string;
  shipping_cost: number;
  shop: { shop_id: number; shop_address_city: string; shop_name: string };
  sold: number;
  variants: {
    price: number;
    product_id: number;
    stock: number;
    unit: string;
    variant_id: number;
    variant_name: string;
  }[];
  status: string;
  created_at: string;
  tag: any;
}
interface ProductItemProps extends productTest {
  userId: number;
  token: string | undefined;
}
export default function ProductItem({
  userId,
  product_id,
  product_name,
  images,
  category,
  discounts,
  shop,
  ratings,
  sold,
  variants,
  product_type,
  token,
}: ProductItemProps) {
  // Set first Image
  const firstImageUrl = useMemo(() => {
    return images?.[0] ?? "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY";
  }, [images]);

  // State for AddToCartModal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Formated product and shop name for URL
  const formatedShopnameForUrl = uriHelpers.formatStringForUrl(shop.shop_name ?? "shop");
  const formatedProductnameForUrl = uriHelpers.formatStringForUrl(product_name);

  // Formated price from first variant
  const getFormatedPrice = useMemo(() => {
    if (variants?.length !== 0) {
      return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(variants?.[0].price ?? 0);
    }
    return "Rp. 0";
  }, [variants]);

  // Find percentage discount
  const discountValue = useMemo(() => discounts?.find((item) => item.discount_type === "percentage"), [discounts]);
  const formattedRatings = ratings ? parseFloat(parseFloat(ratings).toFixed(2)) : 0;

  const mappVariant = () => {
    return variants?.map((item) => ({
      variant_id: item.variant_id,
      variant_name: item.variant_name,
      variant_price: item.price,
      variant_stock: item.stock,
      variant_unit: item.unit,
    }));
  };

  return (
    <div className="shadow-lg w-full h-[300px] desktop:h-auto desktop:w-full bg-white rounded-lg flex flex-col mr-10 relative">
      {product_type === "organic" && (
        <div className="absolute top-0 right-0 pb-1 px-10 bg-secondary rounded-tr-lg rounded-bl-lg">
          <span className="capitalize text-xs text-primary font-semibold">{product_type}</span>
        </div>
      )}
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
        <a
          href={`/${formatedShopnameForUrl}-${shop.shop_id}/${formatedProductnameForUrl}-${product_id}`}
          className="text-base line-clamp-2 text-overflow-ellipsis capitalize mb-auto"
        >
          {product_name}
        </a>
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
          <p className="text-xs tablet:text-[0.9375rem]">{sold ?? 0} Sold</p>
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
          {...{ product_id, product_name, category, variant: mappVariant(), discount: discounts }}
          imageUrl={firstImageUrl}
          userId={userId}
          token={token}
        />
      </div>
    </div>
  );
}
