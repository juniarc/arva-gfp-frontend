import WishlistPage from "@/interfaces/components/wishlistPage/WishlistPage";
import { products } from "@/services/api/dummyData";

const wishlistProducts = products;

export default async function Page() {
  return <WishlistPage products={wishlistProducts} />;
}
