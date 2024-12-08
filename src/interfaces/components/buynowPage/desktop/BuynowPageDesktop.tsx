import { Product, User } from "@/types/types";
import AddressSection from "../AddressSection";
import ProductsInfo from "../ProductsInfo";
import ShippingSection from "../ShippingSection";
import LineDivider from "../../dividers/LineDivider";
import VoucherSection from "../VoucherSection";
import SummarySection from "../SummarySection";
import PaymentMehtod from "../PaymentMethod";
import PaynowBtn from "../PaynowBtn";

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
}

export default function BuynowPageDesktop({
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
    <main className="px-[120px] flex justify-between gap-20 py-20 ">
      <div className="w-full max-w-[68%]">
        <h1 className="text-primary text-4xl">Checkout</h1>
        <section>
          <AddressSection {...currentUser} handleUpdateAddress={handleFetchUpdatedUser} />
        </section>
        <section>
          <ProductsInfo
            handleCheckbox={handleCheckbox}
            isChecked={isProtected}
            product={product}
            productQuantity={productQuantity}
            totalPrice={totalPrice}
            handleQuantityChange={handleQuantityChange}
          />
        </section>
        <section>
          <ShippingSection
            selectedShipping={selectedShipping}
            handleSelectedShipping={handleSelectedShipping}
            shippingOptions={product.shop.shippingOptions}
          />
          <LineDivider className="my-5 tablet:my-10 desktop:my-10" />
        </section>
        <section>
          <VoucherSection />
          <LineDivider className="my-5 tablet:my-10 desktop:my-10" />
        </section>
        <section>
          <PaymentMehtod handleSelectedPayment={handleSelectedPayment} selectedPayment={paymentMethod} />
        </section>
      </div>
      <div className="w-full max-w-[32%] h-fit bg-white p-10 shadow-lg rounded-lg">
        <section>
          <SummarySection totalPrice={totalPrice} shippingPrice={1000} appliedVoucher={null} isProtected={isProtected} />
        </section>
        <PaynowBtn isCompleted={isCompleted} />
      </div>
    </main>
  );
}
