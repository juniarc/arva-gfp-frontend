"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogBody, Radio, select } from "@material-tailwind/react";
import { LuX } from "react-icons/lu";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import SuccessAlert from "../alerts/SuccessAlert";

interface PaymentOptionsModalProps {
  isOpen: boolean;
  handleSelectedPayment: (selectedPayment: { imageUrl: string; name: string }) => void;
  handleCloseModal: () => void;
  selectedPayment: { imageUrl: string; name: string };
  //   paymentMethodOptions: {imageUrl: string, name: string}[];
}

const paymentMethods = [
  {
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "Mandiri Virtual Account",
  },
  {
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "BRI Virtual Account",
  },
  {
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "Transfer Bank BCA",
  },
];
export default function PaymentOptionsModal({ isOpen, handleCloseModal, handleSelectedPayment, selectedPayment }: PaymentOptionsModalProps) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15">
        <button onClick={handleCloseModal} className="absolute top-5 right-5 tablet:w-15 tablet:h-15 tablet:top-15 tablet:right-15 tablet:p-3 z-10">
          <LuX className="tablet:text-2xl" />
        </button>
        <DialogBody className="text-black font-normal">
          <h3 className=" mb-10">Payment Method Options</h3>
          <div>
            {paymentMethods.map((option, index) => (
              <div key={index} className="w-full">
                <button
                  onClick={() => {
                    handleSelectedPayment(option);
                    handleCloseModal();
                  }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between mt-5">
                    <span className="flex items-center gap-5">
                      <div className="w-16 aspect-square">
                        <Image
                          src={option.imageUrl}
                          width={20}
                          height={20}
                          className="w-full h-full object-cover object-center rounded"
                          alt="Photo Image"
                        />
                      </div>
                      <p>{option.name}</p>
                    </span>
                    <div
                      className={`rounded-full border  p-2 flex items-center justify-center ${selectedPayment.name === option.name ? "border-primary" : "border-gray"}`}
                    >
                      <div
                        className={`${selectedPayment.name === option.name ? "bg-primary" : ""} w-6 h-6 tablet:w-10 tablet:h-10 rounded-full`}
                      ></div>
                    </div>
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
