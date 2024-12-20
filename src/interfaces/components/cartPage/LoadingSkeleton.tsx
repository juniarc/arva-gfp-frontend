import { LuMinus, LuPlus } from "react-icons/lu";
import LineDivider from "../dividers/LineDivider";

export default function LoadingSkeleton() {
  return (
    <main className="p-10 tablet:p-15">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Your Cart</h1>
      <div className="flex items-center justify-between mt-10 border-b border-b-gray pb-5 tablet:pb-10">
        <p>0 items selected</p>
        <button className="text-xs tablet:text-sm text-red font-semibold">Delete</button>
      </div>
      <div>
        <div className="mt-5">
          <div className="flex items-center gap-5">
            <div>
              <div className="w-10 h-10 tablet:w-20 tablet:h-20 rounded border border-gray"></div>
            </div>
            <div className="w-55 h-10 bg-gray animate-pulse rounded"></div>
          </div>
          <div className="mt-5 flex items-start gap-5 w-full min-w-full">
            <div className="p-0">
              <div className="w-10 h-10 tablet:w-20 tablet:h-20 rounded border border-gray"></div>
            </div>
            <div className="w-full">
              <div className="pt-3 flex items-start gap-5 tablet:gap-10 desktop:gap-10 w-full">
                <div className="w-30 h-30 tablet:w-[122px] tablet:h-[122px] desktop:w-[126px] desktop:h-[126px] tablet:min-w-[122px] tablet:min-h-[122px] desktop:min-w-[126px] desktop:min-h-[126px] min-w-30 min-h-30 rounded-none bg-gray animate-pulse"></div>
                <div className="flex flex-col gap-3 tablet:gap-5 desktop:gap-5 w-full ">
                  <div className="bg-gray animate-pulse w-55 h-10 rounded"></div>
                  <div className="bg-gray animate-pulse w-30 h-8 rounded"></div>
                  <div className="bg-gray animate-pulse w-[80px] h-10 rounded"></div>

                  <div className="flex items-center justify-end mt-5 desktop:mt-10 w-full">
                    <div className="text-dark-gray flex items-center border-solid border-gray border w-fit rounded-lg py-1 px-5 tablet:py-3 tablet:px-10 desktop:px-10 desktop:py-3">
                      <button className="tablet:text-[1.375rem]">
                        <LuMinus />
                      </button>
                      <input
                        type="number"
                        value={1}
                        className="w-30 tablet:w-40 desktop:w-36 text-center text-black tablet:text-[1.375rem] desktop:text-[1.375rem]"
                      />
                      <button className="tablet:text-[1.375rem]">
                        <LuPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LineDivider className="my-10" />
          <div className="mt-5 flex items-start gap-5 w-full min-w-full">
            <div className="p-0">
              <div className="w-10 h-10 tablet:w-20 tablet:h-20 rounded border border-gray"></div>
            </div>
            <div className="w-full">
              <div className="pt-3 flex items-start gap-5 tablet:gap-10 desktop:gap-10 w-full">
                <div className="w-30 h-30 tablet:w-[122px] tablet:h-[122px] desktop:w-[126px] desktop:h-[126px] tablet:min-w-[122px] tablet:min-h-[122px] desktop:min-w-[126px] desktop:min-h-[126px] min-w-30 min-h-30 rounded-none bg-gray animate-pulse"></div>
                <div className="flex flex-col gap-3 tablet:gap-5 desktop:gap-5 w-full ">
                  <div className="bg-gray animate-pulse w-55 h-10 rounded"></div>
                  <div className="bg-gray animate-pulse w-30 h-8 rounded"></div>
                  <div className="bg-gray animate-pulse w-[80px] h-10 rounded"></div>

                  <div className="flex items-center justify-end mt-5 desktop:mt-10 w-full">
                    <div className="text-dark-gray flex items-center border-solid border-gray border w-fit rounded-lg py-1 px-5 tablet:py-3 tablet:px-10 desktop:px-10 desktop:py-3">
                      <button className="tablet:text-[1.375rem]">
                        <LuMinus />
                      </button>
                      <input
                        type="number"
                        value={1}
                        className="w-30 tablet:w-40 desktop:w-36 text-center text-black tablet:text-[1.375rem] desktop:text-[1.375rem]"
                      />
                      <button className="tablet:text-[1.375rem]">
                        <LuPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div>
          <p className="text-xs tablet:text text-dark-gray tablet:mb-5">Total: </p>
          <p className="font-semibold text-base tablet:text-[1.375rem]">Rp. </p>
        </div>
        <button className="bg-primary rounded-lg py-3 px-20 text-white font-semibold tablet:text-[1.375rem]">Buy</button>
      </div>
    </main>
  );
}
