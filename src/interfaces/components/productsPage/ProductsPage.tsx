"use client";

import { Product } from "@/types/types";
import FilterAndSort from "./FilterAndSort";
import ProductList from "./ProductList";
import RecommendFilter from "./RecommendFilter";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface ProducstPageProps {
  products: Product[];
  handleFilterBtn: (filterer: string) => void;
  categoryName: string | undefined;
}

export default function ProductsPage({ products, handleFilterBtn, categoryName }: ProducstPageProps) {
  const pathname = usePathname();
  return (
    <main className="py-5 px-10 tablet:p-15 min-h-[90vh]">
      {pathname === "/products" ? (
        <div className="w-full flex justify-between gap-5">
          <RecommendFilter handleFilterBtn={handleFilterBtn} />
          <FilterAndSort handleFilterBtn={handleFilterBtn} />
        </div>
      ) : (
        <div className="w-full flex justify-between items-center gap-5">
          <h2 className="capitalize text-xl tablet:text-[1.75rem]">{categoryName} Products</h2>
          <FilterAndSort handleFilterBtn={handleFilterBtn} />
        </div>
      )}
      <section>
        <ProductList products={products} />
      </section>
    </main>
  );
}
