import ProductsPageWrapper from "@/interfaces/components/productsPage/ProductsPageWrapper";
import { products } from "@/services/api/dummyProducts";
export default async function Page() {
  return <ProductsPageWrapper products={products} />;
}
