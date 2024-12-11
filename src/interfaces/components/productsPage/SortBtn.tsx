import { BsSortDown } from "react-icons/bs";

export default function SortBtn() {
  return (
    <div>
      <button className="flex items-center justify-center h-15 w-15 rounded bg-white border border-gray">
        <BsSortDown className="text-lg" />
      </button>
    </div>
  );
}
