import BuynowPageWrapper from "@/interfaces/components/buynowPage/BuynowPageWrapper";
import api from "@/services/api/api";
import { Product, User } from "@/types/types";
import { cookies } from "next/headers";

export default async function BuyNowPage() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;

  const userProfile = await api.getUser(Number(userId), token);

  if (!userProfile) throw new Error("User data not found");

  return <BuynowPageWrapper user={userProfile} token={token} viewport={viewport} userId={Number(userId)} />;
}
