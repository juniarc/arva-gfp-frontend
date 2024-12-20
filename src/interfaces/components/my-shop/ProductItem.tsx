import { CreateDiscountBody, Discount, Product, ReqProductBody, Shop, Tag, Variant } from "@/types/types";
import Image from "next/image";
import { FaStar, FaRegTrashCan } from "react-icons/fa6";
import ManageProductModal, { ManageProductValuesProps } from "../modals/ManageProductModal";
import { useEffect, useMemo, useState } from "react";
import { convertCategoryIdToName, convertCategoryNameToId } from "@/utils/elementHelpers";
import api from "@/services/api/api";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";
import { format } from "date-fns";
import { LuX } from "react-icons/lu";
import TagModal from "../modals/TagModal";
import ConfirmationModal from "../modals/ConfirmationModal";

interface ProductItemProps {
  product_id: number;
  product_name: string;
  description: string;
  product_type: string;
  shipping_cost: number;
  created_at: string;
  sold: number;
  status: string;
  category: string;
  image: string[];
  variant: {
    variant_id: number;
    variant_name: string;
    variant_price: number;
    variant_stock: number;
    variant_unit: string;
  }[];
  tag: string[];
  discount: Discount[];
  ratings: string;
  shop: { shop_id: number; shop_address_city: string };
  token: string | undefined;
  getUpdateProductList: () => void;
}

export default function ProductItem({
  product_id,
  product_name,
  image,
  category,
  discount,
  ratings,
  sold,
  variant,
  product_type,
  description,
  shipping_cost,
  created_at,
  tag,
  shop,
  token,
  getUpdateProductList,
}: ProductItemProps) {
  const convertedCategoryId = useMemo(() => convertCategoryNameToId(category), [category]);
  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productItemValues, setProductItemValues] = useState({
    images: image,
    product_name: product_name,
    description: description,
    product_type: product_type,
    category_id: convertedCategoryId,
    shipping_cost: shipping_cost,
    variants: variant.map((item) => ({
      variant_name: item.variant_name.toLowerCase(),
      price: item.variant_price,
      stock: item.variant_stock,
      unit: item.variant_unit.toLowerCase(),
    })),
    shippingInfo: {
      packageWeight: 0,
      packageWidth: 0,
      packageLength: 0,
      packageHeight: 0,
      shippingCost: 0,
    },
    discount: discountValue || {
      discount_name: "",
      discount_value: 0,
      start_date: "",
      end_date: "",
      discount_type: "",
    },
  });

  const [manageProductStatus, setManageProductStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formatProductToLowerCase = (values: ReqProductBody): any => {
    return {
      product_name: values.product_name.toLowerCase(),
      category_id: values.category_id,
      // product_type: values.product_type.toLowerCase(),
      // images: values.images,
      // description: values.description.toLowerCase(),
      // variants: values.variants.map((variant) => ({
      //   variant_name: variant.variant_name.toLowerCase(),
      //   price: parseInt(String(variant.price).replace(/\./g, ""), 10),
      //   stock: variant.stock,
      //   unit: variant.unit.toLowerCase(),
      // })),
      // shipping_cost: values.shipping_cost,
    };
  };

  const formatDiscountToLowerCase = (values: CreateDiscountBody): CreateDiscountBody => {
    return {
      discount_name: values.discount_name.toLowerCase(),
      discount_type: "percentage",
      discount_value: values.discount_value,
      start_date: format(new Date(values.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(values.end_date), "yyyy-MM-dd"),
    };
  };

  const handleSubmit = async (values: any) => {
    setManageProductStatus("loading");
    const formatedBody = formatProductToLowerCase(values);
    try {
      const product = await api.editProduct(product_id, token, formatedBody);

      if (discountValue) {
        const formatedDiscountBody = formatDiscountToLowerCase(values.discount);
        await api.editDiscount(discountValue.discount_id, token, formatedDiscountBody);
      }

      setProductItemValues((prevState) => ({
        ...prevState,
        ...values,
      }));

      getUpdateProductList();

      setManageProductStatus("success");
      setTimeout(() => {
        setManageProductStatus("idle");
      }, 2000);
    } catch (error) {
      setManageProductStatus("error");
      setTimeout(() => {
        setManageProductStatus("idle");
      }, 2000);
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    setManageProductStatus("loading");
    try {
      await api.deleteProduct(product_id, token);

      getUpdateProductList();

      setManageProductStatus("success");
      setTimeout(() => {
        setManageProductStatus("idle");
      }, 2000);
    } catch (error) {
      setManageProductStatus("error");
      setTimeout(() => {
        setManageProductStatus("idle");
      }, 2000);
    }
  };

  const convertedCategory = useMemo(() => convertCategoryIdToName(productItemValues.category_id), [category]);

  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [productTags, setProductTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number>(0);

  useEffect(() => {
    const getProductTags = async () => {
      const tags = await api.getTagsProductByProductId(product_id, token);
      setProductTags(tags);
    };
    getProductTags();
  }, []);

  const setNewTag = (newTag: Tag) => {
    setProductTags((prevState) => [...prevState, newTag]);
    setTagModalOpen(false);
  };

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleDeleteTag = async () => {
    try {
      setProductTags((prevState) => prevState.filter((item) => item.tag_id !== selectedTagId));
      await api.deleteProductTag(product_id, token, selectedTagId);
    } catch (error) {
      alert("Fail delete tag product");
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  return (
    <div className="bg-white shadow desktop:shadow-lg rounded-lg w-full min-h-[322px] p-5 flex gap-10 desktop:p-10">
      <div>
        <div className="w-[64px] tablet:w-[122px] desktop:w-[180px] aspect-square">
          <Image
            src={productItemValues.images[0]}
            className="w-full h-full object-cover object-center rounded"
            alt="Product Image"
            width={224}
            height={176}
          />
        </div>
      </div>
      <div className="desktop:flex desktop:justify-between">
        <div>
          <p className="capitalize font-semibold text-xs tablet:text-base desktop:text-xl">{productItemValues.product_name}</p>
          <table className="desktop:w-full table-fixed text-xs tablet:text-[0.9375rem] desktop:text-base w-full mt-5 border-separate border-spacing-y-5">
            <tbody>
              <tr>
                <td className="text-dark-gray">Type</td>
                <td className="font-semibold capitalize">: {productItemValues.product_type}</td>
              </tr>
              <tr>
                <td className="text-dark-gray">Category</td>
                <td className="font-semibold capitalize">: {convertedCategory}</td>
              </tr>
              <tr>
                <td className="text-dark-gray">Avaible Variants</td>
                <td className="font-semibold">
                  <ul>
                    {productItemValues.variants.map((item, index) => {
                      const formattedPrice = Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(item.price);

                      return (
                        <li key={index}>
                          <div className="border-b border-b-gray py-3">
                            <p className="text-xs mb-1 tablet:mb-5 tablet:text-[0.9375rem] desktop:text-base capitalize">{item.variant_name}</p>
                            <p className="text-xs mb-1 tablet:mb-5 tablet:text-[0.9375rem] desktop:text-base">{formattedPrice}</p>
                            <p className="text-xs tablet:text-[0.9375rem] desktop:text-base">
                              Stocks: {item.stock} <span className="text-dark-gray font-normal">({item.unit})</span>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="text-dark-gray">Active Discount</td>
                <td className="font-semibold">: {discountValue?.discount_value ?? 0} %</td>
              </tr>
              <tr>
                <td className="text-dark-gray border-t border-t-gray py-5">Sold</td>
                <td className="font-semibold border-t border-t-gray py-5">
                  : {sold}
                  {/* <span className="text-dark-gray font-normal">({unit})</span> */}
                </td>
              </tr>
              <tr>
                <td className="text-dark-gray">Rating</td>
                <td className="font-semibold flex gap-2">
                  :
                  <span className="flex items-center gap-2">
                    <FaStar className="text-yellow" /> <span className="pt-1">{ratings ?? 0}</span>
                    <span className="text-dark-gray font-normal">(10)</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td className="text-dark-gray border-t border-t-gray py-5">Tags / Keywords</td>
                <td className="font-semibold flex gap-2 border-t border-t-gray py-5">
                  <div className="desktop flex flex-wrap items-center gap-5">
                    {productTags &&
                      productTags.map((tag, index) => (
                        <div key={index} className="bg-gray rounded px-5 tablet:py-2 desktop:py-3 flex items-center gap-5 mb-3 desktop:mb-0 w-fit">
                          <p className="text-[0.5rem] tablet:text-xs desktop:text-sm">{tag.tag_name}</p>
                          <button
                            onClick={() => {
                              setConfirmationModalOpen(true);
                              setSelectedTagId(tag.tag_id);
                            }}
                            className="text-[0.5rem] tablet:text-xs hover:bg-red text-red hover:text-white"
                          >
                            <LuX className="desktop:text-sm" />
                          </button>
                        </div>
                      ))}
                    <button
                      onClick={() => setTagModalOpen(true)}
                      className="text-primary rounded px-5 tablet:py-2 desktop:py-3 items-center bg-secondary text-[0.5rem] tablet:text-xs desktop:text-sm hover:bg-primary hover:text-white transition-colors font-semibold"
                    >
                      + Tag
                    </button>
                    <TagModal
                      isOpen={isTagModalOpen}
                      handleCloseModal={() => setTagModalOpen(false)}
                      setNewTag={setNewTag}
                      product_id={product_id}
                      token={token}
                    />
                    <ConfirmationModal
                      handleCloseModal={() => setConfirmationModalOpen(false)}
                      message="Are you sure want to delete tag?"
                      isOpen={isConfirmationModalOpen}
                      handleSubmit={handleDeleteTag}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-5 mt-5 tablet:h-24 desktop:min-w-fit">
          <button
            onClick={() => setDeleteModal(true)}
            className="border rounded border-red p-3 tablet:w-24 tablet:h-24 desktop:h-24 desktop:w-24 flex items-center justify-center"
          >
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
              manageProductStatus={manageProductStatus}
            />
            <ConfirmationModal
              handleCloseModal={() => setIsOpen(false)}
              handleSubmit={handleDelete}
              message="Are you sure wanted to delete this product ?"
              isOpen={deleteModal}
            />
          </div>
        </div>
      </div>
      <SuccessAlert isOpen={manageProductStatus === "success"} text="Success Update Product" />
      <FailAlert isOpen={manageProductStatus === "error"} text="Failed" />
    </div>
  );
}
