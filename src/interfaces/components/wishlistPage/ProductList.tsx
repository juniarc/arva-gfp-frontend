import { WishlistItem } from "@/types/types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: WishlistItem[];
  token: string | undefined;
  isWishlist: boolean;
  userId: number;
}

export default function ProductList({ products, isWishlist, token, userId }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-5 tablet:grid-cols-3 desktop:grid-cols-5">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} isWishlist={isWishlist} token={token} userId={userId} />
      ))}
    </div>
  );
}
