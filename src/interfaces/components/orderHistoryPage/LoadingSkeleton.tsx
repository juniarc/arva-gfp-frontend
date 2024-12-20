export default async function LoadingSkeleton() {
  return (
    <main>
      <main className="min-h-[90vh] p-10 tablet:p-15 desktop:px-[120px] desktop:py-20">
        <h2 className="text-primary">Order History</h2>
        <div>
          <div className="w-full rounded-lg min-h-[260px] p-10 shadow-md">
            <div className="flex items-center justify-between gap-10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-gray"></div>
                <p className="font-semibold">Shop name</p>
              </div>
              <div className="w-full h-12 rounded bg-gray animate-pulse"></div>
            </div>
            <div className="mt-10 flex items-start gap-10 desktop:flex-col">
              <div className="w-[64px] tablet:w-[124px] desktop:w-[124px] aspect-square rounded bg-gray"></div>
              <div className="flex flex-col gap-10 w-full">
                <div className="w-full h-16 rounded bg-gray animate-pulse"></div>
                <div className="w-full h-12 rounded bg-gray animate-pulse"></div>
                <div className="flex flex-col gap-5 desktop:gap-10 desktop:items-end">
                  <div>
                    <span className="text-xs tablet:text-base desktop:text-base text-dark-gray">Total Purchase: </span>
                    <div className="w-full h-16 rounded bg-gray animate-pulse"></div>
                  </div>
                  <div className="flex w-full tablet:justify-end desktop:justify-end">
                    <div className="flex items-center justify-between gap-5 w-full tablet:w-1/2 desktop:w-1/3">
                      <button className="w-1/2 py-5 bg-white rounded border border-primary font-semibold text-xs desktop:text-base text-primary">
                        Review Product
                      </button>
                      <button className="w-1/2 py-5 bg-primary rounded border font-semibold text-xs desktop:text-base text-white">Buy Again</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
