"use client";

import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import AddToCartModal from "../modals/AddToCartModal";
import BuyNowModal from "../modals/BuyNowModal";
import { Variants } from "@/types/types";
import { useWishlist, WishlistProvider } from "@/hooks/WishlistContext";

interface FloatingRawerProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  variants: Variants[];
  stocks: number;
  unit: string;
  discount: number;
  rating: number;
  tags: string[];
  shop: { id: number; name: string; addressCity: string };
  sold: number;
}

export default function FloatingDrawer({
  id,
  name,
  price,
  imageUrl,
  category,
  variants,
  stocks,
  unit,
  discount,
  rating,
  tags,
  shop,
  sold,
}: FloatingRawerProps) {
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState<boolean>(false);
  const [isBuyNowModalOpen, setIsBuyNowtModalOpen] = useState<boolean>(false);
  const { wishlist, toggleWishlist } = useWishlist();
  const handleCloseATCModal = () => setIsAddToCartModalOpen(false);
  const hanldeCloseBuyNowModal = () => setIsBuyNowtModalOpen(false);
  const isWishlsted = (id: number): boolean => {
    return wishlist.some((item) => item.id === id);
  };
  return (
    <>
      <div className="floating-drawer w-screen bg-white fixed bottom-0 left-0 right-0 z-20">
        <div className="w-full h-full flex items-center justify-between p-5 gap-5">
          <button
            onClick={() => toggleWishlist({ id, name, price, imageUrl, category, variants, stocks, unit, discount, rating, tags, shop, sold })}
            className="border border-primary border-solid p-5 rounded-lg"
          >
            {isWishlsted(id) ? <FaHeart className="text-xl text-red transition-colors" /> : <FaRegHeart className="text-primary text-xl" />}
          </button>
          <div className="w-full flex items-center gap-5">
            <button
              onClick={() => setIsBuyNowtModalOpen(true)}
              className="border w-1/2 border-primary border-solid p-5 rounded-lg text-sm font-bold text-primary"
            >
              Buy Now
            </button>
            <button
              onClick={() => setIsAddToCartModalOpen(true)}
              className="bg-primary p-5 w-1/2 rounded-lg text-sm font-bold text-white flex items-center gap-5 justify-center"
            >
              <MdOutlineShoppingBag className="text-base" /> Add To Chart
            </button>
          </div>
        </div>
      </div>
      {/* <AddToCartModal
        isOpen={isAddToCartModalOpen}
        handleCloseModal={handleCloseATCModal}
        {...{ id, name, price, imageUrl, category, variants, stocks, unit, discount }}
      /> */}
      <BuyNowModal
        isOpen={isBuyNowModalOpen}
        handleCloseModal={hanldeCloseBuyNowModal}
        {...{ id, name, price, imageUrl, category, variants, stocks, unit, discount }}
      />
    </>
  );
}
