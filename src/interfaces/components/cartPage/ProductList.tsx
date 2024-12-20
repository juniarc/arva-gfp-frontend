import ProductItem from "./ProductItem";
import { Checkbox } from "@material-tailwind/react";
import { CartItem } from "@/types/types";

interface ProductListProps {
  checkedShops: { [key: number]: boolean };
  checkedProducts: { [key: number]: boolean };
  shop_id: number;
  handleShopCheckboxChange: (shop_id: number, checked: boolean) => void;
  handleProductCheckboxChange: (product_id: number, checked: boolean) => void;
  handleQuantityChange: (product_id: number, newQuantity: number, maxStock: number) => void;
  shop: { products: CartItem[]; shop_name: string };
  handleDeleteCart: (cartId: number) => void;
}

export default function ProductList({
  checkedShops,
  shop_id,
  handleShopCheckboxChange,
  checkedProducts,
  shop,
  handleProductCheckboxChange,
  handleQuantityChange,
  handleDeleteCart,
}: ProductListProps) {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-5">
        <div>
          <Checkbox
            color="blue"
            checked={checkedShops[shop_id] || false}
            onChange={(e) => handleShopCheckboxChange(shop_id, e.target.checked)}
            crossOrigin={undefined}
            className="w-10 h-10 tablet:w-20 tablet:h-20"
          />
        </div>
        <p className="font-semibold capitalize">{shop.shop_name}</p>
      </div>
      {shop.products.map((item: CartItem, index: number) => (
        <ProductItem
          key={index}
          {...item}
          handleProductCheckboxChange={handleProductCheckboxChange}
          checkedProducts={checkedProducts}
          handleQuantityChange={handleQuantityChange}
          handleDeleteCart={handleDeleteCart}
        />
      ))}
    </div>
  );
}
