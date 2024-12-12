import { Product, User } from "@/types/types";
import AddressSection from "./AddressSection";
import ProductsInfo from "./ProductsInfo";
import ShippingSection from "./ShippingSection";
import LineDivider from "../dividers/LineDivider";
import VoucherSection from "./VoucherSection";
import SummarySection from "./SummarySection";
import PaymentMehtod from "./PaymentMethod";
import PaynowBtn from "./PaynowBtn";

interface BuynowPageProps {
  handleFetchUpdatedUser: (updatedAddress: any) => void;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProtected: boolean;
  productQuantity: number;
  totalPrice: number;
  handleQuantityChange: (newQuantity: number) => void;
  selectedShipping: string;
  paymentMethod: { imageUrl: string; name: string };
  handleSelectedShipping: (shipping: string) => void;
  handleSelectedPayment: (selectedPayment: { imageUrl: string; name: string }) => void;
  isCompleted: boolean;
  currentUser: User;
  product: Product;
  variantId: number;
  variantName: string | null;
}

export default function BuynowPage({
  variantId,
  variantName,
  currentUser,
  product,
  isCompleted,
  handleSelectedPayment,
  handleFetchUpdatedUser,
  handleCheckbox,
  paymentMethod,
  isProtected,
  productQuantity,
  totalPrice,
  handleQuantityChange,
  selectedShipping,
  handleSelectedShipping,
}: BuynowPageProps) {
  return (
    <main className="px-10 pt-5 tablet:p-15 ">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Checkout</h1>
      <section>
        <AddressSection {...currentUser} handleUpdateAddress={handleFetchUpdatedUser} />
      </section>
      <section>
        <ProductsInfo
          variantId={variantId}
          handleCheckbox={handleCheckbox}
          isChecked={isProtected}
          product={product}
          productQuantity={productQuantity}
          totalPrice={totalPrice}
          handleQuantityChange={handleQuantityChange}
          variantName={variantName}
        />
      </section>
      <section>
        <ShippingSection
          selectedShipping={selectedShipping}
          handleSelectedShipping={handleSelectedShipping}
          shippingOptions={product.shop.shippingChannel}
        />
        <LineDivider className="my-5 tablet:my-10" />
      </section>
      <section>
        <VoucherSection />
        <LineDivider className="my-5 tablet:my-10" />
      </section>
      <section>
        <PaymentMehtod handleSelectedPayment={handleSelectedPayment} selectedPayment={paymentMethod} />
      </section>
      <section>
        <SummarySection totalPrice={totalPrice} shippingPrice={1000} appliedVoucher={null} isProtected={isProtected} />
      </section>
      <PaynowBtn isCompleted={isCompleted} />
    </main>
  );
}
