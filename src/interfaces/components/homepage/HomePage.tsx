import "@/styles/homepage.css";
import React from "react";
import HomeHero from "@/interfaces/components/homepage/homeHero/HomeHero";
import HomeCategories from "@/interfaces/components/homepage/HomeCategories";
import ProductListByCategory from "@/interfaces/components/homepage/productListByCategory/ProductListByCategory";
import HomeAds from "@/interfaces/components/homepage/homeAds/HomeAds";
import api from "@/services/api/api";
import { convertCategoryNameToId } from "@/utils/elementHelpers";

interface HomePageProps {
  token?: string | undefined;
  userId: number;
}

export default async function HomePage({ token, userId }: HomePageProps) {
  const fruitId = convertCategoryNameToId("fruits");
  const seedId = convertCategoryNameToId("seeds");
  const vegetableId = convertCategoryNameToId("vegetables");
  const [popularProducts, fruitProducts, seedProducts] = await Promise.all([
    api.getAllProducts(6),
    api.getAllProductsByCategory(fruitId),
    api.getAllProductsByCategory(seedId),
  ]);
  const slicedProducts = popularProducts?.slice(0, 6);

  return (
    <main className="w-full bg-white desktop:px-[120px]">
      <section className="w-full">
        <HomeHero />
      </section>
      <section className="w-full tablet:pt-5">
        <HomeCategories />
      </section>
      <section className="w-full mt-6">
        <ProductListByCategory userId={userId} products={slicedProducts ?? []} category="popular" token={token} />
      </section>
      <section className="w-full">
        <HomeAds />
      </section>
      <section className="w-full">
        <ProductListByCategory userId={userId} products={fruitProducts ?? []} category="fruit" token={token} />
      </section>
      <section className="w-full">
        <ProductListByCategory userId={userId} products={seedProducts ?? []} category="vegetable" token={token} />
      </section>
    </main>
  );
}
