import { ShopingItem, UserInShipmentPage } from "@/types/types";
import AddressSection from "./AddressSection";
import ProductsInfo from "./ProductsInfo";
import ShippingSection from "./ShippingSection";
import LineDivider from "../dividers/LineDivider";
import VoucherSection from "./VoucherSection";
import SummarySection from "./SummarySection";
import PaymentMehtod from "./PaymentMethod";
import PaynowBtn from "./PaynowBtn";
import { shippingOptions } from "@/services/fixedData";
import FailAlert from "../alerts/FailAlert";
import SuccessModal from "../modals/SuccessModal";
import SuccessAlert from "../alerts/SuccessAlert";

interface BuynowPageProps {
  handleFetchUpdatedUser: (updatedAddress: any) => void;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProtected: boolean;
  handleQuantityChange: (newQuantity: number, maxStock: number) => void;
  selectedShipping: string;
  paymentMethod: { imageUrl: string; name: string };
  handleSelectedShipping: (shipping: string) => void;
  handleSelectedPayment: (selectedPayment: { imageUrl: string; name: string }) => void;
  isCompleted: boolean;
  currentUser: UserInShipmentPage;
  shoppingItem: ShopingItem;
  editAddressStatus: "idle" | "loading" | "success" | "error";
  handlePayBtn: () => void;
  orderStatus: "idle" | "loading" | "success" | "error";
  totalPriceItem: number;
  totalShippingCost: number;
}

export default function BuynowPage({
  currentUser,
  shoppingItem,
  isCompleted,
  handleSelectedPayment,
  handleFetchUpdatedUser,
  handleCheckbox,
  paymentMethod,
  isProtected,
  handleQuantityChange,
  selectedShipping,
  handleSelectedShipping,
  editAddressStatus,
  handlePayBtn,
  orderStatus,
  totalPriceItem,
  totalShippingCost,
}: BuynowPageProps) {
  return (
    <main className="px-10 py-5 tablet:p-15">
      <h1 className="text-primary text-[1.75rem] tablet:text-[2rem]">Checkout</h1>
      <section>
        <AddressSection editAddressStatus={editAddressStatus} {...currentUser} handleUpdateAddress={handleFetchUpdatedUser} />
      </section>
      <section>
        <ProductsInfo
          totalPriceItem={totalPriceItem}
          handleCheckbox={handleCheckbox}
          isChecked={isProtected}
          handleQuantityChange={handleQuantityChange}
          {...shoppingItem}
        />
      </section>
      <section>
        <ShippingSection selectedShipping={selectedShipping} handleSelectedShipping={handleSelectedShipping} shippingOptions={shippingOptions} />
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
        <SummarySection totalPriceItem={totalPriceItem} totalShippingCost={totalShippingCost} appliedVoucher={null} isProtected={isProtected} />
      </section>
      <PaynowBtn isCompleted={isCompleted} handlePayBtn={handlePayBtn} orderStatus={orderStatus} />
      <SuccessAlert isOpen={editAddressStatus === "success"} text="Success edit user" />
      <FailAlert isOpen={editAddressStatus === "error"} text="Fail edit user" />
      <SuccessModal isOpen={orderStatus === "success"} handleCloseModal={() => {}} message={"Order success"} />
    </main>
  );
}
