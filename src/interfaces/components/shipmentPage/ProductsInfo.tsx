import { CartItem } from "@/types/types";
import ProductList from "./ProductList";
import LineDivider from "../dividers/LineDivider";

interface ProductsInfoProps {
  handleCheckbox: (shopId: number, isChecked: boolean) => void;
  isProtected: Record<number, boolean>;
  separatedByShop: any;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
  cart: CartItem[];
  selectedShipping: Record<number, string>;
  handleSelectedShipping: (shopId: number, shippingOption: string) => void;
}

export default function ProductsInfo({
  separatedByShop,
  handleQuantityChange,
  cart,
  selectedShipping,
  handleSelectedShipping,
  handleCheckbox,
  isProtected,
}: ProductsInfoProps) {
  return (
    <div className="mt-10">
      <h4 className="mb-5">Shopping Items</h4>
      <div>
        {Object.keys(separatedByShop).map((shopId, index) => (
          <div key={index}>
            <ProductList
              shopData={separatedByShop[shopId]}
              handleQuantityChange={handleQuantityChange}
              cart={cart}
              selectedShipping={selectedShipping[Number(shopId)]}
              handleSelectedShipping={handleSelectedShipping}
              shopId={Number(shopId)}
              handleCheckbox={handleCheckbox}
              isProtected={isProtected[Number(shopId)]}
            />
            <LineDivider className="mt-10 mb-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
