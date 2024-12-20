import { dummyShop } from "@/services/api/dummyShop";
import { cookies } from "next/headers";
import CreateShop from "@/interfaces/components/my-shop/CreateShop";
import MyShopPageWrapper from "@/interfaces/components/my-shop/MyShopPageWrapper";
import api from "@/services/api/api";
export default async function Page({ params }: { params: Promise<{ shopName: string }> }) {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userId = Number(cookiesList.get("userId")?.value || undefined);
  const token = cookiesList.get("token")?.value || undefined;

  try {
    const shop = await api.getShop(userId, token);
    if (shop.error) {
      return <CreateShop />;
    }
    const products = await api.getProductByShopId(shop.shop_id);
    const vouchers = await api.getVoucher(shop.shop_id);
    return <MyShopPageWrapper vouchers={vouchers} userId={userId} shop={shop} products={products} token={token} viewport={viewport} />;
  } catch (error) {
    console.log(error);
    return <div>error</div>;
  }
}
