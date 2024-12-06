import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

interface SearchDrawerProps {
  ref: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
}

export default function SearchDrawer({ ref, isOpen }: SearchDrawerProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <div className={`absolute left-0 right-0 top-24 tablet:top-[120px] overflow-hidden border-t border-t-white ${isOpen ? "block" : "hidden"}`}>
      <div ref={ref} className="w-screen h-28 tablet:h-[114px] px-10 py-4 tablet:py-10 bg-primary">
        <div className="w-full h-full bg-white rounded flex items-center justify-between gap-6 py-4 px-5">
          <input
            type="text"
            placeholder="Search Arva"
            className="w-full h-full text-dark-gray text-sm tablet:text-[0.975rem] focus:outline-none"
            value={inputValue}
            onChange={onInputChange}
          />
          <Link href="/" className="w-15 tablet:h-30 tablet:w-30 h-full bg-primary rounded text-white flex items-center justify-center">
            <LuSearch className="tablet:text-[2rem]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
