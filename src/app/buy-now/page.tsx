import BuynowPageChild from "@/interfaces/components/buynowPage/BuynowPageChild";
import api from "@/services/api/api";
import { Product, User } from "@/types/types";

export default async function BuyNowPage({ searchParams }: { searchParams: Promise<{ id: number; quantity: number }> }) {
  const { id, quantity } = await searchParams;
  const user: User | undefined = await api.getUser();
  const product: Product | undefined = await api.getProductById(Number(id));
  if (!user) throw new Error("User data not found");
  if (!product) throw new Error("Product data not found");
  return (
    <main className="px-10 pt-5 tablet:p-15 ">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Checkout</h1>
      <BuynowPageChild user={user} quantity={Number(quantity)} product={product} />
    </main>
  );
}
