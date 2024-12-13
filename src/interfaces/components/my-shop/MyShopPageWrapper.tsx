"use client";

import { ShopDevelop } from "@/services/api/dummyShop";
import MyShopPage from "./MyShopPage";
import { calculateAverageRatingShop } from "@/utils/elementHelpers";
import { useState } from "react";
import MyShopPageDesktop from "./desktop/MyShopPageDesktop";

interface MyShopPageWrapperProps {
  shop: ShopDevelop;
  viewport: string | undefined;
}
export default function MyShopPageWrapper({ shop, viewport }: MyShopPageWrapperProps) {
  const [myShop, setShopInfo] = useState(shop);
  const { totalRating, averageRating } = calculateAverageRatingShop(myShop.products);
  if (viewport === "mobile") return <MyShopPage shop={myShop} totalRatings={totalRating} averageRatings={averageRating} />;
  return <MyShopPageDesktop shop={myShop} totalRatings={totalRating} averageRatings={averageRating} />;
}
