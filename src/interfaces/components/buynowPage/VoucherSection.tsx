"use client";

import { BsChevronRight } from "react-icons/bs";
export default function VoucherSection() {
  const shipping = ["JNE", "J&T"];
  return (
    <div className="w-full bg-secondary rounded-lg p-5 tablet:p-10 desktop:p-10">
      <button className="flex items-center justify-between gap-5 font-semibold text-xs tablet:text-base desktop:text-base w-full">
        Select Voucher
        <BsChevronRight className="tablet:text-2xl desktop:text-2xl" />
      </button>
    </div>
  );
}
