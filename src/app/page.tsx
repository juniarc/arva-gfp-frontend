import HomePageDesktop from "@/interfaces/components/homepage/homeForDesktop/HomePageDesktop";
import HomePage from "@/interfaces/components/homepage/HomePage";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <HomePage />;
  return <HomePageDesktop />;
}
