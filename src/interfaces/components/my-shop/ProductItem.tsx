import { Product } from "@/types/types";
import Image from "next/image";
import LineDivider from "../dividers/LineDivider";
import { FaStar, FaRegTrashCan } from "react-icons/fa6";
import ManageProductModal from "../modals/ManageProductModal";
import { useState } from "react";

export default function ProductItem({
  id,
  name,
  price,
  description,
  imageUrl,
  category,
  discount,
  shop,
  rating,
  sold,
  variants,
  stocks,
  unit,
  shippingInfo,
  tags,
}: Product) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productItemValues, setProductItemValues] = useState({
    imageUrl: imageUrl,
    name: name,
    description: description,
    category: category,
    price: price,
    stocks: stocks,
    unit: unit,
    discount: discount,
    // variants: variants[].name ?? '',
    shippingInfo: {
      packageWeight: shippingInfo.packageWeight,
      packageHeight: shippingInfo.packageHeight,
      packageWidth: shippingInfo.packageWidth,
      packageLength: shippingInfo.packageLength,
      shippingFee: shippingInfo.shippingFee,
    },
    tags: tags,
  });

  const handleSubmit = (values: any) => {
    setProductItemValues({ ...values });
  };
  return (
    <div className="bg-white shadow desktop:shadow-lg rounded-lg w-full min-h-[322px] p-5 flex gap-10 desktop:p-10">
      <div>
        <div className="w-[64px] tablet:w-[122px] desktop:w-[180px] aspect-square">
          <Image src={imageUrl[0]} className="w-full h-full object-cover object-center rounded" alt="Product Image" width={224} height={176} />
        </div>
      </div>
      <div className="desktop:flex desktop:justify-between">
        <div>
          <p className="capitalize font-semibold text-xs tablet:text-base desktop:text-xl">{name}</p>
          <table className="desktop:w-1/2 table-fixed text-xs tablet:text-[0.9375rem] desktop:text-base w-full mt-5 border-separate border-spacing-y-5">
            <tbody>
              <tr>
                <td className="text-dark-gray">Type</td>
                <td className="font-semibold">: Organic</td>
              </tr>
              <tr>
                <td className="text-dark-gray">Price</td>
                <td className="font-semibold">: {price}</td>
              </tr>
              <tr>
                <td className="text-dark-gray">Category</td>
                <td className="font-semibold">: {category}</td>
              </tr>
              <tr>
                <td className="text-dark-gray">Avaible Variants</td>
                <td className="font-semibold">
                  <ul>
                    {variants.map((variant, index) => (
                      <li key={index}>
                        <div className="border-b border-b-gray py-3">
                          <p className="text-xs mb-1 tablet:mb-5 tablet:text-[0.9375rem] desktop:text-base">{variant.name}</p>
                          <p className="text-xs mb-1 tablet:mb-5 tablet:text-[0.9375rem] desktop:text-base">Rp. {variant.price}</p>
                          <p className="text-xs tablet:text-[0.9375rem] desktop:text-base">
                            Stocks: 50 <span className="text-dark-gray font-normal">({unit})</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="text-dark-gray">Active Discount</td>
                <td className="font-semibold">: {discount} %</td>
              </tr>
              <tr>
                <td className="text-dark-gray border-t border-t-gray py-5">Sold</td>
                <td className="font-semibold border-t border-t-gray py-5">
                  : {sold} <span className="text-dark-gray font-normal">({unit})</span>
                </td>
              </tr>
              <tr>
                <td className="text-dark-gray">Rating</td>
                <td className="font-semibold flex gap-2">
                  :
                  <span className="flex items-center gap-2">
                    <FaStar className="text-yellow" /> <span className="pt-1">{rating}</span> <span className="text-dark-gray font-normal">(10)</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-5 mt-5 tablet:h-24 desktop:min-w-fit">
          <button className="border rounded border-red p-3 tablet:w-24 tablet:h-24 desktop:h-24 desktop:w-24 flex items-center justify-center">
            <FaRegTrashCan className="text-red tablet:text-2xl desktop:text-2xl" />
          </button>
          <div className="h-15">
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs tablet:text-[0.9375rem] desktop:text-base font-semibold text-white bg-primary h-15 tablet:h-fit desktop:h-fit px-10 py-1 tablet:py-8 desktop:py-6 rounded"
            >
              Edit Product
            </button>
            <ManageProductModal
              isOpen={isOpen}
              handleCloseModal={() => setIsOpen(false)}
              initialValues={productItemValues}
              handleSubmit={handleSubmit}
              handlePrev={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
