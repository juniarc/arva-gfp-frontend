"use client";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface RecommendFilterProps {
  handleFilterBtn: (filterer: string) => void;
}
export default function RecommendFilter({ handleFilterBtn }: RecommendFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>("");
  const dummyRecommendFilter = [
    {
      addressCity: "bandung",
    },
    {
      category: "fruit",
    },
    {
      category: "vegetable",
    },
    {
      category: "bandung",
    },
  ];

  const handleSelectFilter = (name: string) => {
    setSelectedFilter(name);
    handleFilterBtn(name);
  };
  return (
    <div className="no-scrollbar w-full overflow-x-scroll h-15 tablet:h-30 flex items-center gap-3">
      {dummyRecommendFilter.map((item, index) => {
        if (item.addressCity) {
          return (
            <button
              onClick={() => handleSelectFilter(item.addressCity)}
              key={index}
              className={`flex items-center gap-3 text-sm tablet:text-[0.975rem] h-full px-5 tablet:px-10 rounded tablet:rounded-lg border capitalize ${selectedFilter === item.addressCity ? "border-primary bg-secondary text-primary" : "border-gray bg-white"}`}
            >
              <FaLocationDot />
              <span>{item.addressCity}</span>
            </button>
          );
        } else {
          return (
            <button
              onClick={() => handleSelectFilter(item?.category ?? "")}
              key={index}
              className={`flex items-center gap-3 text-sm tablet:text-[0.975rem] h-full px-5 tablet:px-10 rounded tablet:rounded-lg border  capitalize ${selectedFilter === item.category ? "border-primary bg-secondary text-primary" : "border-gray bg-white"}`}
            >
              <span>{item.category}</span>
            </button>
          );
        }
      })}
    </div>
  );
}
