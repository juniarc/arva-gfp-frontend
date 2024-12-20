import CartPageWrapper from "@/interfaces/components/cartPage/CartPageWrapper";
import api from "@/services/api/api";
import { CartItem } from "@/types/types";
import { convertCartResponseToCartItems } from "@/utils/elementHelpers";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const userId = cookiesList.get("userId")?.value || null;
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const cartResponse = await api.getCart(Number(userId));
  const processedCart = await convertCartResponseToCartItems(cartResponse);
  const userCart = processedCart.filter((item) => item.user_id === Number(userId));
  const separatedByShop = userCart.reduce(
    (acc, item) => {
      const { shop_id } = item.shop;
      if (!acc[shop_id]) {
        acc[shop_id] = {
          shop_name: item.shop.shop_name,
          products: [],
        };
      }
      acc[shop_id].products.push(item);
      return acc;
    },
    {} as Record<number, { shop_name: string; products: CartItem[] }>,
  );
  return <CartPageWrapper separatedByShop={separatedByShop} cart={userCart} viewport={viewport} />;
}
