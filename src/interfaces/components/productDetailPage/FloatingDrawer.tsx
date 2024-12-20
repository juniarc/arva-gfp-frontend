"use client";

import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import AddToCartModal from "../modals/AddToCartModal";
import BuyNowModal from "../modals/BuyNowModal";
import { Discount, Shop, Variant } from "@/types/types";
import { useWishlist, WishlistProvider } from "@/hooks/WishlistContext";
import api from "@/services/api/api";

interface FloatingRawerProps {
  product_id: number;
  product_name: string;
  image: string;
  category: string;
  variant: Variant[];
  discount: Discount[];
  ratings: string;
  tag: string[];
  shop: Shop;
  sold: number;
  shipping_cost: number;
  isWishlist: boolean;
  token: string | undefined;
  wishlistId: number;
}

export default function FloatingDrawer({
  product_id,
  product_name,
  image,
  category,
  variant,
  discount,
  ratings,
  tag,
  shop,
  sold,
  shipping_cost,
  isWishlist,
  wishlistId,
  token,
}: FloatingRawerProps) {
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState<boolean>(false);
  const [isBuyNowModalOpen, setIsBuyNowtModalOpen] = useState<boolean>(false);
  const handleCloseATCModal = () => setIsAddToCartModalOpen(false);
  const hanldeCloseBuyNowModal = () => setIsBuyNowtModalOpen(false);

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
    <>
      <div className="floating-drawer w-screen bg-white fixed bottom-0 left-0 right-0 z-20">
        <div className="w-full h-full flex items-center justify-between p-5 gap-5">
          <button onClick={handleWishlist} className="border border-primary border-solid p-5 rounded-lg">
            {wishlist ? <FaHeart className="text-xl text-red transition-colors" /> : <FaRegHeart className="text-primary text-xl" />}
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
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        handleCloseModal={handleCloseATCModal}
        {...{ product_id, product_name, category, variant, discount }}
        imageUrl={image}
      />
      <BuyNowModal
        isOpen={isBuyNowModalOpen}
        handleCloseModal={hanldeCloseBuyNowModal}
        {...{ product_id, product_name, category, variant, discount }}
        imageUrl={image}
        shop={shop}
        shipping_cost={shipping_cost}
      />
    </>
  );
}
