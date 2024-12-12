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
  // const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  // const [selectedFilter, setSelectedFilter] = useState<string>("");
  // const handleFilterBtn = (filterer: string) => {
  //   setSelectedFilter(filterer);
  // };
  // const filteredProducts = displayProducts.filter((product) => product.category === selectedFilter);
  return (
    <main className="py-5 px-10 min-h-[90vh]">
      <div className="w-full flex justify-between gap-5">
        <RecommendFilter />
        <FilterAndSort handleFilterBtn={handleFilterBtn} />
      </div>
      <section>
        <ProductList products={products} />
      </section>
    </main>
  );
}
