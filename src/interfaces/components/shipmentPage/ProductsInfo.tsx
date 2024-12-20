import { CartItem, Voucher } from "@/types/types";
import ProductList from "./ProductList";
import LineDivider from "../dividers/LineDivider";
import { shippingOptions } from "@/services/fixedData";

interface ProductsInfoProps {
  handleCheckbox: (shopId: number, isChecked: boolean) => void;
  isProtected: Record<number, boolean>;
  separatedByShop: any;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
  cart: CartItem[];
  selectedShipping: Record<number, string>;
  handleSelectedShipping: (shopId: number, shippingOption: string) => void;
  selectedVocuher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }[];
  handleSelectedVoucher: (voucher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }[]) => void;
}

export default function ProductsInfo({
  separatedByShop,
  handleQuantityChange,
  cart,
  selectedShipping,
  handleSelectedShipping,
  handleCheckbox,
  isProtected,
  handleSelectedVoucher,
  selectedVocuher,
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
              shippingOptions={shippingOptions}
              selectedShipping={selectedShipping[Number(shopId)]}
              handleSelectedShipping={handleSelectedShipping}
              shopId={Number(shopId)}
              handleCheckbox={handleCheckbox}
              isProtected={isProtected}
              handleSelectedVoucher={handleSelectedVoucher}
              selectedVocuher={selectedVocuher}
            />
            <LineDivider className="mt-10 mb-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
