import "@/styles/homepage.css";
import React from "react";
import HomeHero from "@/interfaces/components/homepage/homeHero/HomeHero";
import HomeCategories from "@/interfaces/components/homepage/HomeCategories";
import ProductListByCategory from "@/interfaces/components/homepage/productListByCategory/ProductListByCategory";
import HomeAds from "@/interfaces/components/homepage/homeAds/HomeAds";
import api from "@/services/api/api";
import { Product } from "@/types/types";

export default async function HomePage() {
  const products = (await api.getAllProducts()) || [];
  const slicedProducts = products?.slice(0, 6);
  // const popularProducts: Product[] = (await api.getAllProducts(6)) || [];
  // const fruitProducts: Product[] = (await api.getAllProductsByCategory("fruit", 6)) || [];
  // const vegetableProducts: Product[] = (await api.getAllProductsByCategory("vegetable", 6)) || [];
  return (
    <main className="w-full bg-white desktop:px-[120px]">
      <section className="w-full">
        <HomeHero />
      </section>
      <section className="w-full tablet:pt-5">
        <HomeCategories />
      </section>
      <section className="w-full mt-6">
        <ProductListByCategory products={slicedProducts} category="popular" />
      </section>
      <section className="w-full">
        <HomeAds />
      </section>
      <section className="w-full">
        <ProductListByCategory products={slicedProducts} category="fruit" />
      </section>
      <section className="w-full">
        <ProductListByCategory products={slicedProducts} category="vegetable" />
      </section>
    </main>
  );
}
