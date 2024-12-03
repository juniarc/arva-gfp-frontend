import React from "react";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/interfaces/fonts/fonts";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

interface ShopInfoProps {
  name: string;
  imageUrl: string;
  location: string;
}
export default function ShopInfo({ name, imageUrl, location }: ShopInfoProps) {
  return (
    <div className="px-10 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="h-[65px] aspect-square">
          <Image src={imageUrl} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
        </div>
        <div className="h-full flex flex-col gap-2">
          <h3 className={`${poppins.className} font-bold`}>{name}</h3>
          <span className="flex items-center text-xs gap-2 text-dark-gray">
            <FaLocationDot /> {location}
          </span>
          <span className="flex items-center text-xs gap-2 text-dark-gray">
            <FaStar /> 3.4 (1000)
          </span>
        </div>
      </div>
      <Link href="*" className="bg-gray font-semibold text-xs py-2 px-5 rounded">
        Visit
      </Link>
    </div>
  );
}