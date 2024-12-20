import api from "@/services/api/api";
import Header from "./Header";
import HeaderDesktop from "./headerDesktop/HeaderDesktop";
import { cookies } from "next/headers";

export default async function HeaderWrapper() {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;
  let user;
  if (userId) {
    user = await api.getUser(Number(userId), token);
  }
  if (viewport === "mobile") return <Header userId={Number(userId)} user={user} token={token} />;
  return <HeaderDesktop userId={Number(userId)} user={user} />;
}
