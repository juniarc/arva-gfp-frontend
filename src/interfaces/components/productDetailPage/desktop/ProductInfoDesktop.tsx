"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { checkIsTextClamped } from "@/utils/elementHelpers";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProductBuySection from "./ProductBuySection";

gsap.registerPlugin(useGSAP);

interface ProductInfoProps {
  id: number;
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
  variants: string[];
}

export default function ProductInfoDesktop({
  id,
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
  variants,
}: ProductInfoProps) {
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const [isTexClamped, setIsTexClamped] = useState<boolean>(false);
  const [descMoreOpen, setDescMoreOpen] = useState<boolean>(false);

  useEffect(() => {
    const isTexClamped = descRef.current ? checkIsTextClamped(descRef.current) : false;
    console.log(descRef.current?.scrollHeight, "scrollheight");
    console.log(descRef.current?.clientHeight, "clientHeight");
    setIsTexClamped(isTexClamped);
  }, [descRef]);
  const handleDescMoreButton = () => {
    setDescMoreOpen((prev) => !prev);
  };

  return (
    <div className="p-10 tablet:px-[150px] desktop:p-0">
      <div className="w-full flex flex-col gap-5 tablet:gap-10">
        <p className="text-dark-gray text-xxs tablet:text-sm desktop:text-base capitalize">{category}</p>
        <p className="text-base font-semibold desktop:text-lg">{name}</p>
        <div className="flex items-center gap-5 tablet:gap-10 desktop:mt-5">
          <div className="flex items-center gap-5">
            <p className="font-bold text-primary tablet:text-[1.375rem] desktop:text-3xl">Rp. {price}</p>
            <p className="text-dark-gray text-xs tablet:text-sm capitalize desktop:text-base">/{unit}</p>
          </div>
          <p className="text-red text-base bg-light-red px-3">{discount} %</p>
        </div>
        <div className="flex items-center text-xs tablet:text-base gap-4 desktop:mt-10">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow" />
            <p>{rating}</p>
          </div>
          <div>|</div>
          <p>{sold} Sold</p>
        </div>
        <p className="my-10">Stocks: {stocks}</p>
      </div>
      <ProductBuySection {...{ id, name, price, variants, stocks, unit }} />
      <div className="mt-10">
        <h3 className="mb-6">Description</h3>
        <p ref={descRef} className={` ${descMoreOpen ? "" : "line-clamp-3"}`}>
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
