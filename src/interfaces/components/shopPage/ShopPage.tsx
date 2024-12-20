import { poppins } from "@/interfaces/fonts/fonts";
import { ShopDevelop } from "@/services/api/dummyShop";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import Image from "next/image";
import ProductList from "./ProductList";
import LineDivider from "../dividers/LineDivider";
import { Product, ShopDetail } from "@/types/types";
import { format } from "date-fns";
import ItemNotFound from "../error/ItemNotFound";

interface ShopPageProps extends ShopDetail {
  totalRatings: number;
  averageRatings: number;
  products: Product[];
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
  products,
  totalRatings,
  averageRatings,
}: ShopPageProps) {
  const formatedDate = format(new Date(created_at), "dd MMMM yyyy");
  return (
    <main className="min-h-[90vh] p-10 tablet:p-15">
      <section>
        <div className="flex items-center gap-5 tablet:gap-10">
          <div className="h-[65px] tablet:h-[72px] aspect-square">
            <Image src={shop_image} width={60} height={60} alt="Shop Image" className="w-full h-full object-cover object-center rounded-full" />
          </div>
          <div className="h-full flex flex-col gap-2">
            <h3 className={`${poppins.className} font-bold capitalize`}>{shop_name}</h3>
            <span className="flex items-center text-xs tablet:text-base gap-2 text-dark-gray capitalize">
              <FaLocationDot /> {shop_address_city}
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
                : {shop_address_city}, {shop_address_province}
              </p>
              <p className="mb-5">: {shop_email}</p>
              <p className="mb-5">: {shop_phone_number}</p>
              <p className="mb-5">: {products.length} Products</p>
              <p className="mb-5">: {formatedDate}</p>
            </div>
          </div>
        </div>
        <LineDivider className="my-5" />
      </section>
      <section className="mt-10">
        <h2 className="text-xl tablet:text-[1.75rem] mb-5 tablet:mb-10">Products</h2>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="w-3/4 text-center text-dark-gray mt-5">This shop has not added any products yet</p>
          </div>
        )}
      </section>
    </main>
  );
}
