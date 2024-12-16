import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Collapse } from "@material-tailwind/react";
import { avaibleCategoriesWithIcon } from "@/services/fixedData";
import Image from "next/image";
import { CiCoffeeBean } from "react-icons/ci";

gsap.registerPlugin(useGSAP);

interface FilterMenuProps {
  handleFilterBtn: (filterer: string) => void;
}

export default function FilterMenu({ handleFilterBtn }: FilterMenuProps) {
  const [isCategoryNavOpen, setCategoryNavOpen] = useState<boolean>(false);
  const handleCategoryNav = () => {
    setCategoryNavOpen(!isCategoryNavOpen);
    gsap.to(".category-arrow", { rotate: isCategoryNavOpen ? 0 : 180 });
  };

  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("");
  const handleSelectFilterCategory = (filterer: string) => {
    setSelectedFilterCategory(filterer);
    handleFilterBtn(filterer);
  };

  return (
    <div className="w-full">
      <p className="font-semibold mb-10">Filter By:</p>
      <div className="w-full bg-white rounded-lg shadow ">
        <button onClick={handleCategoryNav} className="w-full flex items-center justify-between p-10">
          <p className="font-semibold">Category</p>
          <FaChevronDown className="category-arrow" />
        </button>
        <Collapse open={isCategoryNavOpen} className="w-full bg-white rounded-b-lg ">
          <div className="w-full bg-white flex flex-col">
            {avaibleCategoriesWithIcon.map((category, index) => {
              if (category.name !== "seeds") {
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectFilterCategory(category.name)}
                    className={`flex items-center px-10  py-5 gap-8 w-full transition-all ease-in ${selectedFilterCategory === category.name ? "border-primary bg-secondary text-primary" : "border-gray bg-white text-black"}`}
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
                    className={`flex items-center w-full gap-8 px-10 py-5  ${selectedFilterCategory === category.name ? "border-primary bg-secondary text-primary" : "border-gray bg-white text-black"}`}
                  >
                    <CiCoffeeBean className="text-xl tablet:text-[2rem]" />
                    <p>{category.name}</p>
                  </button>
                );
              }
            })}
          </div>
        </Collapse>
      </div>
    </div>
  );
}
