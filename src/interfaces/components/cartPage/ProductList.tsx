import Image from "next/image";
import ProductItem from "./ProductItem";
import Foto from "@/../public/images/dummy-photo-product.jpg";
import { Checkbox } from "@material-tailwind/react";
import { CartItem } from "@/types/types";

interface ProductListProps {
  checkedShops: { [key: number]: boolean };
  checkedProducts: { [key: number]: boolean };
  shop_id: number;
  handleShopCheckboxChange: (shop_id: number, checked: boolean) => void;
  shopData: any;
  handleProductCheckboxChange: (product_id: number, checked: boolean) => void;
  handleQuantityChange: (product_id: number, newQuantity: number, maxStock: number) => void;
  cart: CartItem[];
}

export default function ProductList({
  checkedShops,
  shop_id,
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
        <div>
          <Checkbox
            color="blue"
            defaultChecked={checkedShops[shop_id]}
            onChange={(e) => handleShopCheckboxChange(shop_id, e.target.checked)}
            crossOrigin={undefined}
            className="w-10 h-10 tablet:w-20 tablet:h-20"
          />
        </div>
        <p className="font-semibold capitalize">{shopData.shop_name}</p>
      </div>
      {shopData.products.map((item: any, index: number) => (
        <ProductItem
          key={index}
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
