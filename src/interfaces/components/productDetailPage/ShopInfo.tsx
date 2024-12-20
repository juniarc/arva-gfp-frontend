import React from "react";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/interfaces/fonts/fonts";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Shop } from "@/types/types";
import uriHelpers from "@/utils/uriHelpers";

interface ShopInfoProps extends Shop {}
export default function ShopInfo({ shop_image, shop_name, shop_address_city, shop_id }: ShopInfoProps) {
  const formatedShopNameToUrl = uriHelpers.formatStringForUrl(shop_name);
  return (
    <div className="px-10 desktop:p-0 flex items-center justify-between desktop:justify-normal desktop:gap-20 tablet:px-[150px]">
      <div className="flex items-center gap-5 tablet:gap-10">
        <div className="h-[65px] tablet:h-[72px] aspect-square">
          <Image src={shop_image} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
        </div>
        <div className="h-full flex flex-col gap-2">
          <h3 className={`${poppins.className} font-bold capitalize`}>{shop_name}</h3>
          <span className="flex items-center text-xs tablet:text-base gap-2 text-dark-gray capitalize">
            <FaLocationDot /> {shop_address_city}
          </span>
          <span className="flex items-center text-xs tablet:text-base gap-2 text-dark-gray">
            <FaStar /> 3.4 (1000)
          </span>
        </div>
      </div>
      <Link href={`/${formatedShopNameToUrl}-${shop_id}`} className="bg-gray font-semibold text-xs tablet:text-base py-2 px-5 rounded">
        Visit
      </Link>
    </div>
  );
}
