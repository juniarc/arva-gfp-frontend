import LoadingSkeleton from "@/interfaces/components/orderHistoryPage/LoadingSkeleton";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;

  return <LoadingSkeleton />;
}
