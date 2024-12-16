"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { LuX, LuMinus, LuPlus } from "react-icons/lu";
import { CartItem, Product } from "@/types/types";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import SuccessAlert from "../alerts/SuccessAlert";
import { Variant } from "@/types/types";
import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";
import { avaibleCategoriesWithIcon } from "@/services/fixedData";

interface FilterModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleFilterBtn: (filterer: string) => void;
}
export default function FilterModal({ isOpen, handleCloseModal, handleFilterBtn }: FilterModalProps) {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("");
  const handleSelectFilterCategory = (filterer: string) => {
    setSelectedFilterCategory(filterer);
  };
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15">
        <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
          <LuX className="tablet:text-[2rem]" />
        </button>
        <DialogBody className="text-black font-normal">
          <h3>Filter</h3>
          <div className="mt-10">
            <div>
              <p>Category</p>
              <div className="flex flex-wrap items-center gap-5 mt-5">
                {avaibleCategoriesWithIcon.map((category, index) => {
                  if (category.name !== "seeds") {
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedFilterCategory(category.name)}
                        className={`flex items-center gap-8 rounded-lg  border px-5 py-2 transition-all ease-in ${selectedFilterCategory === category.name ? "border-primary bg-secondary text-primary" : "border-gray bg-white text-black"}`}
                      >
                        <Image src={category.icon} className="w-10 h-10 tablet:w-15 tablet:h-15" alt={`${category.name} icon`} />
                        <p>{category.name}</p>
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectFilterCategory(category.name)}
                        className={`flex items-center gap-8 rounded-lg  border px-5 py-2 ${selectedFilterCategory === category.name ? "border-primary bg-secondary text-primary" : "border-gray bg-white text-black"}`}
                      >
                        <CiCoffeeBean className="text-xl tablet:text-[2rem]" />
                        <p>{category.name}</p>
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="p-0">
          <button
            onClick={() => {
              handleFilterBtn(selectedFilterCategory);
              handleCloseModal();
            }}
            className="bg-primary text-white py-2 px-10 rounded tablet:text-[1.375rem] tablet:mt-5 font-bold w-full text-center"
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>
    );
  }
}
