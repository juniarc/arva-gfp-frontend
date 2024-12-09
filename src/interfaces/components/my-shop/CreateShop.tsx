import { poppins } from "@/interfaces/fonts/fonts";
import Image from "next/image";
import ShopImage from "@/../public/images/24493070_6962884.jpg";
import Link from "next/link";

export default function CreateShop() {
  return (
    <div className="flex flex-col items-center gap-10 px-10 pt-20">
      <h1 className={`${poppins.className} text-base font-bold`}>Let's Open Your Shop</h1>
      <p className="text-center">
        Let’s open your shop and share your fresh, high-quality agriculture products with customers who value healthy and sustainable living!
      </p>
      <Link href="/my-shop/create-shop" className="bg-primary w-full font-semibold text-white text-center py-5 px-20 rounded-lg text-sm">
        Create Shop
      </Link>
      <div className="w-full max-w-full">
        <Image src={ShopImage} width={300} height={300} className="w-full h-full object-cover object-center" alt="Shop Image" />
      </div>
    </div>
  );
}
