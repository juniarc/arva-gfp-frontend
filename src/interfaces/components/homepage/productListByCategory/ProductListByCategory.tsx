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
}
export default function ProductListByCategory({ products, category }: ProductListByCategoryProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mx-10 mb-8">
        <h3 className="capitalize">{category} Products</h3>
        <Link href="*" className="text-primary">
          See all
        </Link>
      </div>
      <div className="mx-10">
        <Swiper slidesPerView={"auto"} spaceBetween={20}>
          {products.map((product, index) => (
            <SwiperSlide key={index} className="w-auto pb-10">
              <ProductItem {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
