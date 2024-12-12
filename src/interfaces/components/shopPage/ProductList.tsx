import { Product } from "@/types/types";
import ProductItem from "../productsPage/ProductItem";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {products.map((item, index) => (
        <ProductItem {...item} key={index} />
      ))}
    </div>
  );
}
