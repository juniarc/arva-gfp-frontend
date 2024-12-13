import { poppins } from "@/interfaces/fonts/fonts";
import { ShopDevelop } from "@/services/api/dummyShop";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import ShopInfo from "./ShopInfo";
import ProductList from "./ProductList";

interface ShopPageProps {
  shop: ShopDevelop;
  totalRatings: number;
  averageRatings: number;
}
export default function MyShopPage({ shop, totalRatings, averageRatings }: ShopPageProps) {
  return (
    <main className="min-h-[90vh] p-10 tablet:p-15 desktop:px-[120px] desktop:pt-20">
      <section>
        <ShopInfo {...shop} totalRatings={totalRatings} averageRatings={averageRatings} />
      </section>
      <section className="mt-10">
        <ProductList products={shop.products} />
      </section>
    </main>
  );
}
