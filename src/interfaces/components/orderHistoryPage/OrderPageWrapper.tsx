"use client";

import ProductItem from "./ProductItem";

export default function OrderHistoryPageWrapper() {
  return (
    <main className="min-h-[90vh] p-10 tablet:p-15 desktop:px-[120px] desktop:py-20">
      <h2 className="text-primary mb-10">Order History</h2>
      <div>
        <ProductItem />
      </div>
    </main>
  );
}
