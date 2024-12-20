import React from "react";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-screen bg-primary mt-auto px-20 py-10 tablet:px-30 tablet:py-15 desktop:px-[120px] default:py-10 desktop:mt-10">
      <div className="w-full desktop:flex desktop:justify-between">
        <div className="">
          <h1 className="text-[40px] text-white">Arva</h1>
          <p className=" desktop:max-w-[350px] font-extralight text-xs text-white mt-10 leading-5 text-wrap">
            Arva is your trusted marketplace connecting farmers and consumers directly. Inspired by the Latin word for "field," Arva embodies our
            mission to bring the freshest agricultural products—from fruits and vegetables to seeds and farming equipment—straight from the source to
            your doorstep.
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-white mb-10">Categories</h3>
          <div className="grid grid-cols-2 gap-5 text-white">
            <a href="/products/seeds" className="flex items-center gap-8">
              Seeds
            </a>
            <a href="/products/vegetables" className="flex items-center gap-8">
              Vegetables
            </a>
            <a href="/products/fruits" className="flex items-center gap-8">
              Fruits
            </a>
            <a href="/products/fertilizers" className="flex items-center gap-8">
              Fertilizers
            </a>
            <a href="/products/equipments" className="flex items-center gap-8">
              Equipments
            </a>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-white mb-10">Contact Info</h3>
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-white">Office Address :</p>
              <p className="text-white font-extralight mt-3">Jl. Cinta No.43, Kahyangan, Jakarta, DKI Jakarta, Indonesia</p>
            </div>
            <div>
              <p className="text-white">Phone Number :</p>
              <p className="text-white font-extralight mt-3">+6212314124124</p>
            </div>
            <div>
              <p className="text-white">Email :</p>
              <p className="text-white font-extralight mt-3">arva@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
