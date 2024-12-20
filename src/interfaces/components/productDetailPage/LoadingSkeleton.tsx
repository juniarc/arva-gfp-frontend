export default function LoadingSkeleton() {
  return (
    <main className="w-full">
      <section className="w-full">
        <div className="w-full tablet:px-[150px]">
          <div className="w-full aspect-square bg-gray animate-pulse"></div>
          <div className="w-auto max-w-full overflow-x-scroll flex justify-center gap-5 mt-5 tablet:mt-10">
            <div className="w-30 tablet:w-[80px] aspect-square rounded bg-gray animate-pulse"></div>
            <div className="w-30 tablet:w-[80px] aspect-square rounded bg-gray animate-pulse"></div>
            <div className="w-30 tablet:w-[80px] aspect-square rounded bg-gray animate-pulse"></div>
          </div>
        </div>
      </section>
      <section>
        <div className="p-10 tablet:px-[150px]">
          <div className="w-full  flex flex-col gap-5 tablet:gap-10">
            <div className="bg-gray animate-pulse rounded h-8 w-20"></div>
            <div className="bg-gray animate-pulse rounded h-12 w-50"></div>
            <div className="bg-gray animate-pulse rounded h-12 w-20"></div>
            <div className="bg-gray animate-pulse rounded h-12 w-30"></div>
            <div className="bg-gray animate-pulse rounded h-8 w-20"></div>
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
      <section className="w-full px-10">
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
      </section>
      {/* <WishlistProvider>
            <FloatingDrawer
              product_id={productDetail.product_id}
              category={productDetail.category}
              image={productDetail.image[0].image_data}
              product_name={productDetail.product_name}
              discount={productDetail.discount}
              variant={productDetail.variant}
              ratings={productDetail.ratings}
              tag={productDetail.tag}
              sold={productDetail.sold}
              shop={productDetail.shop}
            />
          </WishlistProvider> */}
    </main>
  );
}
