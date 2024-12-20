"use client";

import { Voucher } from "@/types/types";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import VocuherModal from "../modals/VoucherModal";

interface VoucherSectionProps {
  voucherShop: Voucher[];
  selectedVocuher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number };
  handleSelectedVoucher: (voucher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }) => void;
}
export default function VoucherSection({ voucherShop, selectedVocuher, handleSelectedVoucher }: VoucherSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full bg-secondary rounded-lg p-5 tablet:p-10 desktop:p-10">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between gap-5 font-semibold text-xs tablet:text-base desktop:text-base w-full capitalize"
      >
        {selectedVocuher.voucher_id !== 0 ? `${selectedVocuher.voucher_name} (Discount ${selectedVocuher.voucher_value}%)` : "Select Voucher"}
        <BsChevronRight className="tablet:text-2xl desktop:text-2xl" />
      </button>
      <VocuherModal
        isOpen={isOpen}
        handleCloseModal={() => setIsOpen(false)}
        handleSelectedVoucher={handleSelectedVoucher}
        selectedVocuher={selectedVocuher}
        voucherShop={voucherShop}
      />
    </div>
  );
}
