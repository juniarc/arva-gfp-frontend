import ShipmentPageWrapper from "@/interfaces/components/shipmentPage/ShipmentPageWrapper";
import api from "@/services/api/api";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;

  const userProfile = await api.getUser(Number(userId), token);

  if (!userProfile) throw new Error("User data not found");

  return <ShipmentPageWrapper user={userProfile} viewport={viewport} token={token} userId={Number(userId)} />;
}
