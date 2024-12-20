"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { checkIsTextClamped, currencyFormater } from "@/utils/elementHelpers";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProductBuySection from "./ProductBuySection";
import { Discount, Shop, Variant } from "@/types/types";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

interface ProductInfoProps {
  product_id: number;
  product_name: string;
  category: string;
  description: string;
  shop: Shop;
  variant: Variant[];
  discount: Discount[];
  sold: number;
  ratings: string;
  wishlistId: number;
  isWishlist: boolean;
  token: string | undefined;
}

export default function ProductInfoDesktop({
  product_id,
  product_name,
  category,
  description,
  shop,
  variant,
  discount,
  sold,
  ratings,
  isWishlist,
  wishlistId,
  token,
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

  const getFormatedPrice = useMemo(() => {
    if (variant?.length !== 0) {
      return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(variant?.[0].variant_price ?? 0);
    }
    return "Rp. 0";
  }, [variant]);

  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(variant?.[0] ?? null);
  const [quantity, setQuantity] = useState<number>(1);

  // Find percentage discount
  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);

  // calculate price after discount
  const priceAfterDiscount = useMemo(() => {
    if (!discountValue) return selectedVariant?.variant_price ?? 0;

    const discountPrice = ((selectedVariant?.variant_price ?? 0) * discountValue.discount_value) / 100;
    return (selectedVariant?.variant_price ?? 0) - discountPrice;
  }, [selectedVariant, discountValue]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    const basePrice = discountValue ? priceAfterDiscount : (selectedVariant?.variant_price ?? 0);
    return basePrice * quantity;
  }, [priceAfterDiscount, selectedVariant, discountValue, quantity]);

  // Formated prices
  const formatedPrice = currencyFormater.format(selectedVariant?.variant_price ?? 0);
  const formatedPriceDiscount = currencyFormater.format(priceAfterDiscount);
  const formatedTotalPrice = currencyFormater.format(totalPrice);

  const handleSelectVariant = (variant: Variant) => setSelectedVariant(variant);

  const handleAddToCart = () => {
    console.log(
      `/buy-now?id=${product_id}&variantId=${selectedVariant?.variant_id}&variantName=${selectedVariant?.variant_name}&price=${selectedVariant?.variant_price}&quantity=${quantity}`,
    );
    // setShowAlert(true);

    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 2000);
  };

  const handleBuyNowBtn = () => {
    router.push(
      `/buy-now?id=${product_id}&variantId=${selectedVariant?.variant_id}&variantName=${selectedVariant?.variant_name}&price=${selectedVariant?.variant_price}&quantity=${quantity}`,
    );
  };

  return (
    <div className="p-10 tablet:px-[150px] desktop:p-0">
      <div className="w-full flex flex-col gap-5 tablet:gap-10">
        <p className="text-dark-gray text-xxs tablet:text-sm desktop:text-base capitalize">{category}</p>
        <p className="text-base font-semibold desktop:text-lg">{product_name}</p>
        <div className="flex items-center gap-5 tablet:gap-10 desktop:mt-5">
          <div className="flex items-center gap-5">
            <p className="font-bold text-primary text-2xl">{formatedPrice}</p>
            <p className="text-dark-gray text-xs tablet:text-sm capitalize">/{selectedVariant?.variant_unit}</p>
          </div>
          {discountValue && <p className="text-red text-base bg-light-red px-3">{discountValue?.discount_value} %</p>}
          {discountValue && (
            <div className="flex items-center">
              <p className="text-primary font-semibold tablet:text-[1.375rem] desktop:text-xl">{formatedPriceDiscount}</p>
              <p className="text-xss text-dark-gray tablet:text-[1.375rem] desktop:text-base">/ {selectedVariant?.variant_unit}</p>
            </div>
          )}
        </div>
        <div className="flex items-center text-xs tablet:text-base gap-4 desktop:mt-10 ">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow" />
            <p>{ratings ?? 0}</p>
          </div>
          <div>|</div>
          <p>{sold} Sold</p>
        </div>
        <p className="my-10">Stocks: {selectedVariant?.variant_stock}</p>
      </div>
      <ProductBuySection
        product_id={product_id}
        product_name={product_name}
        isWishlist={isWishlist}
        discount={discount}
        variant={variant}
        selectedVariant={selectedVariant}
        handleSelectVariant={handleSelectVariant}
        handleATCBtn={handleAddToCart}
        handleBuynowBtn={handleBuyNowBtn}
        quantity={quantity}
        setQuantity={setQuantity}
        totalPrice={formatedTotalPrice}
        wishlistId={wishlistId}
        token={token}
      />
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
