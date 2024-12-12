"use client";

import { ShopDevelop } from "@/services/api/dummyShop";
import ShopPage from "./ShopPage";
import { calculateAverageRatingShop } from "@/utils/elementHelpers";
import ShopPageDesktop from "./desktop/ShopPageDesktop";

interface ShopPageWrapperProps {
  shop: ShopDevelop;
  viewport: string | undefined;
}
export default function ShopPageWrapper({ shop, viewport }: ShopPageWrapperProps) {
  const { totalRating, averageRating } = calculateAverageRatingShop(shop.products);
  if (viewport === "mobile") return <ShopPage {...shop} totalRatings={totalRating} averageRatings={averageRating} />;

  return <ShopPageDesktop {...shop} totalRatings={totalRating} averageRatings={averageRating} />;
}
