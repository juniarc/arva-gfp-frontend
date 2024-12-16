import { BsSortDown } from "react-icons/bs";

export default function SortBtn() {
  return (
    <div>
      <button className="flex items-center justify-center h-15 w-15 tablet:h-30 tablet:w-30 rounded tablet:rounded-lg bg-white border border-gray">
        <BsSortDown className="text-lg tablet:text-[2rem]" />
      </button>
    </div>
  );
}
