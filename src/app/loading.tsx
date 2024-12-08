import LoadingPageMobile from "@/interfaces/components/loadingSkeleton/loadingPageMobile";
import { cookies } from "next/headers";

export default async function Loading() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <LoadingPageMobile />;
  return <p>loading for dekstop</p>;
}
