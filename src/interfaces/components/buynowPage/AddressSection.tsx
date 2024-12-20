"use client";

import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { FaLocationDot, FaCircle } from "react-icons/fa6";
import LineDivider from "../dividers/LineDivider";
import AddressModal from "../modals/AdressModal";
import { User, UserInShipmentPage } from "@/types/types";

interface AddressSectionProps extends UserInShipmentPage {
  handleUpdateAddress: (updatedAddress: any) => void;
  editAddressStatus: "idle" | "loading" | "success" | "error";
}

export default function AddressSection({
  user_id,
  username,
  email,
  password,
  phone_number,
  profile_image,
  role,
  address_city,
  address_district,
  address_province,
  address_street,
  address_subdistrict,
  zip_code,
  address_label,
  editAddressStatus,
  handleUpdateAddress,
}: AddressSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="mt-10">
      <h4>Delivery Address</h4>
      <div className="flex justify-between items-center mt-5 desktop:mt-10 gap-5">
        {!address_street || !address_subdistrict || !address_district || !address_city || !address_province || !zip_code ? (
          <p className="font-semibold text-sm tablet:text-base desktop:text-base">Add your address</p>
        ) : (
          <div>
            <div className="text-xs tablet:text-base desktop:text-base font-semibold flex items-center gap-5 capitalize">
              <span className="flex items-center gap-2 ">
                <FaLocationDot className="text-primary" />
                {address_label}
              </span>
              <FaCircle className="text-[0.25rem]" />
              <p>{username}</p>
            </div>
            <p className="w-full text-ellipsis text-xs tablet:text-base desktop:text-base mt-5 capitalize">
              {address_street}, {address_subdistrict}, {address_district}, {address_city}, {address_province}, {zip_code}
            </p>
          </div>
        )}
        <div>
          <button onClick={handleModalOpen}>
            <BsChevronRight className="tablet:text-2xl desktop:text-2xl" />
          </button>
          <AddressModal
            isOpen={isOpen}
            handleCloseModal={() => setIsOpen(false)}
            initialValues={{ address_city, address_label, address_district, address_subdistrict, address_province, zip_code, address_street }}
            handleUpdateAddress={handleUpdateAddress}
            editAddressStatus={editAddressStatus}
          />
        </div>
      </div>

      <LineDivider className="mt-10" />
    </div>
  );
}
