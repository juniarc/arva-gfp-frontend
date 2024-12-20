import { CartItem, Voucher } from "@/types/types";
import ProductItem from "./ProductItem";
import ShippingSection from "../buynowPage/ShippingSection";
import VoucherSection from "../buynowPage/VoucherSection";
import { GoShieldCheck } from "react-icons/go";
import { Checkbox } from "@material-tailwind/react";
import { shippingOptions } from "@/services/fixedData";
import api from "@/services/api/api";
import { useEffect, useState } from "react";
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
  selectedVocuher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }[];
  handleSelectedVoucher: (voucher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }[]) => void;
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
  selectedVocuher,
  handleSelectedVoucher,
}: ProductListProps) {
  const [voucherShop, setVoucherShop] = useState<Voucher[]>([]);
  const [selectedVoucherShop, setSelectedVocuherShop] = useState<{
    voucher_id: number;
    voucher_name: string;
    voucher_value: number;
    shop_id?: number;
  }>({
    voucher_id: 0,
    voucher_name: "",
    voucher_value: 0,
    shop_id: 0,
  });

  const handleSelectedVoucherShop = (voucher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }) => {
    const updatedVoucher = [...selectedVocuher, voucher];
    setSelectedVocuherShop(voucher);
    handleSelectedVoucher(updatedVoucher);
  };

  const getVoucherShop = async () => {
    const response = await api.getAllVoucherShop(shopId);
    setVoucherShop(response);
  };

  useEffect(() => {
    getVoucherShop();
  }, []);
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
        <VoucherSection handleSelectedVoucher={handleSelectedVoucherShop} voucherShop={voucherShop} selectedVocuher={selectedVoucherShop} />
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
