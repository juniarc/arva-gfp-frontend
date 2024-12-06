"use client";

import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { FaLocationDot, FaCircle } from "react-icons/fa6";
import LineDivider from "../dividers/LineDivider";
import AddressModal from "../modals/AdressModal";
import { User } from "@/types/types";

interface AddressSectionProps extends User {
  handleUpdateAddress: (updatedAddress: any) => void;
}

export default function AddressSection({
  id,
  name,
  email,
  imageUrl,
  phoneNumber,
  addressLabel,
  addressStreet,
  addressSubdistrict,
  addressDistrict,
  addressCity,
  addressProvince,
  zipCode,
  handleUpdateAddress,
}: AddressSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="mt-10">
      <h4>Delivery Address</h4>
      <div className="flex justify-between items-center mt-5 gap-5">
        {!addressLabel || !addressStreet || !addressSubdistrict || !addressDistrict || !addressCity || !addressProvince || !zipCode ? (
          <p className="font-semibold text-sm tablet:text-base">Add your address</p>
        ) : (
          <div>
            <div className="text-xs tablet:text-base font-semibold flex items-center gap-5 capitalize">
              <span className="flex items-center gap-2 ">
                <FaLocationDot className="text-primary" />
                {addressLabel}
              </span>
              <FaCircle className="text-[0.25rem]" />
              <p>{name}</p>
            </div>
            <p className="w-full text-ellipsis text-xs tablet:text-base mt-5 capitalize">
              {addressStreet}, {addressSubdistrict}, {addressDistrict}, {addressCity}, {addressProvince}, {zipCode}
            </p>
          </div>
        )}
        <div>
          <button onClick={handleModalOpen}>
            <BsChevronRight className="tablet:text-2xl" />
          </button>
          <AddressModal
            isOpen={isOpen}
            handleCloseModal={() => setIsOpen(false)}
            {...{
              id,
              name,
              email,
              imageUrl,
              phoneNumber,
              addressLabel,
              addressStreet,
              addressSubdistrict,
              addressDistrict,
              addressCity,
              addressProvince,
              zipCode,
              handleUpdateAddress,
            }}
          />
        </div>
      </div>

      <LineDivider className="mt-10" />
    </div>
  );
}
