import Image from "next/image";
import ProductItem from "./ProductItem";
import Foto from "@/../public/images/dummy-photo-product.jpg";
import { Checkbox } from "@material-tailwind/react";
import { CartItem } from "@/types/types";

interface ProductListProps {
  checkedShops: { [key: number]: boolean };
  checkedProducts: { [key: number]: boolean };
  shopId: number;
  handleShopCheckboxChange: (shopId: number, checked: boolean) => void;
  shopData: any;
  handleProductCheckboxChange: (productId: number, checked: boolean) => void;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
  cart: CartItem[];
}

export default function ProductList({
  checkedShops,
  shopId,
  handleShopCheckboxChange,
  shopData,
  checkedProducts,
  cart,
  handleProductCheckboxChange,
  handleQuantityChange,
}: ProductListProps) {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-5">
        <div className="">
          <Checkbox
            color="blue"
            defaultChecked={checkedShops[shopId]}
            onChange={(e) => handleShopCheckboxChange(shopId, e.target.checked)}
            crossOrigin={undefined}
            className="w-10 h-10"
          />
        </div>
        <p className="font-semibold">Shop's Name</p>
      </div>
      {shopData.products.map((item: any) => (
        <ProductItem
          key={item.id}
          {...item}
          handleProductCheckboxChange={handleProductCheckboxChange}
          checkedProducts={checkedProducts}
          handleQuantityChange={handleQuantityChange}
          cart={cart}
        />
      ))}
    </div>
  );
}
