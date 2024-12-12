import AddressSection from "../../buynowPage/AddressSection";
import PaymentMehtod from "../../buynowPage/PaymentMethod";
import { CartItem, User } from "@/types/types";
import ProductsInfo from "../ProductsInfo";
import ShoppingSummary from "../ShoppingSummary";
import PaynowBtn from "../../buynowPage/PaynowBtn";

interface ShipmentPageProps {
  user: User;
  handleFetchUpdatedUser: (updatedAddress: any) => void;
  cart: CartItem[];
  separatedByShop: any;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
  selectedShipping: Record<number, string>;
  handleSelectedShipping: (shopId: number, shippingOption: string) => void;
  handleCheckbox: (shopId: number, isChecked: boolean) => void;
  isProtected: Record<number, boolean>;
  handleSelectedPayment: (selectedPayment: { imageUrl: string; name: string }) => void;
  paymentMethod: { imageUrl: string; name: string };
  totalPrice: number;
  totalItems: number;
  isCompleted: boolean;
  totalProtectedShop: number;
}

export default function ShipmentPageDesktop({
  user,
  handleFetchUpdatedUser,
  separatedByShop,
  cart,
  handleQuantityChange,
  handleSelectedShipping,
  selectedShipping,
  handleCheckbox,
  handleSelectedPayment,
  paymentMethod,
  totalPrice,
  totalItems,
  isProtected,
  isCompleted,
  totalProtectedShop,
}: ShipmentPageProps) {
  return (
    <main className="px-[120px] flex justify-between gap-20 py-20 ">
      <div className="w-full max-w-[68%]">
        <h1 className="text-primary text-4xl">Checkout</h1>
        <section>
          <AddressSection {...user} handleUpdateAddress={handleFetchUpdatedUser} />
        </section>
        <section>
          <ProductsInfo
            separatedByShop={separatedByShop}
            cart={cart}
            handleQuantityChange={handleQuantityChange}
            selectedShipping={selectedShipping}
            handleSelectedShipping={handleSelectedShipping}
            isProtected={isProtected}
            handleCheckbox={handleCheckbox}
          />
        </section>
        <section>
          <PaymentMehtod handleSelectedPayment={handleSelectedPayment} selectedPayment={paymentMethod} />
        </section>
      </div>
      <div className="w-full max-w-[32%] h-fit bg-white p-10 shadow-lg rounded-lg">
        <section>
          <ShoppingSummary
            totalPrice={totalPrice}
            shippingPrice={1000}
            appliedVoucher={null}
            totalProtectedShop={totalProtectedShop}
            totalItems={totalItems}
          />{" "}
        </section>
        <PaynowBtn isCompleted={isCompleted} />
      </div>
    </main>
  );
}
