"use client";

import { Product } from "@/types/types";
import { endPage, paginateArray, startPage } from "@/utils/elementHelpers";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
}
export default function ProductList({ products }: ProductListProps) {
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const MAX_INDICATORS = 4;
  const paginatedData = paginateArray(products, ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getItemProps = (index: number) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => setCurrentPage(index),
    }) as any;

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const starPageList = startPage(currentPage, MAX_INDICATORS, totalPages);
  const endPageList = endPage(starPageList, MAX_INDICATORS, totalPages);
  const pageIndicators = Array.from({ length: endPageList - starPageList }, (_, i) => starPageList + i);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 gap-5 w-full tablet:grid-cols-3">
        {Array.isArray(paginatedData) ? (
          paginatedData[currentPage].map((item: Product, index: number) => <ProductItem {...item} key={index} />)
        ) : (
          <p>{paginatedData}</p>
        )}
      </div>
      <div className="w-full flex items-center justify-center gap-10 mt-10">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          <BsChevronLeft className="tablet:text-xl" />
        </button>
        <div className="flex items-center gap-5">
          {pageIndicators.map((page, index) => (
            <button
              onClick={() => setCurrentPage(page)}
              disabled={page === currentPage}
              key={index}
              className={`px-5 py-3 rounded  flex items-center justify-center ${page === currentPage && "bg-secondary"}`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          <BsChevronRight className="tablet:text-xl" />
        </button>
      </div>
    </div>
  );
}
