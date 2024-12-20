import ProductsPageWrapper from "@/interfaces/components/productsPage/ProductsPageWrapper";
import api from "@/services/api/api";
import { cookies } from "next/headers";
export default async function Page() {
  const products = await api.getAllProducts();

  const cookieList = await cookies();
  const viewport = cookieList.get("viewport")?.value || undefined;
  if (products) return <ProductsPageWrapper products={products} viewport={viewport} />;
}
