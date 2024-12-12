import ShopPageWrapper from "@/interfaces/components/shopPage/ShopPageWrapper";
import { dummyShop } from "@/services/api/dummyShop";
export default async function Page({ params }: { params: Promise<{ shopName: string }> }) {
  const urlName = (await params).shopName;
  const idMatch = urlName.match(/-(\d+)$/);
  const id = idMatch ? idMatch[1] : null;
  // const shopData = await fetchShopById(id)
  if (Number(id) !== 1) {
    return <p>OOps</p>;
  }
  return <ShopPageWrapper shop={dummyShop} />;
}
