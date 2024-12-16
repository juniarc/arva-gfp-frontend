import ProductsPageWrapper from "@/interfaces/components/productsPage/ProductsPageWrapper";
import api from "@/services/api/api";
import { cookies } from "next/headers";
// import { products } from "@/services/api/dummyProducts";
export default async function Page() {
  const products = await api.getAllProducts();

  const cookieList = await cookies();
  const viewport = cookieList.get("viewport")?.value || undefined;
  const slicedProducts = products?.slice(0, 6);
  if (products) return <ProductsPageWrapper products={slicedProducts} viewport={viewport} />;
}
