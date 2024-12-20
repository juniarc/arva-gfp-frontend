import React from "react";
import LineDivider from "../../dividers/LineDivider";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";
import { CiShop } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

interface MenuDrawerContentProps {
  isLogin: boolean;
}
export default function MenuDrawerContent({ isLogin }: MenuDrawerContentProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full py-5 tablet:py-10 px-10">
      <div className="h-full ">
        <h3 className="tablet:text-[1.375rem]">Categories</h3>
        <LineDivider className="my-10 tablet:mt-5 " />
        <div className="flex flex-col gap-8 items-start">
          <a href="/products/seeds" className="flex items-center gap-8">
            <CiCoffeeBean className="text-xl tablet:text-[2rem]" />
            <p>Seeds</p>
          </a>
          <a href="/products/vegetables" className="flex items-center gap-8">
            <Image src={SpinachIcon} className="w-10 h-10 tablet:w-15 tablet:h-15" alt="Spinach Icon" />
            <p>Vegetables</p>
          </a>
          <a href="/products/fruits" className="flex items-center gap-8">
            <Image src={FruitsIcon} className="w-10 h-10 tablet:w-15 tablet:h-15" alt="Spinach Icon" />
            <p>Fruits</p>
          </a>
          <a href="/products/fertilizers" className="flex items-center gap-8">
            <Image src={FertilizersIcon} className="w-10 h-10 tablet:w-15 tablet:h-15" alt="Spinach Icon" />
            <p>Fertilizers</p>
          </a>
          <a href="/products/equipments" className="flex items-center gap-8">
            <Image src={EquipmentsIcon} className="w-10 h-10 tablet:w-15 tablet:h-15" alt="Spinach Icon" />
            <p>Equipments</p>
          </a>
          <LineDivider />
          <a href="/my-shop" className="flex items-center gap-8">
            <CiShop className="text-xl tablet:text-[2rem]" />
            <p>My Shop</p>
          </a>
          <LineDivider />
          {!isLogin && (
            <>
              <a href="/login" className="flex items-center gap-8">
                <LuUser2 className="text-xl tablet:text-[2rem]" />
                <p>Sign In</p>
              </a>
              <LineDivider className="my-10" />
            </>
          )}
          {isLogin && (
            <button onClick={handleLogout} className="flex items-center gap-8 mt-auto text-red">
              <AiOutlineLogout className="text-xl tablet:text-[2rem]" />
              <p>Log Out</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
