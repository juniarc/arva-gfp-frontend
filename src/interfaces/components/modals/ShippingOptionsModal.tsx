"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { LuX, LuMinus, LuPlus } from "react-icons/lu";
import { CartItem, Product } from "@/types/types";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import SuccessAlert from "../alerts/SuccessAlert";

interface ShippingOptionsModalProps {
  isOpen: boolean;
  handleSelectedShipping: (selectedShipping: string) => void;
  handleCloseModal: () => void;
  shippingOptions: string[];
}
export default function ShippingOptionsModal({ isOpen, handleCloseModal, shippingOptions, handleSelectedShipping }: ShippingOptionsModalProps) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5">
        <button onClick={handleCloseModal} className="absolute top-5 right-5 tablet:top-15 tablet:right-15 z-10 tablet:w-15 tablet:h-15 tablet:p-3">
          <LuX className="tablet:text-2xl" />
        </button>
        <DialogBody className="text-black font-normal">
          <h3 className=" mb-10">Shipping Options</h3>
          <div>
            {shippingOptions.map((option, index) => (
              <div key={index} className="w-full">
                <button
                  className="w-full text-start"
                  onClick={() => {
                    handleSelectedShipping(option);
                    handleCloseModal();
                  }}
                >
                  <p className="font-semibold">{option} Reguler</p>
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
