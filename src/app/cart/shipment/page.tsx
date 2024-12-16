import ShipmentPageWrapper from "@/interfaces/components/shipmentPage/ShipmentPageWrapper";
import api from "@/services/api/api";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const user = await api.getUser();
  if (!user) throw new Error("User data not found");
  return <ShipmentPageWrapper user={user} viewport={viewport} />;
}
