import AddressSection from "../buynowPage/AddressSection";
import PaymentMehtod from "../buynowPage/PaymentMethod";
import { CartItem, User, UserInShipmentPage } from "@/types/types";
import ProductsInfo from "./ProductsInfo";
import ShoppingSummary from "./ShoppingSummary";
import PaynowBtn from "../buynowPage/PaynowBtn";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";
import SuccessModal from "../modals/SuccessModal";

interface ShipmentPageProps {
  user: UserInShipmentPage;
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
  editAddressStatus: "idle" | "loading" | "success" | "error";
  shippingPrice: number;
  handlePayBtn: () => void;
  orderStatus: "idle" | "loading" | "success" | "error";
}
export default function ShipmentPage({
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
  editAddressStatus,
  shippingPrice,
  handlePayBtn,
  orderStatus,
}: ShipmentPageProps) {
  return (
    <main className="px-10 pt-5 tablet:p-15 mb-10">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Checkout</h1>
      <section>
        <AddressSection editAddressStatus={editAddressStatus} {...user} handleUpdateAddress={handleFetchUpdatedUser} />
      </section>
      <section className="mt-5">
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
      <section>
        <ShoppingSummary
          totalPrice={totalPrice}
          shippingPrice={shippingPrice}
          appliedVoucher={null}
          totalProtectedShop={totalProtectedShop}
          totalItems={totalItems}
        />
      </section>
      <PaynowBtn isCompleted={isCompleted} handlePayBtn={handlePayBtn} orderStatus={orderStatus} />
      <SuccessAlert isOpen={editAddressStatus === "success"} text="Success edit user" />
      <FailAlert isOpen={editAddressStatus === "error"} text="Fail edit user" />
      <SuccessModal isOpen={orderStatus === "success"} handleCloseModal={() => {}} message={"Order success"} />
    </main>
  );
}
