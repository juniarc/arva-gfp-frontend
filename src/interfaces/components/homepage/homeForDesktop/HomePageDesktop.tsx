import api from "@/services/api/api";
import HomeHeroDesktop from "./HomeHeroDesktop";
import ProductListByCategoryDesktop from "./ProductListByCategoryDesktop";
import HomeAds from "../homeAds/HomeAds";
import HomeCategoriesDesktop from "./HomeCategoriesDesktop";
import AsideCategories from "./AsideCategories";
import { convertCategoryNameToId } from "@/utils/elementHelpers";

interface HomePageProps {
  token?: string | undefined;
  userId: number;
}
export default async function HomePageDesktop({ token, userId }: HomePageProps) {
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
    <main className="w-full bg-white desktop:px-[120px]">
      <section className="w-full">
        <HomeHeroDesktop />
      </section>
      <div className="flex items-start justify-between gap-10">
        <div className="w-full max-w-[22%]">
          <div className=" bg-light-gray rounded-lg p-10">
            <AsideCategories />
          </div>
        </div>

        <div className="max-w-[78%]">
          <section className="w-full mt-0">
            <ProductListByCategoryDesktop userId={userId} classname="grid-cols-4" products={slicedProducts ?? []} category="popular" token={token} />
          </section>
          <section className="w-full mt-10">
            <HomeAds />
          </section>
          <section className="w-full">
            <ProductListByCategoryDesktop userId={userId} classname="grid-cols-4" products={eqProducts ?? []} category="fruit" token={token} />
          </section>
          <section className="w-full mt-10">
            <HomeCategoriesDesktop />
          </section>
          <section className="w-full mt-10">
            <ProductListByCategoryDesktop userId={userId} classname="grid-cols-4" products={seedProducts ?? []} category="vegetable" />
          </section>
        </div>
      </div>
    </main>
  );
}
