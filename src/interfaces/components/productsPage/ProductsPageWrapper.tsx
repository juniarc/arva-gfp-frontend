"use client";

import { Product } from "@/types/types";
import ProductsPage from "./ProductsPage";
import { useState } from "react";

interface ProductsPageWrapperProps {
  products: Product[];
}

export default function ProductsPageWrapper({ products }: ProductsPageWrapperProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const handleFilterBtn = (filterer: string) => {
    setSelectedFilter(filterer);
  };
  const filteredProducts = displayProducts.filter((product) => product.category === selectedFilter);
  return <ProductsPage products={filteredProducts} handleFilterBtn={handleFilterBtn} />;
}
