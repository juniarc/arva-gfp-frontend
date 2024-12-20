import WishlistPage from "@/interfaces/components/wishlistPage/WishlistPage";
import api from "@/services/api/api";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const userId = Number(cookiesList.get("userId")?.value || undefined);
  const token = cookiesList.get("token")?.value || undefined;
  const wishlistProducts = await api.getWishlist(userId);

  return <WishlistPage products={wishlistProducts} token={token} isWishlist={true} userId={userId} />;
}
