import { Spinner } from "@material-tailwind/react";

interface PaynowBtnProps {
  handlePayBtn: () => void;
  isCompleted: boolean;
  orderStatus: "idle" | "loading" | "success" | "error";
}

export default function PaynowBtn({ isCompleted, handlePayBtn, orderStatus }: PaynowBtnProps) {
  return (
    <div className="mt-10">
      <button
        onClick={handlePayBtn}
        className={`${isCompleted ? "bg-primary" : "bg-gray"} w-full text-center text-white font-bold rounded-lg py-5 px-5 tablet:text-[1.375rem] flex items-center justify-center`}
        disabled={!isCompleted}
      >
        {orderStatus === "loading" ? (
          <div>
            <Spinner className="text-white/30" />
          </div>
        ) : (
          "Pay Now"
        )}
      </button>
    </div>
  );
}
