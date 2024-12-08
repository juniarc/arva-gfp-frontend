"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";
import LineDivider from "../dividers/LineDivider";
import { Product } from "@/types/types";

interface ProductsInfoProps {
  product: Product;
  productQuantity: number;
  totalPrice: number;
  handleQuantityChange: (newQuantity: number) => void;
  isChecked: boolean;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductsInfo({ product, productQuantity, totalPrice, handleQuantityChange, isChecked, handleCheckbox }: ProductsInfoProps) {
  return (
    <div className="mt-10">
      <h4 className="mb-5">Checkout Items</h4>
      <div>
        <div>
          <div className="flex items-center gap-5 mb-5">
            <div className="w-12 aspect-square">
              <Image
                src={product.imageUrl}
                width={20}
                height={20}
                className="w-full h-full object-cover object-center rounded-full"
                alt="Product Image"
              />
            </div>
            <p className="font-semibold">Shop' Name</p>
          </div>
          <div className="flex items-start gap-5 tablet:gap-10 mt-5 tablet:mt-10">
            <div className="w-[100px] tablet:w-[122px] desktop:w-[126px] aspect-square ">
              <Image
                src={product.imageUrl}
                width={92}
                height={92}
                className="w-full h-full object-cover object-center rounded-lg"
                alt="Product Image"
              />
            </div>
            <div className="font-normal w-4/5 desktop:w-full flex flex-col gap-4">
              <p>{product.name}</p>
              <p className="text-dark-gray">Variants</p>
              <p className="font-semibold tablet:text-[1.375rem] desktop:text-2xl">Rp. {totalPrice}</p>
              <p>
                Total units: {productQuantity} {product.unit}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="text-dark-gray flex items-center tablet:gap-10 border-solid  border-gray border w-fit h-15 rounded-lg p-5 tablet:p-10">
              <button
                onClick={() => {
                  const newQuantity = productQuantity - 1;
                  if (newQuantity >= 1) handleQuantityChange(newQuantity);
                }}
              >
                <LuMinus />
              </button>
              <input
                type="number"
                minLength={1}
                maxLength={product.stocks}
                value={productQuantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (newQuantity >= 1 && newQuantity <= product.stocks) {
                    handleQuantityChange(newQuantity);
                  }
                }}
                className="w-30 desktop:w-55 text-center text-black pl-3"
                disabled
              />
              <button
                onClick={() => {
                  const newQuantity = productQuantity + 1;
                  if (newQuantity <= product.stocks) handleQuantityChange(newQuantity);
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
