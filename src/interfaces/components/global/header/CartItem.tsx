import Image from "next/image";
import React, { useMemo } from "react";
import dummyPhotoProduct from "@/../public/images/dummy-photo-product.jpg";
import { CartItem as CartItemType } from "@/types/types";
import { currencyFormater } from "@/utils/elementHelpers";

export default function CartItem({ image, product_name, selectedVariant, discount, quantity }: CartItemType) {
  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);
  const priceAfterDiscount = useMemo(() => {
    if (!discountValue) return selectedVariant?.variant_price ?? 0;

    const discountPrice = ((selectedVariant?.variant_price ?? 0) * discountValue.discount_value) / 100;
    return (selectedVariant?.variant_price ?? 0) - discountPrice;
  }, [selectedVariant, discountValue]);

  const formatedPriceDiscount = currencyFormater.format(priceAfterDiscount * quantity);
  return (
    <>
      <div className="w-full flex gap-5 items-start">
        <div className="w-15 min-w-15 h-15 tablet:w-30 tablet:h-30 overflow-hidden">
          <Image src={image} width={30} height={30} alt="Product Image" className="w-full h-full object-cover object-center rounded" />
        </div>
        <div className="text-[0.625rem] tablet:text-base w-full tablet:w-auto overflow-hidden">
          <p className="max-w-full truncate capitalize">{product_name}</p>
          <p className=" text-dark-gray capitalize">{selectedVariant.variant_name}</p>
          <p className="font-bold">
            {quantity} x {formatedPriceDiscount}
          </p>
        </div>
      </div>
    </>
  );
}
