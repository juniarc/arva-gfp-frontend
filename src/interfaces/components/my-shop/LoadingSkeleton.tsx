import LineDivider from "../dividers/LineDivider";

export default function LoadingSkeleton() {
  return (
    <main className="min-h-[90vh] p-10 tablet:p-15">
      <section>
        <div>
          <button className="px-15 py-5 font-bold text-white text-xs bg-primary rounded mb-15">Edit Shop Info</button>
          <div className="flex items-center gap-5 tablet:gap-10">
            <div className="h-[65px] tablet:h-[72px] aspect-square animate-pulse bg-gray rounded-full"></div>
            <div className="h-full flex flex-col gap-2">
              <div className="w-55 h-15 bg-gray animate-pulse rounded"></div>
              <div className="w-30 h-15 bg-gray animate-pulse rounded"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-[86px] tablet:h-55 bg-gray animate-pulse rounded-lg mt-10"></div>
        <div className="mt-10">
          <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Shop Description</h2>
          <div className="w-full h-10 rounded bg-gray animate-pulse mb-3"></div>
          <div className="w-full h-10 rounded bg-gray animate-pulse mb-3"></div>
          <div className="w-full h-10 rounded bg-gray animate-pulse"></div>
        </div>
        <LineDivider className="my-5 tablet:my-10" />
        <div className="mt-5">
          <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Shop Information</h2>
          <div className="w-full flex">
            <div className="w-2/5">
              <p className="font-semibold w-full mb-5">Location</p>
              <p className="font-semibold w-full mb-5">Email</p>
              <p className="font-semibold w-full mb-5">Phone Number</p>
              <p className="font-semibold w-full mb-5">Total Products</p>
              <p className="font-semibold w-full mb-5">Joined date</p>
            </div>
            <div>
              <div className="w-55 h-10 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-55 h-10 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-55 h-10 bg-gray animate-pulse rounded mb-5"></div>
              <div className="w-55 h-10 bg-gray animate-pulse rounded mb-5"></div>
            </div>
          </div>
        </div>
        <LineDivider className="my-5" />
      </section>
      <section className="mt-10">
        <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Products</h2>
        <div className="">
          <div className="shadow-md w-full h-[150px] bg-gray animate-pulse desktop:h-auto desktop:w-full rounded-lg"></div>
        </div>
      </section>
    </main>
  );
}
