"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { LuX, LuMinus, LuPlus } from "react-icons/lu";
import { CartItem, Product } from "@/types/types";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface BuyNowModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  variants: string[];
  stocks: number;
  unit: string;
  discount: number;
}
export default function BuyNowModal({
  isOpen,
  handleCloseModal,
  id,
  name,
  price,
  imageUrl,
  category,
  variants,
  stocks,
  unit,
  discount,
}: BuyNowModalProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price);

  useEffect(() => {
    setTotalPrice(price * quantity);
  }, [quantity, price]);
  const handleSelectVariant = (variant: string) => setSelectedVariant(variant);

  const handleBuyBtn = () => {
    router.push(`/buy-now?id=${id}&quantity=${quantity}`);
  };
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5">
        <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
          <LuX />
        </button>
        <DialogBody className="text-black font-normal">
          <div className="flex gap-6 items-start ">
            <div className="w-2/4 aspect-square">
              <Image src={imageUrl} width={224} height={176} alt="Product Image" className="w-full h-full object-cover object-center rounded-lg" />
            </div>
            <div className="font-normal w-4/5 flex flex-col gap-4">
              <p className="text-dark-gray text-[0.5rem] capitalize">{category}</p>
              <p className="text-base ">{name}</p>
              <div className="flex items-center gap-5">
                <div className="flex items-center">
                  <p className="font-semibold text-primary">Rp. {price}</p>
                  <p className="text-xss text-dark-gray">/ {unit}</p>
                </div>
                <p className="text-red text-base bg-light-red px-3">{discount} %</p>
              </div>
              <p className="text-xs">Stocks : {stocks}</p>
            </div>
          </div>
          <LineDivider className="my-6" />
          {variants.length !== 0 && (
            <>
              <div>
                <p className="font-semibold mb-5">Variants</p>
                <div className="grid grid-cols-4 gap-5 w-full">
                  {variants.map((variant, index) => (
                    <button
                      onClick={() => handleSelectVariant(variant)}
                      className={`bg-gray text-xs py-2 px-10 rounded capitalize ${selectedVariant === variant ? "bg-secondary font-semibold" : ""}`}
                      key={index}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
              <LineDivider className="my-6" />
            </>
          )}
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold mb-5">Quantity</p>
            <div className="text-dark-gray flex items-center border-solid border-gray border w-fit rounded-lg py-1 px-10">
              <button
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              >
                <LuMinus />
              </button>
              <input
                type="number"
                minLength={1}
                maxLength={stocks}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-55 text-center text-black"
                disabled
              />
              <button
                onClick={() => {
                  if (quantity < stocks) setQuantity(quantity + 1);
                }}
              >
                <LuPlus />
              </button>
            </div>
          </div>
          <LineDivider className="my-6" />

          <div>
            <p className="font-bold text-base w-full text-end">
              Total <span>Rp. {totalPrice}</span>
            </p>
          </div>
        </DialogBody>
        <DialogFooter className="p-0">
          <button onClick={handleBuyBtn} className="bg-primary text-white py-2 px-10 rounded font-bold w-full text-center">
            Buy Now
          </button>
        </DialogFooter>
      </Dialog>
    );
  }
}
