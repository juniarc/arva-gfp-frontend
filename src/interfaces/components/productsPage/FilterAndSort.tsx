import FilterBtn from "./FilterBtn";
import SortBtn from "./SortBtn";

interface FilterAndSortProps {
  handleFilterBtn: (filterer: string) => void;
}

export default function FilterAndSort({ handleFilterBtn }: FilterAndSortProps) {
  return (
    <div className="flex gap-5">
      <SortBtn />
      <FilterBtn handleFilterBtn={handleFilterBtn} />
    </div>
  );
}
