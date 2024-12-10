import BuynowPageWrapper from "@/interfaces/components/buynowPage/BuynowPageWrapper";
import api from "@/services/api/api";
import { Product, User } from "@/types/types";
import { cookies } from "next/headers";

export default async function BuyNowPage({ searchParams }: { searchParams: Promise<{ id: number; quantity: number; variantId: number }> }) {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const { id, quantity, variantId } = await searchParams;
  const user: User | undefined = await api.getUser();
  const product: Product | undefined = await api.getProductById(Number(id));
  if (!user) throw new Error("User data not found");
  if (!product) throw new Error("Product data not found");
  return <BuynowPageWrapper user={user} quantity={Number(quantity)} product={product} deviceType={viewport} variantId={Number(variantId)} />;
}
