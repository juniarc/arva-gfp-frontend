"use client";

import { Product } from "@/types/types";
import FilterAndSort from "./FilterAndSort";
import ProductList from "./ProductList";
import RecommendFilter from "./RecommendFilter";
import { useEffect, useState } from "react";

interface ProducstPageProps {
  products: Product[];
  handleFilterBtn: (filterer: string) => void;
}

export default function ProductsPage({ products, handleFilterBtn }: ProducstPageProps) {
  return (
    <main className="py-5 px-10 tablet:p-15 min-h-[90vh]">
      <div className="w-full flex justify-between gap-5">
        <RecommendFilter handleFilterBtn={handleFilterBtn} />
        <FilterAndSort handleFilterBtn={handleFilterBtn} />
      </div>
      <section>
        <ProductList products={products} />
      </section>
    </main>
  );
}
