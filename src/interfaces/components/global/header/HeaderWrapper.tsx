import Header from "./Header";
import HeaderDesktop from "./headerDesktop/HeaderDesktop";
import { cookies } from "next/headers";

export default async function HeaderWrapper() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  if (viewport === "mobile") return <Header />;
  return <HeaderDesktop />;
}
