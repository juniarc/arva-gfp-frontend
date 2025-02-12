import api from "@/services/api/api";
import Header from "./Header";
import HeaderDesktop from "./headerDesktop/HeaderDesktop";
import { cookies } from "next/headers";
import HeaderContainer from "./HeaderContainer";

export default async function HeaderWrapper() {
  const cookiesList = await cookies();
  const userId = cookiesList.get("userId")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;
  let user;
  if (userId) {
    user = await api.getUser(Number(userId), token);
  }
  return <HeaderContainer token={token} userId={Number(userId)} user={user} />;
}
