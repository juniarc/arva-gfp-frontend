import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";

export default function HomeCategories() {
  return (
    <div className="tes w-auto bg-white p-5 rounded-lg shadow-lg mx-10">
      <div className="w-full grid grid-cols-5 gap-7 items-center justify-center">
        <Link href="*" className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5">
          <CiCoffeeBean className="text-xl" />
          <span className="text-[0.5rem]">Seeds</span>
        </Link>
        <Link href="*" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5">
          <Image src={SpinachIcon} className="w-10 h-10" alt="Spinach Icon" />
          <span className="text-[0.5rem]">Vegetables</span>
        </Link>
        <Link href="*" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5">
          <Image src={FruitsIcon} className="w-10 h-10" alt="Spinach Icon" />
          <span className="text-[0.5rem]">Fruits</span>
        </Link>
        <Link href="*" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5">
          <Image src={FertilizersIcon} className="w-10 h-10" alt="Spinach Icon" />
          <span className="text-[0.5rem]">Fertilizers</span>
        </Link>
        <Link href="*" className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5">
          <Image src={EquipmentsIcon} className="w-10 h-10" alt="Spinach Icon" />
          <span className="text-[0.5rem]">Equipments</span>
        </Link>
      </div>
    </div>
  );
}
