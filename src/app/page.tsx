import "@/styles/homepage.css";
import React from "react";
import HomeHero from "@/interfaces/components/homepage/homeHero/HomeHero";
import HomeCategories from "@/interfaces/components/homepage/HomeCategories";
import ProductListByCategory from "@/interfaces/components/homepage/productListByCategory/ProductListByCategory";
import HomeAds from "@/interfaces/components/homepage/homeAds/HomeAds";
import api from "@/services/api/api";
import { Product } from "@/types/types";

export default async function Page() {
  const popularProducts: Product[] = (await api.getAllProducts(6)) || [];
  const fruitProducts: Product[] = (await api.getAllProductsByCategory("fruit", 6)) || [];
  const vegetableProducts: Product[] = (await api.getAllProductsByCategory("vegetable", 6)) || [];

  return (
    <main className="w-full bg-white">
      <section className="w-full">
        <HomeHero />
      </section>
      <section className="w-full">
        <HomeCategories />
      </section>
      <section className="w-full mt-6">
        <ProductListByCategory products={popularProducts} category="popular" />
      </section>
      <section className="w-full">
        <HomeAds />
      </section>
      <section className="w-full">
        <ProductListByCategory products={fruitProducts} category="fruit" />
      </section>
      <section className="w-full">
        <ProductListByCategory products={vegetableProducts} category="vegetable" />
      </section>
    </main>
  );
}
