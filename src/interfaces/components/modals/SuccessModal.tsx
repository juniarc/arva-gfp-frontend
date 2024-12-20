"use client";

import { Dialog, DialogBody } from "@material-tailwind/react";
import { BsPatchCheckFill } from "react-icons/bs";

interface ConfirmationModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  message: string;
}
export default function SuccessModal({ isOpen, handleCloseModal, message }: ConfirmationModalProps) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 desktop:p-10">
        <DialogBody className="text-black ">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="w-full flex items-center justify-center">
              <BsPatchCheckFill className="text-primary text-7xl" />
            </div>
            <p className="w-full text-center font-semibold lowercase first-letter:capitalize">{message}</p>
          </div>
        </DialogBody>
      </Dialog>
    );
  }
}
