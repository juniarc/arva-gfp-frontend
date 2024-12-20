import Image from "next/image";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { poppins } from "@/interfaces/fonts/fonts";
import LineDivider from "../dividers/LineDivider";
import ShopInfoModal from "../modals/ShopInfoModal";
import { useState } from "react";
import { ReqShopBody, ShopDetail } from "@/types/types";
import { format } from "date-fns";
import uriHelpers from "@/utils/uriHelpers";

interface ShopInfoProps extends ShopDetail {
  totalRatings: number;
  averageRatings: number;
  totalProducts: number;
  handleEditShop: (value: ReqShopBody) => void;
  editShopStatus: "idle" | "loading" | "success" | "error";
}
export default function ShopPage({
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
  const formatedDate = format(new Date(created_at), "dd MMMM yyyy");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmt = (values: any) => {
    handleEditShop({ ...values });
  };

  const formatedShopnameForUrl = uriHelpers.formatStringForUrl(shop_name ?? "shop");

  return (
    <div>
      <div className="mb-15 w-full">
        <button onClick={() => setIsOpen(true)} className="px-15 py-5 font-bold text-white text-xs bg-primary rounded">
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
      <div className="flex items-center gap-5 tablet:gap-10">
        <div className="h-[65px] tablet:h-[72px] aspect-square">
          <Image src={shop_image} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
        </div>
        <div className="h-full flex flex-col gap-2">
          <a href={`/${formatedShopnameForUrl}-${shop_id}`} className={`${poppins.className} font-bold capitalize text-xl cursor-pointer`}>
            {shop_name}
          </a>
          <span className="flex items-center text-xs tablet:text-base gap-2 text-dark-gray capitalize">
            <FaLocationDot /> {shop_address_city}
          </span>
        </div>
      </div>
      <div className="w-full mt-10 flex items-center justify-center">
        <div className="flex w-full px-30 py-8 items-center justify-center gap-10 tablet:gap-30 bg-primary rounded-lg">
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
              : {shop_address_city.toLowerCase()}, {shop_address_province.toLowerCase()}
            </p>
            <p className="mb-5 lowercase">: {shop_email}</p>
            <p className="mb-5">: {shop_phone_number}</p>
            <p className="mb-5">: {totalProducts} Products</p>
            <p className="mb-5">: {formatedDate}</p>
          </div>
        </div>
      </div>
      <LineDivider className="my-10 tablet:my-10" />
    </div>
  );
}
