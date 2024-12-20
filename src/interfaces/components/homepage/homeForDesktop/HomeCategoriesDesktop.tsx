import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";

export default function HomeCategoriesDesktop() {
  return (
    <div>
      <h3>Browse By Categories</h3>
      <div className="w-auto flex gap-7 items-center justify-start mt-10">
        <a href="*" className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5 w-32 h-32">
          <CiCoffeeBean className="text-[2.5rem]" />
          <span>Seeds</span>
        </a>
        <a href="*" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 w-32 h-32">
          <Image src={SpinachIcon} className="w-20 h-20" alt="Spinach Icon" />
          <span>Vegetables</span>
        </a>
        <a href="*" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 w-32 h-32 ">
          <Image src={FruitsIcon} className="w-20 h-20" alt="Spinach Icon" />
          <span>Fruits</span>
        </a>
        <a href="*" className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 w-32 h-32">
          <Image src={FertilizersIcon} className="w-20 h-20" alt="Spinach Icon" />
          <span>Fertilizers</span>
        </a>
        <a href="*" className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5 w-32 h-32">
          <Image src={EquipmentsIcon} className="w-20 h-20" alt="Spinach Icon" />
          <span>Equipments</span>
        </a>
      </div>
    </div>
  );
}
