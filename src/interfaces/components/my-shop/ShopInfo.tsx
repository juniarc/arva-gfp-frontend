import { ShopDevelop } from "@/services/api/dummyShop";
import Image from "next/image";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { poppins } from "@/interfaces/fonts/fonts";
import LineDivider from "../dividers/LineDivider";
import { shippingOptions } from "@/services/fixedData";
import ShopInfoModal from "../modals/ShopInfoModal";
import { useEffect, useState } from "react";

interface ShopInfoProps extends ShopDevelop {
  totalRatings: number;
  averageRatings: number;
}

export default function ShopInfo({
  name,
  addressCity,
  imageUrl,
  description,
  products,
  id,
  userId,
  addressProvince,
  addressDistrict,
  addressLabel,
  addressStreet,
  addressSubdistrict,
  phoneNumber,
  email,
  openingHours,
  closingHours,
  zipCode,
  createdAt,
  totalRatings,
  averageRatings,
}: ShopInfoProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [shopProfileValues, setShopProfileValues] = useState({
    addressLabel: addressLabel,
    addressProvince: addressProvince,
    addressCity: addressCity,
    addressDistrict: addressDistrict,
    addressSubdistrict: addressSubdistrict,
    addressStreet: addressStreet,
    zipCode: `${zipCode}`,
    shippingChannel: shippingOptions,
    email: email,
    phoneNumber: phoneNumber,
    openingHours: openingHours,
    closingHours: closingHours,
    name: name,
    description: description,
  });

  const handleSubmt = (values: any) => {
    setShopProfileValues({ ...values });
    setIsOpen(false);
  };

  useEffect(() => {}, [shopProfileValues]);
  return (
    <div>
      <div className="mb-15 w-full">
        <button onClick={() => setIsOpen(true)} className="px-15 py-5 font-bold text-white text-xs bg-primary rounded">
          Edit Shop Info
        </button>
        <ShopInfoModal initialValues={shopProfileValues} isOpen={isOpen} handleCloseModal={() => setIsOpen(false)} handleSubmit={handleSubmt} />
      </div>
      <div className="flex items-center gap-5 tablet:gap-10">
        <div className="h-[65px] tablet:h-[72px] aspect-square">
          <Image src={imageUrl} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
        </div>
        <div className="h-full flex flex-col gap-2">
          <h3 className={`${poppins.className} font-bold`}>{name}</h3>
          <span className="flex items-center text-xs tablet:text-base gap-2 text-dark-gray capitalize">
            <FaLocationDot /> {shopProfileValues.addressCity}
          </span>
        </div>
      </div>
      <div className="w-full  mt-10 flex items-center justify-center">
        <div className="flex px-30 py-15 items-center justify-center gap-10 tablet:gap-30 bg-primary rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 ">
              <FaStar className="text-lg text-yellow" />
              <p className="text-white font-semibold text-lg">
                {averageRatings} ({totalRatings})
              </p>
            </div>
            <p className="text-white text-xs">Ratings & Reviews</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl tablet:text-[1.75rem] mb-10 tablet:mb-10">Shop Description</h2>
        <p className="text-dark-gray text-xs">{description}</p>
      </div>
      <LineDivider className="my-10 tablet:my-10" />
      <div className="mt-5">
        <h2 className="text-xl tablet:text-[1.75rem] mb-10 tablet:mb-10">Shop Information</h2>
        <div className="w-full flex">
          <div className="w-2/5">
            <p className="font-semibold w-full mb-5">Location</p>
            <p className="font-semibold w-full mb-5">Email</p>
            <p className="font-semibold w-full mb-5">Phone Number</p>
            <p className="font-semibold w-full mb-5">Total Products</p>
            <p className="font-semibold w-full mb-5">Joined date</p>
          </div>
          <div>
            <p className="mb-5 capitalize">
              : {shopProfileValues.addressCity.toLowerCase()}, {shopProfileValues.addressProvince.toLowerCase()}
            </p>
            <p className="mb-5 lowercase">: {shopProfileValues.email}</p>
            <p className="mb-5">: {shopProfileValues.phoneNumber}</p>
            <p className="mb-5">: {products.length}</p>
            <p className="mb-5">: {createdAt}</p>
          </div>
        </div>
      </div>
      <LineDivider className="my-10 tablet:my-10" />
      {/* <div>
        <h2 className="text-xl tablet:text-[1.75rem] mb-10 tablet:mb-10">Shipping Channel</h2>
        <ul className="list-disc pl-8">
          {shippingOptions.map((option, index) => (
            <li key={index} className="mb-5 text-sm">
              {option}
            </li>
          ))}
        </ul>
      </div>
      <LineDivider className="my-10 tablet:my-10" /> */}
    </div>
  );
}
