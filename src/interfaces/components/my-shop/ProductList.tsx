import { Product } from "@/types/types";
import ProductItem from "./ProductItem";
import { useState } from "react";
import ManageProductModal from "../modals/ManageProductModal";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product[]>(products);
  const [uploadProductValues, setUploadProductValues] = useState({
    imageUrl: [],
    name: "",
    description: "",
    category: "",
    price: 0,
    stocks: 0,
    unit: "",
    discount: 0,
    // variants: variants[].name ?? '',
    shippingInfo: {
      packageWeight: 0,
      packageHeight: 0,
      packageWidth: 0,
      packageLength: 0,
      shippingFee: 0,
    },
    tags: [],
  });

  const handleSubmit = (values: any) => {
    setProductList([...productList, values]);
  };
  return (
    <div>
      <div className="w-full desktop:w-fit desktop:gap-20 flex items-center justify-between mb-10 tablet:mb-10">
        <h2 className="text-xl tablet:text-[1.75rem] desktop:text-4xl">Products</h2>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-15 py-5 tablet:py-8 font-bold text-white text-xs tablet:text-[0.9375rem] desktop:text-base bg-primary rounded"
          >
            + Add New Product
          </button>
          <ManageProductModal
            initialValues={uploadProductValues}
            handleCloseModal={() => setIsOpen(false)}
            isOpen={isOpen}
            handleSubmit={handleSubmit}
            handlePrev={() => setIsOpen(false)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {productList.map((item, index) => (
          <ProductItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
