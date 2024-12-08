import { BsChevronRight } from "react-icons/bs";
import LineDivider from "../dividers/LineDivider";
import ShippingOptionsModal from "../modals/ShippingOptionsModal";
import { useState } from "react";

interface ShippingSectionProps {
  selectedShipping: string;
  handleSelectedShipping: (selectedShipping: string) => void;
  shippingOptions: string[];
}
export default function ShippingSection({ shippingOptions, handleSelectedShipping, selectedShipping }: ShippingSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-full bg-light-yellow rounded-lg p-5 tablet:p-10 desktop:p-10">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between gap-5 font-semibold text-xs tablet:text-base desktop:text-base w-full"
      >
        {selectedShipping ? `${selectedShipping} Reguler` : "Select Shipping"}
        <BsChevronRight className="tablet:text-2xl desktop:text-2xl" />
      </button>
      <ShippingOptionsModal
        handleSelectedShipping={handleSelectedShipping}
        shippingOptions={shippingOptions}
        isOpen={isOpen}
        handleCloseModal={() => setIsOpen(false)}
      />
    </div>
  );
}
