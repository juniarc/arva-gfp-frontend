"use client";

import { BsChevronRight } from "react-icons/bs";
export default function VoucherSection() {
  const shipping = ["JNE", "J&T"];
  return (
    <div className="w-full bg-secondary rounded-lg p-5">
      <button className="flex items-center justify-between gap-5 font-semibold text-xs  w-full">
        Select Voucher
        <BsChevronRight />
      </button>
    </div>
  );
}
