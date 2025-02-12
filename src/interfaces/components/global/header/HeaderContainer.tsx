"use client";

import { useScreenSizeContext } from "@/hooks/cart/ScreenSizeProvider";
import { User } from "@/types/types";
import Header from "./Header";
import HeaderDesktop from "./headerDesktop/HeaderDesktop";

export default function HeaderContainer({ token, userId, user }: { token: string | undefined; userId: number; user: User }) {
  const { deviceType } = useScreenSizeContext();
  if (deviceType === "mobile") return <Header userId={Number(userId)} user={user} token={token} />;
  return <HeaderDesktop userId={Number(userId)} user={user} />;
}
