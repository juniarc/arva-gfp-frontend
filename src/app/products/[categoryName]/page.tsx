import ProductsPageWrapper from "@/interfaces/components/productsPage/ProductsPageWrapper";
import api from "@/services/api/api";
import { convertCategoryNameToId } from "@/utils/elementHelpers";
import { cookies } from "next/headers";
// import { products } from "@/services/api/dummyProducts";
export default async function Page({ params }: { params: Promise<{ categoryName: string }> }) {
  const categoryName = (await params).categoryName;
  const categoryId = convertCategoryNameToId(categoryName);
  const products = await api.getAllProductsByCategory(categoryId);

  const cookieList = await cookies();
  const viewport = cookieList.get("viewport")?.value || undefined;
  //   const slicedProducts = products?.slice(0, 6);
  if (products) return <ProductsPageWrapper products={products} viewport={viewport} categoryName={categoryName} />;
}
