import { ShopDevelop } from "@/services/api/dummyShop";
import Image from "next/image";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { poppins } from "@/interfaces/fonts/fonts";
import LineDivider from "../../dividers/LineDivider";
import { shippingOptions } from "@/services/fixedData";
import ShopInfoModal from "../../modals/ShopInfoModal";
import { useEffect, useState } from "react";
import { ReqShopBody, ShopDetail } from "@/types/types";
import { format } from "date-fns";

interface ShopInfoProps extends ShopDetail {
  totalRatings: number;
  averageRatings: number;
  totalProducts: number;
  handleEditShop: (value: ReqShopBody) => void;
  editShopStatus: "idle" | "loading" | "success" | "error";
}

export default function ShopInfoDesktop({
  shop_name,
  shop_image,
  description,
  shop_address_province,
  shop_address_city,
  shop_address_district,
  shop_address_subdistrict,
  shop_address_street,
  shop_zip_code,
  shop_email,
  shop_id,
  shop_phone_number,
  created_at,
  totalProducts,
  totalRatings,
  averageRatings,
  editShopStatus,
  handleEditShop,
}: ShopInfoProps) {
  const formatedDate = format(new Date(created_at), "dd MMMM yyyy");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialValues = {
    shop_id,
    shop_name,
    description,
    shop_address_province,
    shop_address_city,
    shop_address_district,
    shop_address_subdistrict,
    shop_address_street,
    shop_zip_code,
    shop_email,
    shop_phone_number,
    shop_image,
  };

  const handleSubmt = (values: any) => {
    handleEditShop({ ...values });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="h-[65px] tablet:h-[72px] aspect-square">
            <Image src={shop_image} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
          </div>
          <div className="h-full flex flex-col gap-2">
            <h3 className={`${poppins.className} font-bold capitalize`}>{shop_name}</h3>
            <span className="flex items-center gap-2 text-dark-gray capitalize">
              <FaLocationDot /> {shop_address_city}
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
            <p className="mb-5 capitalize">
              : {shop_address_city}, {shop_address_province}
            </p>
            <p className="mb-5 lowecase">: {shop_email}</p>
            <p className="mb-5 ">: {shop_email}</p>
            <p className="mb-5 ">: {totalProducts} Products</p>
            <p className="mb-5 ">: {formatedDate}</p>
          </div>
        </div>
      </div>
      <div className="mb-15 mt-10">
        <button onClick={() => setIsOpen(true)} className="px-15 py-5 font-bold text-white bg-primary rounded">
          Edit Shop Info
        </button>
        <ShopInfoModal
          editShopStatus={editShopStatus}
          initialValues={initialValues}
          isOpen={isOpen}
          handleCloseModal={() => setIsOpen(false)}
          handleSubmit={handleSubmt}
        />
      </div>
      <LineDivider className="my-10" />
    </div>
  );
}
