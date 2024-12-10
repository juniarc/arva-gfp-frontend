import { useState } from "react";
import ProductList from "./ProductList";
import LineDivider from "../dividers/LineDivider";
import { CartItem } from "@/types/types";
interface CartPageProps {
  checkedShops: { [key: number]: boolean };
  checkedProducts: { [key: number]: boolean };
  handleShopCheckboxChange: (shopId: number, checked: boolean) => void;
  handleProductCheckboxChange: (productId: number, checked: boolean) => void;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
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
  return (
    <main className="p-10">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Your Cart</h1>
      <div className="flex items-center justify-between mt-10 border-b border-b-gray pb-5">
        <p>{totalItems} items selected</p>
        <button className="text-xs text-red font-semibold">Delete</button>
      </div>
      <div>
        {Object.keys(separatedByShop).map((shopId, index) => (
          <div key={index}>
            <ProductList
              checkedShops={checkedShops}
              shopId={Number(shopId)}
              handleShopCheckboxChange={handleShopCheckboxChange}
              shopData={separatedByShop[shopId]}
              handleProductCheckboxChange={handleProductCheckboxChange}
              checkedProducts={checkedProducts}
              handleQuantityChange={handleQuantityChange}
              cart={cart}
            />
            <LineDivider className="mt-10 mb-5" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-5">
        <div>
          <p className="text-xs text-dark-gray">Total: </p>
          <p className="font-semibold text-base">Rp. {totalPrice}</p>
        </div>
        <button className="bg-primary rounded-lg py-3 px-20 text-white font-semibold" onClick={handleBtnCO}>
          Buy
        </button>
      </div>
    </main>
  );
}
