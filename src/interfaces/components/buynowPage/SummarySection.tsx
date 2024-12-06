import LineDivider from "../dividers/LineDivider";

interface SummarySectionProps {
  totalPrice: number;
  shippingPrice: number;
  appliedVoucher: number | null;
  isProtected: boolean;
}
export default function SummarySection({ totalPrice, shippingPrice, appliedVoucher, isProtected }: SummarySectionProps) {
  const productSubtotal = totalPrice;
  const shippingSubtotal = shippingPrice;
  const applicationFee = 1000;
  const handlingFee = 1000;
  const voucher = 1000;
  const protectionFee = 1000;
  let total = productSubtotal + shippingSubtotal + applicationFee + handlingFee - voucher;
  if (isProtected) {
    total += protectionFee;
  }
  return (
    <div>
      <h4>Shopping Summary</h4>
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base">Product Subtotal</p>
          <p className="font-semibold text-xs tablet:text-base">Rp. {productSubtotal}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base">Shipping Subtotal</p>
          <p className="font-semibold text-xs tablet:text-base">Rp. {shippingSubtotal}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base">Application Fee</p>
          <p className="font-semibold text-xs tablet:text-base">Rp. {applicationFee}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base">Handling Fee</p>
          <p className="font-semibold text-xs tablet:text-base">Rp. {handlingFee}</p>
        </div>
        <div className="flex justify-between mb-5 text-primary">
          <p className="text-xs tablet:text-base">Voucher</p>
          <p className="font-semibold text-xs tablet:text-base">- Rp. {voucher}</p>
        </div>
        {isProtected && (
          <div className="flex justify-between mb-5 ">
            <p className="text-xs text-dark-gray tablet:text-base">Protection Fee</p>
            <p className="font-semibold text-xs tablet:text-base">Rp. {protectionFee}</p>
          </div>
        )}
        <LineDivider />
        <div className="flex justify-between my-5">
          <p className="text-dark-gray text-xs tablet:text-base font-semibold">Total</p>
          <p className="font-semibold text-xs tablet:text-base">Rp. {total}</p>
        </div>
        <LineDivider />
      </div>
    </div>
  );
}
