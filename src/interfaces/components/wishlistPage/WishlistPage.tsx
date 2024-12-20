import { WishlistItem } from "@/types/types";
import ProductList from "./ProductList";
import ItemNotFound from "../error/ItemNotFound";

interface WishlistPageProps {
  products: WishlistItem[];
  token: string | undefined;
  isWishlist: boolean;
  userId: number;
}

export default function WishlistPage({ products, token, isWishlist, userId }: WishlistPageProps) {
  return (
    <main className="px-10 py-5 tablet:p-15 desktop:px-[120px] desktop:py-20">
      <h1 className="text-[1.75rem] tablet:text-[2rem] desktop:text-[2.5rem] text-primary mb-5 tablet:mb-10">Your Wishlist</h1>
      <section>
        {products.length > 0 ? (
          <ProductList products={products} token={token} isWishlist={isWishlist} userId={userId} />
        ) : (
          <div className="flex flex-col items-center gap-10">
            <ItemNotFound text="Your wishlist is empty. Let's add some products!" />
            <a href="/" className="px-20 py-3 bg-primary text-white rounded-lg font-semibold">
              Back to home
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
