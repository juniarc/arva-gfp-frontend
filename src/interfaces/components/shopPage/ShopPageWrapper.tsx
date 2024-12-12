"use client";

import { ShopDevelop } from "@/services/api/dummyShop";
import ShopPage from "./ShopPage";
import { calculateAverageRatingShop } from "@/utils/elementHelpers";

interface ShopPageWrapperProps {
  shop: ShopDevelop;
}
export default function ShopPageWrapper({ shop }: ShopPageWrapperProps) {
  const { totalRating, averageRating } = calculateAverageRatingShop(shop.products);
  return <ShopPage {...shop} totalRatings={totalRating} averageRatings={averageRating} />;
}
