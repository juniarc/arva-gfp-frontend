import { useState } from "react";
import RatingModal from "../modals/RatingModal";

export default function ProductItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [createRatingStatus, setCreateRatingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleStatus = (value: "idle" | "loading" | "success" | "error") => {
    setCreateRatingStatus(value);
  };

  return (
    <div className="w-full rounded-lg min-h-[260px] p-10 desktop:p-20 shadow-md relative">
      <div className="flex items-center justify-between desktop:justify-start gap-10">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-gray"></div>
          <p className="font-semibold">Shop name</p>
        </div>
        <p className="text-xs text-dark-gray">
          Purchase date: <span className="text-xs">05/12/2023</span>
        </p>
      </div>
      <div className="mt-10 flex items-start gap-10">
        <div className="w-[64px] tablet:w-[124px] desktop:w-[124px] aspect-square rounded bg-gray"></div>
        <div className="flex flex-col gap-10 w-full">
          <p className="font-semibold">Product name</p>
          <p className="text-xs desktop:text-base text-dark-gray">Variant</p>
          <div className="flex flex-col gap-5 desktop:gap-10 desktop:items-end">
            <div>
              <span className="text-xs text-dark-gray desktop:text-base desktop:ml-auto">Total Purchase: </span>
              <p className="font-semibold tablet:text-xl desktop:text-2xl">Rp. 10.000</p>
            </div>
            <div className="flex w-full tablet:justify-end desktop:justify-end">
              <div className="flex items-center justify-between gap-5 w-full tablet:w-1/2 desktop:w-1/3">
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-1/2 py-5 bg-white rounded border border-primary font-semibold text-xs desktop:text-base text-primary"
                >
                  Review Product
                </button>
                <button className="w-1/2 py-5 bg-primary rounded border font-semibold text-xs desktop:text-base text-white">Buy Again</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute">
        <RatingModal
          isOpen={isOpen}
          handleCloseModal={() => setIsOpen(false)}
          product_id={1}
          token=""
          handleStatus={handleStatus}
          order_id={1}
          status={createRatingStatus}
        />
      </div>
    </div>
  );
}
