import LoadingSkeleton from "@/interfaces/components/my-shop/LoadingSkeleton";
import LoadingSkeletonDesktop from "@/interfaces/components/shopPage/desktop/LoadingSkeletonDesktop";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookieList = await cookies();
  const viewport = cookieList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <LoadingSkeleton />;
  return <LoadingSkeletonDesktop />;
}
