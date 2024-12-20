import { Voucher } from "@/types/types";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ConfirmationModal from "../modals/ConfirmationModal";
import api from "@/services/api/api";

interface VoucherItemProps extends Voucher {
  token: string | undefined;
  handleUpdate: (voucher_id: number) => void;
}

export default function VoucherItem({ voucher_id, voucher_name, voucher_type, voucher_value, token, handleUpdate }: VoucherItemProps) {
  const [isOpen, setIsopen] = useState<boolean>(false);

  const handleDelete = async () => {
    await api.deleteVoucher(voucher_id, token);
    setIsopen(false);
    handleUpdate(voucher_id);
  };
  return (
    <div className="w-full desktop:w-1/3 border border-primary rounded px-10 py-5  flex items-center justify-between relative">
      <div className="flex items-center gap-3 text-xs desktop:text-base text-primary">
        <p>{voucher_name}</p>
        <p className="font-semibold">({voucher_value}%)</p>
      </div>
      <button onClick={() => setIsopen(true)}>
        <FaRegTrashCan className="text-red" />
      </button>
      <div className="absolute">
        <ConfirmationModal
          isOpen={isOpen}
          handleCloseModal={() => setIsopen(false)}
          message="Are you sure to delete this voucher?"
          handleSubmit={handleDelete}
        />
      </div>
    </div>
  );
}
