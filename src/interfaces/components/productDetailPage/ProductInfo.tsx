"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { checkIsTextClamped } from "@/utils/elementHelpers";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProductInfoProps {
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  stocks: number;
  unit: string;
  discount: number;
  sold: number;
  rating: number;
  shopLocation: string;
  isWishlist: boolean;
}

export default function ProductInfo({
  name,
  category,
  description,
  price,
  imageUrl,
  stocks,
  unit,
  discount,
  sold,
  rating,
  shopLocation,
}: ProductInfoProps) {
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

  return (
    <div className="p-10 tablet:px-[150px]">
      <div className="w-full  flex flex-col gap-5 tablet:gap-10">
        <p className="text-dark-gray text-xxs tablet:text-sm capitalize">{category}</p>
        <p className="text-base font-semibold">{name}</p>
        <div className="flex items-center gap-5 tablet:gap-10">
          <div className="flex items-center gap-5">
            <p className="font-bold text-primary tablet:text-[1.375rem]">Rp. {price}</p>
            <p className="text-dark-gray text-xs tablet:text-sm capitalize">/{unit}</p>
          </div>
          <p className="text-red text-base bg-light-red px-3">{discount} %</p>
        </div>
        <div className="flex items-center text-xs tablet:text-base gap-4">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow" />
            <p>{rating}</p>
          </div>
          <div>|</div>
          <p>{sold} Sold</p>
        </div>
        <div className="flex items-center gap-2 text-xs tablet:text-base text-dark-gray">
          <FaLocationDot />
          <p className="capitalize">{shopLocation}</p>
        </div>
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
