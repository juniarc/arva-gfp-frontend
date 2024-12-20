import ItemNotFound from "@/interfaces/components/error/ItemNotFound";
import ShopPageWrapper from "@/interfaces/components/shopPage/ShopPageWrapper";
import api from "@/services/api/api";
import { dummyShop } from "@/services/api/dummyShop";
import { cookies } from "next/headers";
export default async function Page({ params }: { params: Promise<{ shopName: string }> }) {
  const urlName = (await params).shopName;
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const idMatch = urlName.match(/-(\d+)$/);
  const shopId = idMatch ? idMatch[1] : null;
  const shopData = await api.getShopById(Number(shopId));
  const products = await api.getProductByShopId(Number(shopId));
  if (shopData.error) {
    return (
      <div className="min-h-[90vh] mt-10 tablet:mt-15 desktop:mt-20">
        <ItemNotFound text="Oops, Shop not found" />;
      </div>
    );
  }
  return <ShopPageWrapper shop={shopData} products={products} viewport={viewport} />;
}
