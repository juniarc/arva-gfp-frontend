import ShopIcon from "@/../public/icons/shopping-bag.svg";
import Image from "next/image";

export default function CartNavDesktop() {
  return (
    <button className="flex items-center justify-center gap-3 rounded-lg py-2 px-4 hover:bg-light-gray transition ease-in-out duration-300">
      <span className="w-full h-full relative">
        <Image src={ShopIcon} alt="Cart Icon" />
        <span className="absolute top-1 right-1 min-w-6 min-h-6 tablet:min-h-13 tablet:min-w-13 bg-red text-white rounded align-middle text-center text-[0.5rem] tablet:text-sm tablet:p-1">
          5
        </span>
      </span>
      <span>Cart</span>
    </button>
  );
}
