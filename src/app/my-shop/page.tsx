import { dummyShop } from "@/services/api/dummyShop";
import { cookies } from "next/headers";
import CreateShop from "@/interfaces/components/my-shop/CreateShop";
import MyShopPageWrapper from "@/interfaces/components/my-shop/MyShopPageWrapper";
export default async function Page({ params }: { params: Promise<{ shopName: string }> }) {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const shop = {
    id: 1,
  };
  if (!shop.id) return <CreateShop />;
  return <MyShopPageWrapper shop={dummyShop} viewport={viewport} />;
}
