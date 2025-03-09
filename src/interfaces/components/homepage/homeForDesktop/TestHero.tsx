import { Suspense } from "react";
import ProductListByCategoryDesktop from "./ProductListByCategoryDesktop";
import HomeAds from "../homeAds/HomeAds";
import HomeCategoriesDesktop from "./HomeCategoriesDesktop";
import { Product } from "@/types/types";
import { convertCategoryNameToId } from "@/utils/elementHelpers";
import api from "@/services/api/api";
import { cookies } from "next/headers";

export default async function TestHero() {
  const cookiesList = await cookies();

  const token = cookiesList.get("token")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || 0;
  const fruitId = convertCategoryNameToId("fruits");
  const seedId = convertCategoryNameToId("seeds");
  const eqId = convertCategoryNameToId("equipments");
  const [popularProducts, eqProducts, seedProducts] = await Promise.all([
    api.getAllProductsByCategory(fruitId),
    api.getAllProductsByCategory(eqId),
    api.getAllProductsByCategory(seedId),
  ]);
  const slicedProducts = popularProducts?.slice(0, 6);
  return (
    <>
      <section className="w-full mt-0">
        <Suspense>
          <ProductListByCategoryDesktop
            userId={Number(userId)}
            classname="grid-cols-4"
            products={slicedProducts ?? []}
            category="popular"
            token={token}
          />
        </Suspense>
      </section>
      <section className="w-full mt-10">
        <HomeAds />
      </section>
      <section className="w-full">
        <Suspense>
          <ProductListByCategoryDesktop userId={Number(userId)} classname="grid-cols-4" products={eqProducts ?? []} category="fruit" token={token} />
        </Suspense>
      </section>
      <section className="w-full mt-10">
        <HomeCategoriesDesktop />
      </section>
      <section className="w-full mt-10">
        <Suspense>
          <ProductListByCategoryDesktop userId={Number(userId)} classname="grid-cols-4" products={seedProducts ?? []} category="vegetable" />
        </Suspense>
      </section>
    </>
  );
}
