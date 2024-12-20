"use client";

import { Dialog, DialogBody } from "@material-tailwind/react";
import { LuX } from "react-icons/lu";

interface ConfirmationModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  message: string;
  handleSubmit: (value?: any) => void;
}
export default function ConfirmationModal({ isOpen, handleCloseModal, message, handleSubmit }: ConfirmationModalProps) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 pt-20 desktop:p-10">
        <button
          onClick={handleCloseModal}
          className="absolute top-5 right-5 tablet:top-15 tablet:right-15 z-10 tablet:w-15 tablet:h-15 tablet:p-3 desktop:w-15 desktop:h-15 desktop:top-15 desktop:right-15"
        >
          <LuX className="tablet:text-2xl desktop:text-2xl" />
        </button>
        <DialogBody className="text-black font-normal h-[100px]">
          <div className="w-full flex flex-col items-center justify-center gap-10">
            <p className="w-full text-center font-semibold lowercase first-letter:capitalize">{message}</p>
            <div className="w-full flex items-center gap-10">
              <button onClick={handleCloseModal} className="w-1/2 py-3 border border-red rounded bg-white hover:bg-light-gray font-semibold">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 py-3 border border-red rounded bg-light-red hover:bg-red text-red hover:text-white font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    );
  }
}
