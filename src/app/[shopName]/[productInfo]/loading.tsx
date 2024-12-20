import LoadingSkeletonDesktop from "@/interfaces/components/productDetailPage/desktop/LoadingSkeletonDesktop";
import LoadingSkeleton from "@/interfaces/components/productDetailPage/LoadingSkeleton";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <LoadingSkeleton />;
  return <LoadingSkeletonDesktop />;
}
