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
    <div className="tes w-auto bg-white p-5 tablet:p-10 rounded-lg shadow-lg mx-10">
      <div className="w-full grid grid-cols-5 gap-7 items-center justify-center">
        <a href="/products/seeds" className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
          <CiCoffeeBean className="text-xl tablet:text-[2.5rem]" />
          <span className="text-[0.5rem] tablet:text-base">Seeds</span>
        </a>
        <a href="/products/vegetables" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
          <Image src={SpinachIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
          <span className="text-[0.5rem] tablet:text-base">Vegetables</span>
        </a>
        <a href="/products/fruits" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px] ">
          <Image src={FruitsIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
          <span className="text-[0.5rem] tablet:text-base">Fruits</span>
        </a>
        <a href="/products/fertilizers" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
          <Image src={FertilizersIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
          <span className="text-[0.5rem] tablet:text-base">Fertilizers</span>
        </a>
        <a href="/products/equipments" className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
          <Image src={EquipmentsIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
          <span className="text-[0.5rem] tablet:text-base">Equipments</span>
        </a>
      </div>
    </div>
  );
}
