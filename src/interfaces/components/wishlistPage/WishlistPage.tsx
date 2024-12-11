import { Product } from "@/types/types";
import ProductList from "./ProductList";

interface WishlistPageProps {
  products: Product[];
}

export default function WishlistPage({ products }: WishlistPageProps) {
  return (
    <main className="px-10 py-5">
      <h1 className="text-[1.75rem] text-primary mb-5">Your Wishlist</h1>
      <section>
        <ProductList products={products} />
      </section>
    </main>
  );
}
