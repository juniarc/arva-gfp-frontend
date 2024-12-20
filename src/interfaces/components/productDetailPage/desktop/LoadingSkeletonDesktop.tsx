import { FaRegHeart } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function LoadingSkeletonDesktop() {
  return (
    <main className="w-full px-[120px] py-20">
      <div className="w-full flex items-start gap-20">
        <div className="w-full max-w-[31%] sticky top-10">
          <section>
            <div className="w-full tablet:px-[150px] gap-5">
              <div className="w-full aspect-square bg-gray animate-pulse rounded-lg"></div>
              <div className="mt-10 flex items-center w-full">
                <div className="w-30 desktop:h-30 tablet:w-[80px] aspect-square rounded bg-gray animate-pulse"></div>
                <div className="w-30 desktop:h-30 tablet:w-[80px] aspect-square rounded bg-gray animate-pulse"></div>
                <div className="w-30 desktop:h-30 tablet:w-[80px] aspect-square rounded bg-gray animate-pulse"></div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full">
          <section>
            <div className="p-10 tablet:px-[150px] desktop:p-0">
              <div className="w-full flex flex-col gap-5 tablet:gap-10">
                <div className="w-30 h-12 bg-gray rounded animate-pulse"></div>
                <div className="w-1/2 h-14 bg-gray rounded animate-pulse"></div>
                <div className="flex items-center gap-5 tablet:gap-10 desktop:mt-5">
                  <div className="flex items-center gap-5">
                    <div className="w-30 h-16 bg-gray rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-30 h-8 bg-gray rounded animate-pulse"></div>
              </div>
              <div className="w-fit bg-secondary rounded-lg p-10 mt-10">
                <>
                  <div className="flex items-center gap-10 mb-10">
                    <p className="font-semibold">Variants</p>
                    <div className="grid grid-cols-4 gap-5 w-full">
                      <div className="w-[70px] h-16 bg-gray rounded animate-pulse"></div>
                      <div className="w-[70px] h-16 bg-gray rounded animate-pulse"></div>
                    </div>
                  </div>
                </>
                <div className="flex items-center gap-8 w-full my-10">
                  <p className="font-semibold">Quantity</p>
                  <div className="bg-white flex items-center border-solid border-black border w-fit rounded-lg py-1 px-10">
                    <button>
                      <LuMinus />
                    </button>
                    <div className="w-55 text-center text-black"></div>
                    <button>
                      <LuPlus />
                    </button>
                  </div>
                </div>
                <div className="my-10 w-full h-[1px] bg-white"></div>
                <div className="w-30 h-12 bg-gray rounded animate-pulse"></div>
                <div className="mt-10">
                  <div className="w-full h-full flex items-center justify-between gap-5">
                    <button className="border border-primary bg-white border-solid p-5 rounded-lg">
                      <FaRegHeart className="text-primary text-xl" />
                    </button>
                    <div className="w-full flex items-center gap-5">
                      <button className="border bg-white w-1/2 border-primary border-solid p-5 rounded-lg text-sm font-bold text-primary">
                        Buy Now
                      </button>
                      <button className="bg-primary p-5 w-1/2 rounded-lg text-sm font-bold text-white flex items-center gap-5 justify-center">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="mb-6">Description</h3>
                <div className="bg-gray animate-pulse rounded h-8 w-full mb-3"></div>
                <div className="bg-gray animate-pulse rounded h-8 w-full mb-3"></div>
                <div className="bg-gray animate-pulse rounded h-8 w-1/2 mb-3"></div>
              </div>
            </div>{" "}
          </section>
          <section>
            <div className="px-10 desktop:p-0 flex items-center justify-between desktop:justify-normal desktop:gap-20 tablet:px-[150px]">
              <div className="flex items-center gap-5 tablet:gap-10">
                <div className="h-[65px] tablet:h-[72px] aspect-square rounded-full bg-gray animate-pulse"></div>
                <div className="h-full flex flex-col gap-2">
                  <div className="bg-gray animate-pulse rounded h-15 w-20"></div>
                  <div className="bg-gray animate-pulse rounded h-8 w-20"></div>
                  <div className="bg-gray animate-pulse rounded h-8 w-20"></div>
                </div>
              </div>
              <a href="*" className="bg-gray font-semibold text-xs tablet:text-base py-2 px-5 rounded">
                Visit
              </a>
            </div>
          </section>
          <section>
            <div className="p-10 desktop:p-0 tablet:px-[150px] ">
              <div>
                <h3>Product Reviews</h3>
                <div className="bg-gray animate-pulse rounded h-8 w-20"></div>
              </div>
              <div className="flex flex-col gap-5 mt-6">
                <div className="border-solid border border-gray rounded-lg p-5 desktop:p-10 w-full h-[172px] ">
                  <div className="mb-5">
                    <div className="flex items-center gap-5 mb-3">
                      <div className="w-12 aspect-square rounded-full bg-gray animate-pulse"></div>
                      <div className="bg-gray animate-pulse rounded h-10 w-10"></div>
                    </div>
                    <div className="bg-gray animate-pulse rounded h-8 w-20"></div>
                  </div>
                  <div>
                    <div className="bg-gray animate-pulse rounded h-8 w-full mb-3"></div>
                    <div className="bg-gray animate-pulse rounded h-8 w-full mb-3"></div>
                    <div className="bg-gray animate-pulse rounded h-8 w-1/2 mb-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-10">
        <section className="w-full">
          <div>
            <div className="mb-10">
              <div className="w-1/4 h-15 bg-gray rounded-lg animate-pulse"></div>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
                <div className="w-full h-1/2 bg-gray animate-pulse"></div>
                <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                  <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                  <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
                </div>
              </div>
              <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
                <div className="w-full h-1/2 bg-gray animate-pulse"></div>
                <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                  <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                  <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
                </div>
              </div>
              <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
                <div className="w-full h-1/2 bg-gray animate-pulse"></div>
                <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                  <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                  <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
                </div>
              </div>
              <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
                <div className="w-full h-1/2 bg-gray animate-pulse"></div>
                <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                  <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                  <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
                </div>
              </div>
              <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
                <div className="w-full h-1/2 bg-gray animate-pulse"></div>
                <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                  <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                  <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                  <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
      </div>
    </main>
  );
}
