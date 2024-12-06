"use client";

import { Radio } from "@material-tailwind/react";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import PaymentOptionsModal from "../modals/PaymentOptionsModal";
import { useState } from "react";

interface PaymentMehtodProps {
  handleSelectedPayment: (selectedPayment: { imageUrl: string; name: string }) => void;
  selectedPayment: { imageUrl: string; name: string };
}
export default function PaymentMehtod({ handleSelectedPayment, selectedPayment }: PaymentMehtodProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h4>Payment Method</h4>
        <button onClick={() => setIsOpen(true)} className="text-xs tablet:text-base underline text-primary">
          See all
        </button>
        <PaymentOptionsModal
          selectedPayment={selectedPayment}
          handleSelectedPayment={handleSelectedPayment}
          isOpen={isOpen}
          handleCloseModal={() => setIsOpen(false)}
        />
      </div>
      <div>
        <div className="flex items-center justify-between mt-5 tablet:mt-10">
          <span className="flex items-center gap-5">
            <div className="w-16 aspect-square">
              <Image
                src={selectedPayment.imageUrl}
                width={20}
                height={20}
                className="w-full h-full object-cover object-center rounded"
                alt="Photo Image"
              />
            </div>
            <p>{selectedPayment.name}</p>
          </span>
          <div className={"rounded-full border p-2 flex items-center justify-center border-primary"}>
            <div className={"bg-primary w-6 h-6 tablet:w-10 tablet:h-10 rounded-full"}></div>
          </div>
        </div>
      </div>
      <LineDivider className="mt-5 mb-10 tablet:my-10" />
    </div>
  );
}
