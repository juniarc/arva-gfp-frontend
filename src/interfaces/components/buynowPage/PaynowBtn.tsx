export default function PaynowBtn({ isCompleted }: { isCompleted: boolean }) {
  return (
    <div className="mt-10">
      <button
        onClick={() => console.log("pay")}
        className={`${isCompleted ? "bg-primary" : "bg-gray"} w-full text-center text-white font-bold rounded-lg py-5 px-5 tablet:text-[1.375rem]`}
        disabled={!isCompleted}
      >
        Pay Now
      </button>
    </div>
  );
}
