import CreateShopPage from "@/interfaces/components/createShopPage/CreateShopPage";
import { redirect } from "next/navigation";

export default function CreateShop() {
  const shop = {
    id: "",
  };
  if (shop?.id) {
    redirect(`/my-shop`);
  }

  return (
    <main className="min-h-full">
      <CreateShopPage />
    </main>
  );
}
