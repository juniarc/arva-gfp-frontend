import { ShopDevelop } from "@/services/api/dummyShop";
import Image from "next/image";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { poppins } from "@/interfaces/fonts/fonts";
import LineDivider from "../../dividers/LineDivider";
import { shippingOptions } from "@/services/fixedData";
import ShopInfoModal from "../../modals/ShopInfoModal";
import { useEffect, useState } from "react";

interface ShopInfoProps extends ShopDevelop {
  totalRatings: number;
  averageRatings: number;
}

export default function ShopInfoDesktop({
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
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-10
                  "
        >
          <div className="h-[65px] tablet:h-[72px] aspect-square">
            <Image src={imageUrl} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
          </div>
          <div className="h-full flex flex-col gap-2">
            <h3 className={`${poppins.className} font-bold`}>{name}</h3>
            <span className="flex items-center gap-2 text-dark-gray">
              <FaLocationDot /> {addressCity}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-30">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 ">
              <FaStar className="text-lg text-yellow" />
              <p className=" font-semibold text-2xl">
                {averageRatings} ({totalRatings})
              </p>
            </div>
            <p>Ratings & Reviews</p>
          </div>
          <div className="w-px h-15 bg-black"></div>
          <div className=" flex flex-col text-center justify-center">
            <div>
              <p className="font-semibold text-2xl">
                {openingHours} - {closingHours}
              </p>
            </div>
            <p>Operasional Hours</p>
          </div>
        </div>
      </div>
      <LineDivider className="my-10" />
      <div className="mt-10">
        <h2 className="mb-10">Shop Description</h2>
        <p className="text-dark-gray">{description}</p>
      </div>
      <LineDivider className="my-10" />
      <div className="mt-5">
        <h2 className="mb-10">Shop Information</h2>
        <div className="w-full flex">
          <div className="w-1/5">
            <p className="font-semibold w-full mb-5">Location</p>
            <p className="font-semibold w-full mb-5">Email</p>
            <p className="font-semibold w-full mb-5">Phone Number</p>
            <p className="font-semibold w-full mb-5">Total Products</p>
            <p className="font-semibold w-full mb-5">Joined date</p>
          </div>
          <div>
            <p className="mb-5">
              : {addressCity}, {addressProvince}
            </p>
            <p className="mb-5">: {email}</p>
            <p className="mb-5">: {phoneNumber}</p>
            <p className="mb-5">: {products.length}</p>
            <p className="mb-5">: {createdAt}</p>
          </div>
        </div>
      </div>
      <div className="mb-15 mt-10">
        <button onClick={() => setIsOpen(true)} className="px-15 py-5 font-bold text-white bg-primary rounded">
          Edit Shop Info
        </button>
        <ShopInfoModal initialValues={shopProfileValues} isOpen={isOpen} handleCloseModal={() => setIsOpen(false)} handleSubmit={handleSubmt} />
      </div>
      <LineDivider className="my-10" />
    </div>
  );
}
