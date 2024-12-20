import { CartItem } from "@/types/types";
import ProductItem from "./ProductItem";
import ShippingSection from "../buynowPage/ShippingSection";
import VoucherSection from "../buynowPage/VoucherSection";
import { GoShieldCheck } from "react-icons/go";
import { Checkbox } from "@material-tailwind/react";
import { shippingOptions } from "@/services/fixedData";
interface ProductListProps {
  shopData: any;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
  cart: CartItem[];
  selectedShipping: string;
  handleSelectedShipping: (shopId: number, shippingOption: string) => void;
  shippingOptions: string[];
  shopId: number;
  handleCheckbox: (shopId: number, isChecked: boolean) => void;
  isProtected: Record<number, boolean>;
}

export default function ProductList({
  shopData,
  cart,
  handleQuantityChange,
  selectedShipping,
  handleSelectedShipping,
  shopId,
  isProtected,
  handleCheckbox,
}: ProductListProps) {
  return (
    <div>
      <p className="font-semibold mb-5 text-primary">{shopData.shop_name}</p>
      <div>
        {shopData.products.map((item: any, index: number) => (
          <ProductItem key={index} {...item} cart={cart} handleQuantityChange={handleQuantityChange} />
        ))}
      </div>
      <div>
        <ShippingSection
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          handleSelectedShipping={(shippingOption) => handleSelectedShipping(shopId, shippingOption)}
        />
      </div>
      <div className="mt-5">
        <VoucherSection />
      </div>
      <div className="flex items-center justify-between tablet:mt-10 desktop:mt-10">
        <span className="text-dark-gray text-xs tablet:text-base desktop:text-base flex gap-2 items-center underline">
          <GoShieldCheck /> Total damage protection 3 months
        </span>
        <div className="text-xs tablet:text-base desktop:text-base text-dark-gray flex gap-5 items-center">
          <span>(Rp. 2000)</span>
          <Checkbox
            checked={isProtected[shopId] || false}
            onChange={() => handleCheckbox(shopId, !isProtected[shopId])}
            className="w-12 h-12 checked:bg-primary"
            crossOrigin={undefined}
          />
        </div>
      </div>
    </div>
  );
}
