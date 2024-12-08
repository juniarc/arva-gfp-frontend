"use client";

import "swiper/css";
import { Product } from "@/types/types";
import Link from "next/link";
import React from "react";
import ProductItem from "../productListByCategory/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductListByCategoryProps {
  products: Product[];
  category: string;
  classname: string;
}
export default function ProductListByCategoryDesktop({ products, category, classname }: ProductListByCategoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="capitalize">{category} Products</h3>
        <Link href="*" className="text-primary">
          See all
        </Link>
      </div>
      <div>
        <div className={`${classname} grid gap-5`}>
          {products.map((product, index) => (
            <ProductItem {...product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
