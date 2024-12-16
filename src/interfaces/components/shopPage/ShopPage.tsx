import { poppins } from "@/interfaces/fonts/fonts";
import { ShopDevelop } from "@/services/api/dummyShop";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import Image from "next/image";
import ProductList from "./ProductList";
import LineDivider from "../dividers/LineDivider";

interface ShopPageProps extends ShopDevelop {
  totalRatings: number;
  averageRatings: number;
}
export default function ShopPage({
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
}: ShopPageProps) {
  return (
    <main className="min-h-[90vh] p-10 tablet:p-15">
      <section>
        <div className="flex items-center gap-5 tablet:gap-10">
          <div className="h-[65px] tablet:h-[72px] aspect-square">
            <Image src={imageUrl} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
          </div>
          <div className="h-full flex flex-col gap-2">
            <h3 className={`${poppins.className} font-bold`}>{name}</h3>
            <span className="flex items-center text-xs tablet:text-base gap-2 text-dark-gray">
              <FaLocationDot /> {addressCity}
            </span>
          </div>
        </div>
        <div className="w-full h-[86px] tablet:h-55 bg-primary rounded-lg mt-10 flex items-center justify-center">
          <div className="flex items-center justify-center gap-10 tablet:gap-30">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 ">
                <FaStar className="text-lg text-yellow" />
                <p className="text-white font-semibold text-lg">
                  {averageRatings} ({totalRatings})
                </p>
              </div>
              <p className="text-white text-xs">Ratings & Reviews</p>
            </div>
            <div className="w-px h-15 bg-white"></div>
            <div className="text-white flex flex-col text-center justify-center">
              <div>
                <p className="font-semibold text-lg">
                  {openingHours} - {closingHours}
                </p>
              </div>
              <p className="text-xs">Operasional Hours</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Shop Description</h2>
          <p className="text-dark-gray">{description}</p>
        </div>
        <LineDivider className="my-5 tablet:my-10" />
        <div className="mt-5">
          <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Shop Information</h2>
          <div className="w-full flex">
            <div className="w-2/5">
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
        <LineDivider className="my-5" />
      </section>
      <section className="mt-10">
        <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Products</h2>
        <ProductList products={products} />
      </section>
    </main>
  );
}
