import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

export default function SearchWrapper() {
  const [inputValue, setInputValue] = useState<string>("");
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <div className="flex items-center max-w-[500px] w-full">
      <input
        type="text"
        placeholder="Search Arva"
        className="w-full h-20 text-dark-gray text-sm focus:outline-none border-solid border border-gray px-10 rounded-s-lg"
        value={inputValue}
        onChange={onInputChange}
      />
      <Link href="/" className=" w-20 h-20 px-3 bg-primary rounded-e-lg text-white flex items-center justify-center">
        <LuSearch />
      </Link>
    </div>
  );
}
