"use client";

import { Product } from "@/types/types";
import FilterAndSort from "../FilterAndSort";
import ProductList from "../ProductList";
import RecommendFilter from "../RecommendFilter";
import { useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";

interface ProducstPageProps {
  products: Product[];
  handleFilterBtn: (filterer: string) => void;
}

export default function ProductsPageDesktop({ products, handleFilterBtn }: ProducstPageProps) {
  return (
    <main className="min-h-[90vh] px-[120px] py-20 flex items-start gap-10">
      <div className="min-w-60 w-60 flex justify-between gap-5">
        <FilterMenu handleFilterBtn={handleFilterBtn} />
      </div>
      <section className="w-full">
        <ProductList products={products} />
      </section>
    </main>
  );
}
