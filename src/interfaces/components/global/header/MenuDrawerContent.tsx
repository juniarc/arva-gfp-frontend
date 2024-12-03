import React from "react";
import LineDivider from "../../dividers/LineDivider";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";
import { CiShop } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
export default function MenuDrawerContent() {
  return (
    <div className="w-full py-5 px-10">
      <div>
        <h3>Categories</h3>
        <LineDivider className="my-10" />
        <div className="flex flex-col gap-8 items-start">
          <Link href="*" className="flex items-center gap-8">
            <CiCoffeeBean className="text-xl" />
            <span>Seeds</span>
          </Link>
          <Link href="*" className="flex items-center gap-8">
            <Image src={SpinachIcon} className="w-10 h-10" alt="Spinach Icon" />
            <span>Vegetables</span>
          </Link>
          <Link href="*" className="flex items-center gap-8">
            <Image src={FruitsIcon} className="w-10 h-10" alt="Spinach Icon" />
            <span>Fruits</span>
          </Link>
          <Link href="*" className="flex items-center gap-8">
            <Image src={FertilizersIcon} className="w-10 h-10" alt="Spinach Icon" />
            <span>Fertilizers</span>
          </Link>
          <Link href="*" className="flex items-center gap-8">
            <Image src={EquipmentsIcon} className="w-10 h-10" alt="Spinach Icon" />
            <span>Equipments</span>
          </Link>
        </div>
        <LineDivider className="my-10" />
        <Link href="*" className="flex items-center gap-8">
          <CiShop className="text-xl" />
          <span>My Shop</span>
        </Link>
        <LineDivider className="my-10" />
        <Link href="*" className="flex items-center gap-8">
          <LuUser2 className="text-xl" />
          <span>Sign In</span>
        </Link>
        <LineDivider className="my-10" />
      </div>
    </div>
  );
}