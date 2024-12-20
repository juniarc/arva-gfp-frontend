import { CreateVoucherBody, Voucher } from "@/types/types";
import { FaStar, FaRegTrashCan } from "react-icons/fa6";
import VoucherItem from "./VoucherItem";
import AddVoucherModal from "../modals/AddVoucherModal";
import { useState } from "react";
import { format } from "date-fns";
import api from "@/services/api/api";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";

interface VoucherSectionProps {
  vouchers: Voucher[];
  token: string | undefined;
  shop_id: number;
}

export default function VoucherSection({ vouchers, token, shop_id }: VoucherSectionProps) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [activeVouchers, setActiveVouchers] = useState<Voucher[]>(vouchers);
  const [addStatus, setAddStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [voucherBody, setVoucherBody] = useState({
    voucher_name: "",
    voucher_value: 0,
    start_date: "",
    end_date: "",
  });

  const handleUpdateAfterDelete = (voucherId: number) => {
    const updatedVouchers = activeVouchers.filter((voucher) => voucher.voucher_id !== voucherId);
    setActiveVouchers(updatedVouchers);
  };

  const handleAddVoucher = async (values: any) => {
    setAddStatus("loading");
    const reqBody = {
      voucher_name: values.voucher_name.toLowerCase(),
      voucher_value: values.voucher_value,
      start_date: format(new Date(values.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(values.end_date), "yyyy-MM-dd"),
      voucher_type: "percentage",
    };
    try {
      const createVoucher = await api.createVoucher(token, reqBody);

      if (createVoucher.voucher_id) {
        const updatedVouchers = await api.getVoucher(shop_id);
        setActiveVouchers(updatedVouchers);
      }

      setAddStatus("success");
      setTimeout(() => {
        setAddStatus("idle");
      }, 2000);
    } catch (error) {
      setAddStatus("error");
      setTimeout(() => {
        setAddStatus("idle");
      }, 2000);
    }
  };
  return (
    <div>
      <h2 className="text-xl tablet:text-[1.75rem] desktop:text-4xl">Active Shop Voucher</h2>
      <div className="mt-10">
        <div className="flex flex-col gap-5">
          {activeVouchers.map((voucher, index) => (
            <VoucherItem key={index} {...voucher} token={token} handleUpdate={handleUpdateAfterDelete} />
          ))}
        </div>
        <div className="mt-5 relative">
          <button
            onClick={() => setIsopen(true)}
            className="w-full desktop:w-1/3 bg-secondary rounded px-10 py-5  text-primary font-semibold text-xs desktop:text-base "
          >
            Add Voucher
          </button>
          <AddVoucherModal
            initialValues={voucherBody}
            handleCloseModal={() => setIsopen(false)}
            isOpen={isOpen}
            addVoucherStatus={addStatus}
            handleSubmit={handleAddVoucher}
          />
          <SuccessAlert isOpen={addStatus === "success"} text="Success Add Voucher" />
          <FailAlert isOpen={addStatus === "error"} text="Failed Add Voucher" />
        </div>
      </div>
    </div>
  );
}
