import LoadingSkeletonDesktop from "@/interfaces/components/productsPage/desktop/LoadingSkeletonDesktop";
import LoadingSkeleton from "@/interfaces/components/productsPage/LoadingSkeleton";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookieList = await cookies();
  const viewport = cookieList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <LoadingSkeleton />;
  return <LoadingSkeletonDesktop />;
}
