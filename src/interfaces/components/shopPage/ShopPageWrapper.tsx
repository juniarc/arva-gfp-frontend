"use client";

import ShopPage from "./ShopPage";
import { calculateAverageRatingShop } from "@/utils/elementHelpers";
import ShopPageDesktop from "./desktop/ShopPageDesktop";
import { Product, ShopDetail } from "@/types/types";

interface ShopPageWrapperProps {
  shop: ShopDetail;
  viewport: string | undefined;
  products: Product[];
}
export default function ShopPageWrapper({ shop, viewport, products }: ShopPageWrapperProps) {
  // const { totalRating, averageRating } = calculateAverageRatingShop(shop.products);
  if (viewport === "mobile") return <ShopPage {...shop} products={products} totalRatings={10} averageRatings={5} />;

  return <ShopPageDesktop {...shop} products={products} totalRatings={10} averageRatings={5} />;
}
