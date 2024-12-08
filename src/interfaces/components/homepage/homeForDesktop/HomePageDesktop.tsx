import { Product } from "@/types/types";
import api from "@/services/api/api";
import HomeHeroDesktop from "./HomeHeroDesktop";
import ProductListByCategoryDesktop from "./ProductListByCategoryDesktop";
import HomeAds from "../homeAds/HomeAds";
import HomeCategories from "../HomeCategories";
import HomeCategoriesDesktop from "./HomeCategoriesDesktop";
import AsideCategories from "./AsideCategories";
export default async function HomePageDesktop() {
  const popularProducts: Product[] = (await api.getAllProducts(8)) || [];
  const fruitProducts: Product[] = (await api.getAllProductsByCategory("fruit", 6)) || [];
  const vegetableProducts: Product[] = (await api.getAllProductsByCategory("vegetable", 6)) || [];
  return (
    <main className="w-full bg-white desktop:px-[120px]">
      <section className="w-full">
        <HomeHeroDesktop />
      </section>
      <div className="flex items-start justify-between gap-10">
        <div className="w-full max-w-[22%]">
          <div className=" bg-light-gray rounded-lg p-10">
            <AsideCategories />
          </div>
          <div>
            <div className="w-full h-[300px] bg-light-gray mt-10"></div>
            <div className="w-full h-[300px] bg-light-gray mt-10"></div>
          </div>
        </div>

        <div className="max-w-[78%]">
          <section className="w-full mt-0">
            <ProductListByCategoryDesktop classname="grid-cols-4" products={popularProducts} category="popular" />
          </section>
          <section className="w-full mt-10">
            <HomeAds />
          </section>
          <section className="w-full">
            <ProductListByCategoryDesktop classname="grid-cols-4" products={fruitProducts} category="fruit" />
          </section>
          <section className="w-full mt-10">
            <HomeCategoriesDesktop />
          </section>
          <section className="w-full">
            <ProductListByCategoryDesktop classname="grid-cols-4" products={vegetableProducts} category="vegetable" />
          </section>
        </div>
      </div>
    </main>
  );
}
