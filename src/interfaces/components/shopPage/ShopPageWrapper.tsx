"use client";

import ShopPage from "./ShopPage";
import { calculateAverageRatingShop } from "@/utils/elementHelpers";
import ShopPageDesktop from "./desktop/ShopPageDesktop";
import { Product, ShopDetail } from "@/types/types";

interface ShopPageWrapperProps {
  shop: ShopDetail;
  viewport: string | undefined;
  products: Product[];
  userId: number;
  token: string | undefined;
}
export default function ShopPageWrapper({ shop, viewport, products, userId, token }: ShopPageWrapperProps) {
  // const { totalRating, averageRating } = calculateAverageRatingShop(shop.products);
  if (viewport === "mobile") return <ShopPage {...shop} products={products} userId={userId} token={token} />;

  return <ShopPageDesktop {...shop} products={products} userId={userId} token={token} />;
}
