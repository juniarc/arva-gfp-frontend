import LoadingSkeletonDesktop from "@/interfaces/components/cartPage/desktop/LoadingSkeletonDesktop";
import LoadingSkeleton from "@/interfaces/components/cartPage/LoadingSkeleton";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <LoadingSkeleton />;
  return <LoadingSkeletonDesktop />;
}
