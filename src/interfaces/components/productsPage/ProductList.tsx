"use client";

import { Product, Variant } from "@/types/types";
import { endPage, paginateArray, startPage } from "@/utils/elementHelpers";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// import ProductItem, { productTest } from "./ProductItem";
import ProductItem from "../homepage/productListByCategory/ProductItem";
import ItemNotFound from "../error/ItemNotFound";

interface ProductListProps {
  products: Product[];
  userId: number;
  token: string | undefined;
}
export default function ProductList({ products, userId, token }: ProductListProps) {
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const MAX_INDICATORS = 4;
  const paginatedData = paginateArray(products, ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState<number>(0);

  // const getItemProps = (index: number) =>
  //   ({
  //     variant: currentPage === index ? "filled" : "text",
  //     color: "gray",
  //     onClick: () => setCurrentPage(index),
  //   }) as any;

  // function mapProduct(original: Product): productTest {
  //   return {
  //     product_id: original.product_id,
  //     product_name: original.product_name,
  //     description: original.description,
  //     product_type: original.product_type,
  //     images: original.image,
  //     category: original.category,
  //     discounts: original.discount,
  //     ratings: original.ratings,
  //     shipping_cost: original.shipping_cost,
  //     shop: original.shop,
  //     sold: original.sold,
  //     variants: original.variant.map((variant: Variant) => ({
  //       price: variant.variant_price,
  //       product_id: original.product_id,
  //       stock: variant.variant_stock,
  //       unit: variant.variant_unit,
  //       variant_id: variant.variant_id,
  //       variant_name: variant.variant_name,
  //     })),
  //     status: original.status,
  //     created_at: original.created_at,
  //     tag: original.tag,
  //   };
  // }

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
    <div className="mt-10 desktop:mt-0 desktop:w-full">
      {Array.isArray(paginatedData) ? (
        <div className="grid grid-cols-2 gap-5 w-full tablet:grid-cols-3 desktop:grid-cols-4">
          {paginatedData[currentPage].map((item: Product, index: number) => (
            <ProductItem {...item} key={index} userId={userId} token={token} />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mb-20">
          <ItemNotFound text="Oops, Product Not Found" />
        </div>
      )}
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
