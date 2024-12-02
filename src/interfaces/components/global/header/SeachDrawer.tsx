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
    <div className={`absolute left-0 right-0 top-24 overflow-hidden ${isOpen ? "block" : "hidden"}`}>
      <div ref={ref} className="w-screen h-28 px-10 py-4 bg-primary">
        <div className="w-full h-full bg-white rounded flex items-center justify-between gap-6 py-4 px-5">
          <input
            type="text"
            placeholder="Search Arva"
            className="w-full h-full text-dark-gray text-sm focus:outline-none"
            value={inputValue}
            onChange={onInputChange}
          />
          <Link href="/" className="w-15 h-full bg-primary rounded text-white flex items-center justify-center">
            <LuSearch />
          </Link>
        </div>
      </div>
    </div>
  );
}
