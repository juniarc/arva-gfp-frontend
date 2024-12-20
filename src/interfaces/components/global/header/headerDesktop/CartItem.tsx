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
    <div className="flex items-start gap-5 mt-5">
      <div className="w-24 min-24-w aspect-square overflow-hidden">
        <Image src={image} width={48} height={48} className="w-full h-full object-cover object-center rounded" alt="Product image" />
      </div>
      <div className="mr-auto max-w-[247px]">
        <p className="text-sm truncate">{product_name}</p>
        <p className="text-dark-gray text-sm mt-3">{selectedVariant.variant_name}</p>
      </div>
      <div className="min-w-fit">
        <p className="font-semibold">
          {quantity} x {formatedPriceDiscount}
        </p>
      </div>
    </div>
  );
}
