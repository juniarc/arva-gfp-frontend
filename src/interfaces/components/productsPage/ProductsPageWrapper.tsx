import { Product } from "@/types/types";
import ProductsPage from "./ProductsPage";

interface ProductsPageWrapperProps {
  products: Product[];
}

export default function ProductsPageWrapper({ products }: ProductsPageWrapperProps) {
  return <ProductsPage products={products} />;
}
