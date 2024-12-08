import React, { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ShopingBag from "@/../public/icons/shopping-bag-white.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface ProductBuySectionProps {
  id: number;
  name: string;
  price: number;
  variants: string[];
  stocks: number;
  unit: string;
}

export default function ProductBuySection({ id, name, price, variants, stocks, unit }: ProductBuySectionProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<string>(variants[0]);

  const handleSelectVariant = (variant: string) => {
    setSelectedVariant(variant);
  };

  const handleWishlistBtn = () => {};
  const handleBuyNowBtn = () => {
    router.push(`/buy-now?id=${id}&quantity=${quantity}`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stocks) {
      setQuantity(newQuantity);
      setTotalPrice(price * newQuantity);
    }
  };

  return (
    <div className="w-fit bg-secondary rounded-lg p-10">
      {variants.length !== 0 && (
        <>
          <div className="flex items-center gap-10 mb-10">
            <p className="font-semibold">Variants</p>
            <div className="grid grid-cols-4 gap-5 w-full">
              {variants.map((variant, index) => (
                <button
                  onClick={() => handleSelectVariant(variant)}
                  className={`text-xs tablet:text-base py-2 px-10 rounded capitalize ${selectedVariant === variant ? "bg-[#76BF9B] text-white transition-all ease-in " : "bg-white"}`}
                  key={index}
                >
                  {variant}
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
              const newQuantity = quantity - 1;
              if (newQuantity >= 1) handleQuantityChange(newQuantity);
            }}
          >
            <LuMinus />
          </button>
          <input
            type="number"
            minLength={1}
            maxLength={stocks}
            value={quantity}
            onChange={(e) => {
              const newQuantity = Number(e.target.value);
              if (newQuantity >= 1 && newQuantity <= stocks) {
                handleQuantityChange(newQuantity);
              }
            }}
            className="w-55 text-center text-black"
            disabled
          />
          <button
            onClick={() => {
              const newQuantity = quantity + 1;
              if (newQuantity <= stocks) handleQuantityChange(newQuantity);
            }}
          >
            <LuPlus />
          </button>
        </div>
      </div>
      <div className="my-10 w-full h-[1px] bg-white"></div>

      <div>
        <p className="font-bold">
          Total <span>Rp. {totalPrice}</span>
        </p>
      </div>
      <div className="mt-10">
        <div className="w-full h-full flex items-center justify-between gap-5">
          <button onClick={handleWishlistBtn} className="border border-primary bg-white border-solid p-5 rounded-lg">
            {isWishlist ? <FaHeart className="text-xl text-red transition-colors" /> : <FaRegHeart className="text-primary text-xl" />}
          </button>
          <div className="w-full flex items-center gap-5">
            <button
              onClick={handleBuyNowBtn}
              className="border bg-white w-1/2 border-primary border-solid p-5 rounded-lg text-sm font-bold text-primary"
            >
              Buy Now
            </button>
            <button className="bg-primary p-5 w-1/2 rounded-lg text-sm font-bold text-white flex items-center gap-5 justify-center">
              <Image src={ShopingBag} alt="Cart Icon" /> Add To Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
