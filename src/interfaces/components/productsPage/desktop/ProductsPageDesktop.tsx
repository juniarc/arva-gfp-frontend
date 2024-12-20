"use client";

import { Product } from "@/types/types";
import ProductList from "../ProductList";
import FilterMenu from "./FilterMenu";

interface ProducstPageProps {
  products: Product[];
  handleFilterBtn: (filterer: string) => void;
  userId: number;
  token: string | undefined;
}

export default function ProductsPageDesktop({ products, handleFilterBtn, userId, token }: ProducstPageProps) {
  return (
    <main className="min-h-[90vh] px-[120px] py-20 flex items-start gap-10">
      <div className="min-w-60 w-60 flex justify-between gap-5">
        <FilterMenu handleFilterBtn={handleFilterBtn} />
      </div>
      <section className="w-full">
        <ProductList products={products} userId={userId} token={token} />
      </section>
    </main>
  );
}
