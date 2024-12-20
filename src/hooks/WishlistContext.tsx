"use client";

import { Variant } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stocks: number;
  unit: string;
  discount: number;
  rating: number;
  shop: { id: number; name: string; addressCity: string };
  sold: number;
  variant: Variant[];
  tags: string[];
}

interface WishlistContextProps {
  wishlist: ProductItemProps[];
  toggleWishlist: (product: ProductItemProps) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<ProductItemProps[]>([]);
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const toggleWishlist = async (product: ProductItemProps) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    const updatedWishlist = isWishlisted ? wishlist.filter((item) => item.id !== product.id) : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // try {
    //   if (isWishlisted) {
    //     await fetch(`/api/wishlist/${product.id}`, {
    //       method: "DELETE",
    //     });
    //   } else {
    //     await fetch(`/api/wishlist`, {
    //       method: "POST",
    //       body: JSON.stringify(product),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // rollback if request fails
    // setWishlist((prev) => (isWishlisted ? [...prev, product] : prev.filter((item) => item.id !== product.id)));
  };

  return <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
