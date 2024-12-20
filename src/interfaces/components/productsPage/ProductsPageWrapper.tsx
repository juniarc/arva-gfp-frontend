"use client";

import { Product } from "@/types/types";
import ProductsPage from "./ProductsPage";
import { useState } from "react";
import ProductsPageDesktop from "./desktop/ProductsPageDesktop";

interface ProductsPageWrapperProps {
  products: Product[];
  viewport: string | undefined;
  categoryName?: string | undefined;
  userId: number;
  token: string | undefined;
}

export default function ProductsPageWrapper({ products, viewport, categoryName, userId, token }: ProductsPageWrapperProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const handleFilterBtn = (filterer: string) => {
    setSelectedFilter(filterer);
  };
  const filteredProducts = selectedFilter === "" ? displayProducts : displayProducts.filter((product) => product.category === selectedFilter);
  if (viewport === "mobile")
    return <ProductsPage products={filteredProducts} handleFilterBtn={handleFilterBtn} categoryName={categoryName} userId={userId} token={token} />;
  return <ProductsPageDesktop products={filteredProducts} handleFilterBtn={handleFilterBtn} userId={userId} token={token} />;
}
