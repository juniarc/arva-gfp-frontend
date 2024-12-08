import { CiShop } from "react-icons/ci";

export default function ShopNavDekstop() {
  return (
    <button className="flex items-center justify-center gap-3 rounded-lg py-2 px-4 hover:bg-light-gray transition ease-in-out duration-300">
      <CiShop className="text-2xl" />
      <span>My Shop</span>
    </button>
  );
}
