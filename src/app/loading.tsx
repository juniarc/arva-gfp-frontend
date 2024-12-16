import LoadingSkeletonDesktop from "@/interfaces/components/homepage/homeForDesktop/LoadingSkeletonDesktop";
import LoadingPageMobile from "@/interfaces/components/homepage/loadingPageMobile";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <LoadingPageMobile />;
  return <LoadingSkeletonDesktop />;
}
