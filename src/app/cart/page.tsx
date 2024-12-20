import CartPageWrapper from "@/interfaces/components/cartPage/CartPageWrapper";
import api from "@/services/api/api";
import { CartItem } from "@/types/types";
import { convertCartResponseToCartItems } from "@/utils/elementHelpers";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const userId = cookiesList.get("userId")?.value || null;
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;
  return <CartPageWrapper token={token} userId={Number(userId)} viewport={viewport} />;
}
