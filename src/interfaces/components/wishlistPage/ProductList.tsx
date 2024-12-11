import { Product } from "@/types/types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} />
      ))}
    </div>
  );
}
