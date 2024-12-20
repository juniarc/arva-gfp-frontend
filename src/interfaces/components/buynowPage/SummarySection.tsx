import LineDivider from "../dividers/LineDivider";
import { currencyFormater } from "@/utils/elementHelpers";

interface SummarySectionProps {
  appliedVoucher: number | null;
  isProtected: boolean;
  totalPriceItem: number;
  totalShippingCost: number;
}
export default function SummarySection({ appliedVoucher, isProtected, totalShippingCost, totalPriceItem }: SummarySectionProps) {
  const productSubtotal = totalPriceItem;
  const shippingSubtotal = totalShippingCost;
  const applicationFee = 1000;
  const handlingFee = 1000;
  const voucher = 1000;
  const protectionFee = 2000;
  let total = productSubtotal + shippingSubtotal + applicationFee + handlingFee - voucher;
  if (isProtected) {
    total += protectionFee;
  }

  const formatedProductSubtotal = currencyFormater.format(productSubtotal);
  const formatedShippingSubtotal = currencyFormater.format(shippingSubtotal);
  const formatedApplicationFee = currencyFormater.format(applicationFee);
  const formatedHandlingFee = currencyFormater.format(handlingFee);
  const formatedVoucher = currencyFormater.format(voucher);
  const formatedProtectionFee = currencyFormater.format(protectionFee);
  const formatedTotal = currencyFormater.format(total);
  return (
    <div>
      <h4>Shopping Summary</h4>
      <div className="mt-10">
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Product Subtotal</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">{formatedProductSubtotal}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Shipping Subtotal</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">{formatedShippingSubtotal}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Application Fee</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">{formatedApplicationFee}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="text-dark-gray text-xs tablet:text-base desktop:text-base">Handling Fee</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">{formatedHandlingFee}</p>
        </div>
        <div className="flex justify-between mb-5 text-primary">
          <p className="text-xs tablet:text-base desktop:text-base">Voucher</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">- {formatedVoucher}</p>
        </div>
        {isProtected && (
          <div className="flex justify-between mb-5 ">
            <p className="text-xs text-dark-gray tablet:text-base desktop:text-base">Protection Fee</p>
            <p className="font-semibold text-xs tablet:text-base desktop:text-base">{formatedProtectionFee}</p>
          </div>
        )}
        <LineDivider />
        <div className="flex justify-between my-5">
          <p className="text-xs tablet:text-base font-semibold desktop:text-base">Total</p>
          <p className="font-semibold text-xs tablet:text-base desktop:text-base">{formatedTotal}</p>
        </div>
        <LineDivider />
      </div>
    </div>
  );
}
