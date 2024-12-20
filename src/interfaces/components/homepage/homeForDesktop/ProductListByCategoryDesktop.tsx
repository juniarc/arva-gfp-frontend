"use client";

import "swiper/css";
import { Product } from "@/types/types";
import Link from "next/link";
import React from "react";
import ProductItem from "../productListByCategory/ProductItem";

interface ProductListByCategoryProps {
  products: Product[];
  category: string;
  classname: string;
  token?: string | undefined;
}
export default function ProductListByCategoryDesktop({ products, category, classname, token }: ProductListByCategoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="capitalize">{category} Products</h3>
        <Link href={`/products/${category}s`} className="text-primary">
          See all
        </Link>
      </div>
      <div>
        <div className={`${classname} grid gap-5`}>
          {products.map((product, index) => (
            <ProductItem {...product} key={index} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}
