import OrderHistoryPageWrapper from "@/interfaces/components/orderHistoryPage/OrderPageWrapper";
import api from "@/services/api/api";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || undefined;

  const orderList = await api.getOrderList(Number(userId));

  return <OrderHistoryPageWrapper />;
}
