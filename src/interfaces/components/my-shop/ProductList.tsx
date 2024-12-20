import { Product } from "@/types/types";
import ProductItem from "./ProductItem";
import { useState } from "react";
import ManageProductModal from "../modals/ManageProductModal";
import ItemNotFound from "../error/ItemNotFound";
import { ManageProductValuesProps } from "../modals/ManageProductModal";

interface ProductListProps {
  products: Product[];
  handleSubmit: (values: ManageProductValuesProps) => void;
  manageProductStatus: "idle" | "loading" | "success" | "error";
  token: string | undefined;
  getUpdateProductList: () => void;
}

export default function ProductList({ products, handleSubmit, manageProductStatus, token, getUpdateProductList }: ProductListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialValues = {
    images: [],
    product_name: "",
    description: "",
    product_type: "",
    category_id: 0,
    variants: [
      {
        variant_name: "",
        price: 0,
        stock: 0,
        unit: "",
      },
    ],
    shippingInfo: {
      packageWeight: 0,
      packageWidth: 0,
      packageLength: 0,
      packageHeight: 0,
      shippingCost: 0,
    },
    shipping_cost: 0,
    discount: {
      discount_name: "",
      discount_value: 0,
      start_date: "",
      end_date: "",
      discount_type: "percentage",
    },
  };

  // const handleSubmit = (values: any) => {
  //   setProductList([...productList, values]);
  // };
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
            manageProductStatus={manageProductStatus}
            initialValues={initialValues}
            handleCloseModal={() => setIsOpen(false)}
            isOpen={isOpen}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      {products.length > 0 ? (
        <div className="flex flex-col gap-5">
          {products.map((item, index) => (
            <ProductItem {...item} key={index} token={token} getUpdateProductList={getUpdateProductList} />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mb-20">
          <ItemNotFound text="Your Product is Empty, Let's Add New Product" />
        </div>
      )}
    </div>
  );
}
