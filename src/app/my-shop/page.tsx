import CreateShop from "@/interfaces/components/my-shop/CreateShop";
import api from "@/services/api/api";
import { Shop } from "@/types/types";

export default async function MyShop() {
  //   const shop = await api.getShop();
  const shop = {
    id: "",
  };
  return <main className="min-h-svh">{shop?.id ? <p>Your Shop</p> : <CreateShop />}</main>;
}
