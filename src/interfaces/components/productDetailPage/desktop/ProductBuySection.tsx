import React, { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ShopingBag from "@/../public/icons/shopping-bag-white.svg";
import Image from "next/image";
import { Discount, Variant } from "@/types/types";
import api from "@/services/api/api";
interface ProductBuySectionProps {
  product_id: number;
  product_name: string;
  variant: Variant[] | null;
  discount: Discount[] | null;
  handleSelectVariant: (variant: Variant) => void;
  selectedVariant: Variant | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  totalPrice: string;
  handleBuynowBtn: () => void;
  handleATCBtn: () => void;
  wishlistId: number;
  isWishlist: boolean;
  token: string | undefined;
}

export default function ProductBuySection({
  product_id,
  product_name,
  variant,
  discount,
  isWishlist,
  handleSelectVariant,
  selectedVariant,
  quantity,
  setQuantity,
  totalPrice,
  handleATCBtn,
  handleBuynowBtn,
  wishlistId,
  token,
}: ProductBuySectionProps) {
  const [wishlist, setWishlist] = useState(isWishlist);
  const handleWishlist = async () => {
    if (wishlist) {
      setWishlist(false);
      try {
        await api.deleteWishlist(wishlistId, token);
      } catch (error) {
        setWishlist(true);
      }
    } else {
      setWishlist(true);
      try {
        await api.addToWishlist(product_id, token);
      } catch (error) {
        setWishlist(false);
      }
    }
  };
  return (
    <div className="w-fit bg-secondary rounded-lg p-10">
      {variant?.length !== 0 && (
        <>
          <div className="flex items-center gap-10 mb-10">
            <p className="font-semibold">Variants</p>
            <div className="grid grid-cols-4 gap-5 w-full">
              {variant?.map((item, index) => (
                <button
                  onClick={() => handleSelectVariant(item)}
                  className={`text-xs tablet:text-base py-2 px-10 rounded capitalize ${selectedVariant?.variant_name === item.variant_name ? "bg-[#76BF9B] text-white transition-all ease-in " : "bg-white"}`}
                  key={index}
                >
                  {item.variant_name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="flex items-center gap-8 w-full my-10">
        <p className="font-semibold">Quantity</p>
        <div className="bg-white flex items-center border-solid border-black border w-fit rounded-lg py-1 px-10">
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
              const newQuantity = quantity + 1;
              if (quantity < (selectedVariant?.variant_stock ?? 0)) setQuantity(quantity + 1);
            }}
          >
            <LuPlus />
          </button>
        </div>
      </div>
      <div className="my-10 w-full h-[1px] bg-white"></div>

      <div>
        <p className="font-bold">
          Total <span>{totalPrice}</span>
        </p>
      </div>
      <div className="mt-10">
        <div className="w-full h-full flex items-center justify-between gap-5">
          <button onClick={handleWishlist} className="border border-primary bg-white border-solid p-5 rounded-lg">
            {wishlist ? <FaHeart className="text-xl text-red transition-colors" /> : <FaRegHeart className="text-primary text-xl" />}
          </button>
          <div className="w-full flex items-center gap-5">
            <button
              onClick={handleBuynowBtn}
              className="border bg-white w-1/2 border-primary border-solid p-5 rounded-lg text-sm font-bold text-primary"
            >
              Buy Now
            </button>
            <button
              onClick={handleATCBtn}
              className="bg-primary p-5 w-1/2 rounded-lg text-sm font-bold text-white flex items-center gap-5 justify-center"
            >
              <Image src={ShopingBag} alt="Cart Icon" /> Add To Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
