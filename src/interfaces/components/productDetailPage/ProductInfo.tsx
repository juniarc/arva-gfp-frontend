"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { checkIsTextClamped } from "@/utils/elementHelpers";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Discount, Shop, Variant } from "@/types/types";

gsap.registerPlugin(useGSAP);

interface ProductInfoProps {
  product_name: string;
  category: string;
  description: string;
  shop: Shop;
  variant: Variant[];
  discount: Discount[];
  sold: number;
  ratings: string;
  isWishlist: boolean;
}

export default function ProductInfo({ product_name, category, description, shop, variant, discount, sold, ratings, isWishlist }: ProductInfoProps) {
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const [isTexClamped, setIsTexClamped] = useState<boolean>(false);
  const [descMoreOpen, setDescMoreOpen] = useState<boolean>(false);

  useEffect(() => {
    const isTexClamped = descRef.current ? checkIsTextClamped(descRef.current) : false;
    setIsTexClamped(isTexClamped);
  }, [descRef]);
  const handleDescMoreButton = () => {
    setDescMoreOpen((prev) => !prev);
  };

  const getFormatedPrice = useMemo(() => {
    if (variant?.length !== 0) {
      return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(variant?.[0].variant_price ?? 0);
    }
    return "Rp. 0";
  }, [variant]);

  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);

  return (
    <div className="p-10 tablet:px-[150px]">
      <div className="w-full  flex flex-col gap-5 tablet:gap-10">
        <p className="text-dark-gray text-xxs tablet:text-sm capitalize">{category}</p>
        <p className="text-base font-semibold">{product_name}</p>
        <div className="flex items-center gap-5 tablet:gap-10">
          <div className="flex items-center gap-5">
            <p className="font-bold text-primary tablet:text-[1.375rem]">{getFormatedPrice}</p>
            <p className="text-dark-gray text-xs tablet:text-sm capitalize">/{variant[0].variant_unit}</p>
          </div>
          <p className="text-red text-base bg-light-red px-3">{discountValue?.discount_value} %</p>
        </div>
        <div className="flex items-center text-xs tablet:text-base gap-4">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow" />
            <p>{ratings ?? 0}</p>
          </div>
          <div>|</div>
          <p>{sold} Sold</p>
        </div>
        {/* <div className="flex items-center gap-2 text-xs tablet:text-base text-dark-gray">
          <FaLocationDot />
          <p className="capitalize">{shop.shop_address_city}</p>
        </div> */}
      </div>
      <div className="mt-10">
        <h3 className="mb-6">Description</h3>
        <p ref={descRef} className={`text-xs tablet:text-base ${descMoreOpen ? "" : "line-clamp-4"}`}>
          {description}
          {description}
        </p>
        {isTexClamped && (
          <button onClick={handleDescMoreButton} className="w-full bg-secondary text-xs flex items-center justify-center py-5 rounded mt-5">
            <span className="flex items-center gap-2">
              <p className="font-light">{descMoreOpen ? "Hide description" : "Read description"}</p>
              <BsChevronDown className={descMoreOpen ? "rotate-180" : ""} />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
