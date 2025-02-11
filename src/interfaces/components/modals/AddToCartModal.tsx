"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Spinner } from "@material-tailwind/react";
import { LuX, LuMinus, LuPlus } from "react-icons/lu";
import { CartItem, Product } from "@/types/types";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import SuccessAlert from "../alerts/SuccessAlert";
import { Variant, Discount } from "@/types/types";
import { currencyFormater } from "@/utils/elementHelpers";
import { useRouter } from "next/navigation";
import api from "@/services/api/api";
import { useCart } from "@/hooks/cart/CartContext";

interface AddToCartModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  product_id: number;
  product_name: string;
  imageUrl: string;
  category: string;
  discount: Discount[] | null;
  variant: Variant[];
  token?: string | undefined;
  userId: number;
}
export default function AddToCartModal({
  isOpen,
  handleCloseModal,
  product_id,
  product_name,
  imageUrl,
  category,
  variant,
  discount,
  token,
  userId,
}: AddToCartModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variant[0]);
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

  const { state, addItemToCart } = useCart();

  const handleAddToCart = async () => {
    setIsLoading(true);
    if (token && userId) {
      try {
        await addItemToCart(product_id, quantity, selectedVariant?.variant_id ?? 0, token, userId);
      } catch (error) {
        alert("Failed");
      } finally {
        setIsLoading(false);
        handleCloseModal();
      }
    } else {
      router.push("/login");
      // handleCloseModal();
    }
  };
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15">
        <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
          <LuX className="tablet:text-[2rem]" />
        </button>
        <DialogBody className="text-black font-normal">
          <div className="flex gap-6 tablet:gap-10 items-start ">
            <div className="w-2/4 aspect-square">
              <Image src={imageUrl} width={224} height={176} alt="Product Image" className="w-full h-full object-cover object-center rounded-lg" />
            </div>
            <div className="font-normal w-4/5 flex flex-col gap-2">
              <p className="text-dark-gray text-[0.5rem] tablet:text-xs desktop:text-base capitalize">{category}</p>
              <p className="text-base tablet:text-[1.375rem] desktop:text-base">{product_name}</p>
              <div className="flex items-center gap-5">
                <div className="flex items-center ">
                  <p
                    className={`${discountValue ? "line-through text-dark-gray" : "text-primary font-semibold"} tablet:text-[1.375rem] desktop:text-xl`}
                  >
                    {formatedPrice}
                  </p>
                  <p className="text-xss text-dark-gray tablet:text-[1.375rem] desktop:text-base">/ {selectedVariant?.variant_unit}</p>
                </div>
                {discountValue && <p className="text-red text- bg-light-red px-3 ">{discountValue.discount_value} %</p>}
              </div>
              {discountValue && (
                <div className="flex items-center">
                  <p className="text-primary font-semibold tablet:text-[1.375rem] desktop:text-xl">{formatedPriceDiscount}</p>
                  <p className="text-xss text-dark-gray tablet:text-[1.375rem] desktop:text-base">/ {selectedVariant?.variant_unit}</p>
                </div>
              )}
              <p className="text-xs tablet:text-base">Stocks : {selectedVariant?.variant_stock}</p>
            </div>
          </div>
          <LineDivider className="my-6 tablet:my-10" />
          {variant?.length !== 0 && (
            <>
              <div>
                <p className="font-semibold mb-5 tablet:text-[1.375rem]">Variants</p>
                <div className="flex flex-wrap items-center gap-5 w-full">
                  {variant?.map((item, index) => (
                    <button
                      onClick={() => handleSelectVariant(item)}
                      className={`bg-gray w-fit text-nowrap text-xs tablet:text-base py-2 px-10 rounded capitalize ${selectedVariant?.variant_name === item.variant_name ? "bg-secondary font-semibold" : ""}`}
                      key={index}
                    >
                      {item.variant_name}
                    </button>
                  ))}
                </div>
              </div>
              <LineDivider className="my-6 tablet:my-10" />
            </>
          )}
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold mb-5 tablet:text-[1.375rem]">Quantity</p>
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
                maxLength={selectedVariant?.variant_stock ?? 0}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-55 text-center text-black bg-transparent"
                disabled
              />
              <button
                onClick={() => {
                  if (quantity < (selectedVariant?.variant_stock ?? 0)) setQuantity(quantity + 1);
                }}
              >
                <LuPlus />
              </button>
            </div>
          </div>
          <LineDivider className="my-6 tablet:my-10" />

          <div>
            <p className="font-bold text-base tablet:text-[1.375rem] w-full text-end">
              Total <span>{formatedTotalPrice}</span>
            </p>
          </div>
        </DialogBody>
        <DialogFooter className="p-0">
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white py-2 px-10 rounded tablet:text-[1.375rem] tablet:mt-5 font-bold w-full desktop:h-24 text-center flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Add To Cart"}
          </button>
          {/* <SuccessAlert isOpen={showAlert} className="" text="Success add to your cart" /> */}
        </DialogFooter>
      </Dialog>
    );
  }
}
