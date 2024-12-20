import LoadingSkeletonDesktop from "@/interfaces/components/productsPage/desktop/LoadingSkeletonDesktop";
import LoadingSkeleton from "@/interfaces/components/productsPage/LoadingSkeleton";
import { cookies } from "next/headers";

export default async function Loading() {
  return <LoadingSkeleton />;
}
