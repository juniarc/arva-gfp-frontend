import ProductsPageWrapper from "@/interfaces/components/productsPage/ProductsPageWrapper";
import api from "@/services/api/api";
import { cookies } from "next/headers";
export default async function Page({ params, searchParams }: { params: Record<string, string>; searchParams: Promise<{ search: string }> }) {
  const { search } = await searchParams;
  const cookieList = await cookies();
  const viewport = cookieList.get("viewport")?.value;
  const userId = cookieList.get("userId")?.value;

  // Menggunakan ternary operator untuk memilih API call
  const products = search ? await api.getProductsByName(search) : await api.getAllProducts();

  return <ProductsPageWrapper products={products || []} viewport={viewport} userId={Number(userId)} />;
}
