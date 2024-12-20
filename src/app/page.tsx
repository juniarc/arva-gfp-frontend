import HomePageDesktop from "@/interfaces/components/homepage/homeForDesktop/HomePageDesktop";
import HomePage from "@/interfaces/components/homepage/HomePage";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || 0;
  if (viewport === "mobile") return <HomePage token={token} userId={Number(userId)} />;
  return <HomePageDesktop token={token} userId={Number(userId)} />;
}
