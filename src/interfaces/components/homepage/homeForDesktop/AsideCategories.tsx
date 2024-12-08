import React from "react";
import LineDivider from "../../dividers/LineDivider";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";
import MedalIcon from "@/../public/icons/bedge.svg";
import { FiPercent } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function AsideCategories() {
  return (
    <div>
      <h3 className="mb-10">Categories</h3>
      <div className="h-[1px] w-1/3 bg-[#76BF9B]"></div>
      <div className="flex flex-col gap-8 items-start mt-10">
        <Link href="*" className="flex items-center gap-8">
          <CiCoffeeBean className="text-3xl" />
          <p className="hover:text-primary transition-colors">Seeds</p>
        </Link>
        <Link href="*" className="flex items-center gap-8 hover:text-primary transition-colors">
          <Image src={SpinachIcon} className="w-15 h-15" alt="Spinach Icon" />
          <p>Vegetables</p>
        </Link>
        <Link href="*" className="flex items-center gap-8 hover:text-primary transition-colors">
          <Image src={FruitsIcon} className="w-15 h-15" alt="Spinach Icon" />
          <p>Fruits</p>
        </Link>
        <Link href="*" className="flex items-center gap-8 hover:text-primary transition-colors">
          <Image src={FertilizersIcon} className="w-15 h-15" alt="Spinach Icon" />
          <p>Fertilizers</p>
        </Link>
        <Link href="*" className="flex items-center gap-8 hover:text-primary transition-colors">
          <Image src={EquipmentsIcon} className="w-15 h-15" alt="Spinach Icon" />
          <p>Equipments</p>
        </Link>
        <div className="h-[1px] w-1/3 bg-[#76BF9B]"></div>
        <Link href="*" className="flex items-center gap-8 hover:text-primary transition-colors">
          <Image src={MedalIcon} className="w-15 h-15" alt="Spinach Icon" />
          <p>Most Popular</p>
        </Link>
        <Link href="*" className="flex items-center gap-8">
          <FiPercent className="text-3xl" />
          <p className="hover:text-primary transition-colors">Discount</p>
        </Link>
      </div>
    </div>
  );
}
