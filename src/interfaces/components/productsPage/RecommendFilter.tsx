"use client";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function RecommendFilter() {
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
  };
  return (
    <div className="no-scrollbar w-full overflow-x-scroll h-15 flex items-center gap-3">
      {dummyRecommendFilter.map((item, index) => {
        if (item.addressCity) {
          return (
            <button
              onClick={() => handleSelectFilter(item.addressCity)}
              key={index}
              className={`flex items-center gap-3 text-sm h-full px-5 rounded border capitalize ${selectedFilter === item.addressCity ? "border-primary bg-secondary text-primary" : "border-gray bg-white"}`}
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
              className={`flex items-center gap-3 text-sm h-full px-5 rounded border  capitalize ${selectedFilter === item.category ? "border-primary bg-secondary text-primary" : "border-gray bg-white"}`}
            >
              <span>{item.category}</span>
            </button>
          );
        }
      })}
    </div>
  );
}
