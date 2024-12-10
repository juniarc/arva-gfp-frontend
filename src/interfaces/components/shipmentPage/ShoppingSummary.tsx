import LineDivider from "../dividers/LineDivider";

interface ShoppingSummaryProps {
  totalPrice: number;
  shippingPrice: number;
  appliedVoucher: number | null;
  totalProtectedShop: number;
  totalItems: number;
}
export default function ShoppingSummary({ totalPrice, shippingPrice, appliedVoucher, totalProtectedShop, totalItems }: ShoppingSummaryProps) {
  const productSubtotal = totalPrice;
  const shippingSubtotal = shippingPrice;
  const applicationFee = 1000;
  const handlingFee = 1000;
  const voucher = 1000;
  const totalProtectionFee = totalProtectedShop * 1000;
  let total = productSubtotal + shippingSubtotal + applicationFee + handlingFee - voucher;
  if (totalProtectedShop > 0) {
    total += totalProtectionFee;
  }
  return (
    <div>
      <h4>Shopping Summary</h4>
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Total Price ({totalItems} Items)</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">Rp. {productSubtotal}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Total Shipping Fee</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">Rp. {shippingSubtotal}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Application Fee</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">Rp. {applicationFee}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Handling Fee</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">Rp. {handlingFee}</p>
        </div>
        <div className="flex justify-between mb-5 text-primary">
          <p className="text-xs tablet:text-base desktop:text-base">Voucher</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">- Rp. {voucher}</p>
        </div>
        {totalProtectedShop > 0 && (
          <div className="flex justify-between mb-5 ">
            <p className="text-xs text-dark-gray tablet:text-base desktop:text-base">Total Protection Fee </p>
            <p className="font-semibold text-xs tablet:text-base desktop:text-base">Rp. {totalProtectionFee}</p>
          </div>
        )}
        <LineDivider />
        <div className="flex justify-between my-5">
          <p className="text-xs tablet:text-base font-semibold desktop:text-base">Total</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">Rp. {total}</p>
        </div>
        <LineDivider />
      </div>
    </div>
  );
}
