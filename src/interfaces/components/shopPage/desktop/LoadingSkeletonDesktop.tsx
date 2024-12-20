import LineDivider from "../../dividers/LineDivider";

export default function LoadingSkeletonDesktop() {
  return (
    <main className="min-h-[90vh] px-[120px] py-20">
      <section>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="h-[65px] tablet:h-[72px] aspect-square animate-pulse bg-gray rounded-full"></div>
            <div className="h-full flex flex-col gap-2">
              <div className="w-55 h-[45px] bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-30 h-[45px] bg-gray animate-pulse rounded mb-5"></div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-30">
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-15 bg-gray animate-pulse rounded "></div>
              <p>Ratings & Reviews</p>
            </div>
          </div>
        </div>
        <LineDivider className="my-10" />
        <div className="mt-10">
          <h2 className="mb-10">Shop Description</h2>
          <div className="w-full h-12 rounded bg-gray animate-pulse"></div>
          <div className="w-full h-12 rounded bg-gray animate-pulse"></div>
          <div className="w-full h-12 rounded bg-gray animate-pulse"></div>{" "}
        </div>
        <LineDivider className="my-10" />
        <div className="mt-5">
          <h2 className="mb-10">Shop Information</h2>
          <div className="w-full flex">
            <div className="w-1/5">
              <p className="font-semibold w-full mb-5">Location</p>
              <p className="font-semibold w-full mb-5">Email</p>
              <p className="font-semibold w-full mb-5">Phone Number</p>
              <p className="font-semibold w-full mb-5">Total Products</p>
              <p className="font-semibold w-full mb-5">Joined date</p>
            </div>
            <div>
              <div className="w-55 h-12 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-55 h-12 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-55 h-12 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-1/2 h-12 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-1/2 h-12 bg-gray animate-pulse rounded mb-5"></div>
            </div>
          </div>
        </div>
        <LineDivider className="my-10" />
      </section>
      <section className="mt-10">
        <h2 className="mb-10">Products</h2>
        <div className="grid grid-cols-2 gap-5 tablet:grid-cols-3 desktop:grid-cols-4">
          <div className="shadow-md w-full h-[300px] desktop:h-auto desktop:w-full rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="shadow-md w-full h-[300px] desktop:h-auto desktop:w-full rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="shadow-md w-full h-[300px] desktop:h-auto desktop:w-full rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="shadow-md w-full h-[300px] desktop:h-auto desktop:w-full rounded-lg">
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
      </section>
    </main>
  );
}
