"use client";

import "swiper/css";
import { Product } from "@/types/types";
import Link from "next/link";
import React from "react";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductListByCategoryProps {
  products: Product[];
  category: string;
  token?: string | undefined;
  userId: number;
}
export default function ProductListByCategory({ products, category, token, userId }: ProductListByCategoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mx-10 mb-8">
        <h3 className="capitalize">{category} Products</h3>
        <a href={`${category === "popular" ? "/products" : `/products/${category}s`}`} className="text-primary">
          See all
        </a>
      </div>
      <div className="mx-10">
        <Swiper slidesPerView={"auto"}>
          {products.map((product, index) => (
            <SwiperSlide key={index} className="w-auto pb-10">
              <ProductItem {...product} token={token} userId={userId} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
