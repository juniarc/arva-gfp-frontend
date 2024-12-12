import { Product } from "@/types/types";
import ProductList from "./ProductList";

interface WishlistPageProps {
  products: Product[];
}

export default function WishlistPage({ products }: WishlistPageProps) {
  return (
    <main className="px-10 py-5 tablet:p-15 desktop:px-[120px] desktop:py-20">
      <h1 className="text-[1.75rem] tablet:text-[2rem] desktop:text-[2.5rem] text-primary mb-5 tablet:mb-10">Your Wishlist</h1>
      <section>
        <ProductList products={products} />
      </section>
    </main>
  );
}
