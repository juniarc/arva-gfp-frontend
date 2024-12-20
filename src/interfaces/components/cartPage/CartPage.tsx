import { useState } from "react";
import ProductList from "./ProductList";
import LineDivider from "../dividers/LineDivider";
import { CartItem } from "@/types/types";
interface CartPageProps {
  checkedShops: { [key: number]: boolean };
  checkedProducts: { [key: number]: boolean };
  handleShopCheckboxChange: (shop_id: number, checked: boolean) => void;
  handleProductCheckboxChange: (product_id: number, checked: boolean) => void;
  handleQuantityChange: (product_id: number, newQuantity: number, maxStock: number) => void;
  separatedByShop: any;
  handleBtnCO: () => void;
  totalPrice: number;
  totalItems: number;
  cart: CartItem[];
}
export default function CartPage({
  separatedByShop,
  checkedProducts,
  checkedShops,
  totalItems,
  totalPrice,
  handleProductCheckboxChange,
  handleShopCheckboxChange,
  handleBtnCO,
  handleQuantityChange,
  cart,
}: CartPageProps) {
  Object;
  return (
    <main className="p-10 tablet:p-15">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Your Cart</h1>
      <div className="flex items-center justify-between mt-10 border-b border-b-gray pb-5 tablet:pb-10">
        <p>{totalItems} items selected</p>
        <button className="text-xs tablet:text-sm text-red font-semibold">Delete</button>
      </div>
      <div>
        {Object.keys(separatedByShop).map((shop_id, index) => (
          <div key={index}>
            <ProductList
              checkedShops={checkedShops}
              shop_id={Number(shop_id)}
              handleShopCheckboxChange={handleShopCheckboxChange}
              shopData={separatedByShop[shop_id]}
              handleProductCheckboxChange={handleProductCheckboxChange}
              checkedProducts={checkedProducts}
              handleQuantityChange={handleQuantityChange}
              cart={cart}
            />
            <LineDivider className="mt-10 mb-5 tablet:my-10" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-5">
        <div>
          <p className="text-xs tablet:text text-dark-gray tablet:mb-5">Total: </p>
          <p className="font-semibold text-base tablet:text-[1.375rem]">Rp. {totalPrice}</p>
        </div>
        <button className="bg-primary rounded-lg py-3 px-20 text-white font-semibold tablet:text-[1.375rem]" onClick={handleBtnCO}>
          Buy
        </button>
      </div>
    </main>
  );
}
