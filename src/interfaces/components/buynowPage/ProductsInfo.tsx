"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";
import LineDivider from "../dividers/LineDivider";
import { Product, ShopingItem } from "@/types/types";
import { currencyFormater } from "@/utils/elementHelpers";
import defaultImage from "@/../public/images/24493070_6962884.jpg";

interface ProductsInfoProps extends ShopingItem {
  handleQuantityChange: (newQuantity: number, maxStock: number) => void;
  isChecked: boolean;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalPriceItem: number;
}

export default function ProductsInfo({
  product_id,
  product_name,
  shop,
  image,
  selectedVariant,
  quantity,
  discount,
  priceAfterDiscount,
  handleQuantityChange,
  isChecked,
  handleCheckbox,
  totalPriceItem,
}: ProductsInfoProps) {
  const formatedPriceDiscount = currencyFormater.format(totalPriceItem);
  if (!image) {
    return (
      <div className="mt-10">
        <h4 className="mb-5">Checkout Items</h4>
        <div>
          <div>
            <div className="flex items-center gap-5 mb-5">
              <div className="w-12 aspect-square">
                <div className="w-full h-full bg-gray animate-pulse rounded-full"></div>
              </div>
              <div className="w-32 bg-gray animate-pulse h-5 rounded"></div>
            </div>

            <div className="flex items-start gap-5 tablet:gap-10 mt-5 tablet:mt-10">
              <div className="w-[100px] tablet:w-[122px] desktop:w-[126px] aspect-square">
                <div className="w-full h-full bg-gray animate-pulse rounded-lg"></div>
              </div>

              <div className="font-normal w-4/5 desktop:w-full flex flex-col gap-4">
                <div className="w-32 bg-gray animate-pulse h-5 rounded"></div>
                <div className="w-1/2 bg-gray animate-pulse h-5 rounded"></div>
                <div className="w-32 bg-gray animate-pulse h-5 rounded"></div>
                <div className="w-32 bg-gray animate-pulse h-5 rounded"></div>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <div className="text-dark-gray flex items-center tablet:gap-10 border-solid border-gray border w-fit h-15 rounded-lg p-5 tablet:p-10">
                <div className="w-10 h-10 bg-gray animate-pulse rounded-full"></div>
                <div className="w-10 h-10 bg-gray animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-10">
      <h4 className="mb-5">Checkout Items</h4>
      <div>
        <div>
          <div className="flex items-center gap-5 mb-5">
            <div className="w-12 aspect-square">
              {shop.shop_image ? (
                <Image
                  src={shop.shop_image}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover object-center rounded-full"
                  alt="Product Image"
                />
              ) : (
                <div className="w-full h-full bg-gray animate-pulse rounded-full"></div>
              )}
            </div>
            <p className="font-semibold capitalize">{shop.shop_name}</p>
          </div>
          <div className="flex items-start gap-5 tablet:gap-10 mt-5 tablet:mt-10">
            <div className="w-[100px] tablet:w-[122px] desktop:w-[126px] aspect-square ">
              {image ? (
                <Image src={image} width={92} height={92} className="w-full h-full object-cover object-center rounded-lg" alt="Product Image" />
              ) : (
                <div className="w-full h-full bg-gray animate-pulse rounded-lg"></div>
              )}
            </div>
            <div className="font-normal w-4/5 desktop:w-full flex flex-col gap-4">
              <p>{product_name}</p>
              <p className="text-dark-gray">{selectedVariant.variant_name}</p>
              <p className="font-semibold tablet:text-[1.375rem] desktop:text-2xl">{formatedPriceDiscount}</p>
              <p>
                Total units: {quantity} {selectedVariant.variant_unit}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="text-dark-gray flex items-center tablet:gap-10 border-solid  border-gray border w-fit h-15 rounded-lg p-5 tablet:p-10">
              <button
                onClick={() => {
                  handleQuantityChange(quantity - 1, selectedVariant.variant_stock);
                }}
              >
                <LuMinus />
              </button>
              <input
                type="number"
                minLength={1}
                maxLength={selectedVariant.variant_stock}
                value={quantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (!isNaN(newQuantity)) {
                    handleQuantityChange(newQuantity, selectedVariant.variant_stock);
                  }
                }}
                className="w-30 desktop:w-55 text-center text-black pl-3 bg-transparent"
                disabled
              />
              <button
                onClick={() => {
                  handleQuantityChange(quantity + 1, selectedVariant.variant_stock);
                }}
              >
                <LuPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-10">
        <span className="text-dark-gray text-xs tablet:text-base desktop:text-base flex gap-2 items-center underline">
          <GoShieldCheck /> Total damage protection 3 months
        </span>
        <div className="text-xs tablet:text-base desktop:text-base text-dark-gray flex gap-5 items-center">
          <span>(Rp. 2000)</span>
          <Checkbox checked={isChecked} onChange={handleCheckbox} className="w-12 h-12 checked:bg-primary" crossOrigin={undefined} />
        </div>
      </div>
      <LineDivider className="my-10" />
    </div>
  );
}
