import { LuFilter } from "react-icons/lu";
import FilterModal from "../modals/FilterModal";
import { useState } from "react";

interface FilterBtnProps {
  handleFilterBtn: (filterer: string) => void;
}
export default function FilterBtn({ handleFilterBtn }: FilterBtnProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center h-15 w-15 tablet:h-30 tablet:w-30 rounded tablet:rounded-lg bg-white border border-gray"
      >
        <LuFilter className="tablet:text-3xl" />
      </button>
      <FilterModal isOpen={isOpen} handleCloseModal={handleCloseModal} handleFilterBtn={handleFilterBtn} />
    </div>
  );
}
