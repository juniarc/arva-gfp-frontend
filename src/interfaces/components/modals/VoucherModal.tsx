import { Voucher } from "@/types/types";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { LuX } from "react-icons/lu";
import LineDivider from "../dividers/LineDivider";

interface VoucherModalProps {
  isOpen: boolean;
  selectedVocuher: { voucher_id: number; voucher_name: string; voucher_value: number };
  handleSelectedVoucher: (voucher: { voucher_id: number; voucher_name: string; voucher_value: number }) => void;
  handleCloseModal: () => void;
  voucherShop: Voucher[];
}
export default function VocuherModal({ isOpen, handleCloseModal, handleSelectedVoucher, selectedVocuher, voucherShop }: VoucherModalProps) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15 desktop:p-10">
        <button
          onClick={handleCloseModal}
          className="absolute top-5 right-5 tablet:w-15 tablet:h-15 tablet:top-15 tablet:right-15 desktop:w-15 desktop:h-15 desktop:top-15 desktop:right-15 tablet:p-3 z-10"
        >
          <LuX className="tablet:text-2xl desktop:text-2xl" />
        </button>
        <DialogBody className="text-black font-normal">
          <h3 className=" mb-10">Payment Method Options</h3>
          <div>
            {voucherShop.map((voucher, index) => (
              <div key={index} className="w-full">
                <button
                  onClick={() => {
                    handleSelectedVoucher(voucher);
                    handleCloseModal();
                  }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between mt-5 gap-10">
                    <p className="font-semibold text-start w-auto text-wrap">{voucher.voucher_name}</p>
                    <p className="text-red min-w-fit">Discount {voucher.voucher_value} %</p>
                  </div>
                </button>
                <LineDivider className="my-5" />
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    );
  }
}
