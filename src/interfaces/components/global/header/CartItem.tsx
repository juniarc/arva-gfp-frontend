import Image from "next/image";
import React from "react";
import dummyPhotoProduct from "@/../public/images/dummy-photo-product.jpg";
import LineDivider from "../../dividers/LineDivider";

export default function CartItem() {
  return (
    <>
      <div className="w-full flex gap-5 items-start">
        <div className="w-15 min-w-15 h-15 overflow-hidden">
          <Image src={dummyPhotoProduct} alt="Product Image" className="w-full h-full object-cover object-center rounded" />
        </div>
        <div className="text-[0.625rem] w-full overflow-hidden">
          <p className="max-w-full truncate">Product Name NameName Name Name</p>
          <p className=" text-dark-gray">Variants</p>
          <p className="font-bold">1 x Rp. 1000</p>
        </div>
      </div>
      <LineDivider className="mt-5" />
    </>
  );
}
