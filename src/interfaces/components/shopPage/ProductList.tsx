import { Product } from "@/types/types";
import ProductItem from "../productsPage/ProductItem";

interface ProductListProps {
  products: Product[];
  userId: number;
}

export default function ProductList({ products, userId }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-5 tablet:grid-cols-3 desktop:grid-cols-5">
      {products.map((item, index) => (
        <ProductItem {...item} key={index} userId={userId} />
      ))}
    </div>
  );
}
