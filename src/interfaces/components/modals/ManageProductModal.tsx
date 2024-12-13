import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, boolean, array } from "yup";
import { Dialog, DialogBody, Input, Option, Select, Spinner, Textarea } from "@material-tailwind/react";
import { customeTheme } from "@/interfaces/theme/customTheme";
import dynamic from "next/dynamic";
import { avaibleCategories, shippingOptions } from "@/services/fixedData";
import LineDivider from "../dividers/LineDivider";
import { Product, ShippingInfo } from "@/types/types";
import Image from "next/image";
import { LuX } from "react-icons/lu";
import { formatPrice } from "@/utils/elementHelpers";

export interface ProductFormValueProps {
  imageUrl: string[];
  name: string;
  description: string;
  category: string;
  price: number;
  stocks: number;
  unit: string;
  discount: number;
  //   variants: string[];
  shippingInfo: {
    packageWeight: number;
    packageHeight: number;
    packageWidth: number;
    packageLength: number;
    shippingFee: number;
  };
  tags: string[];
}
interface ManageProductModalProps {
  initialValues: ProductFormValueProps;
  handleSubmit: (values: ProductFormValueProps) => void;
  handlePrev: (values: ProductFormValueProps) => void;
  isOpen: boolean;
  handleCloseModal: () => void;
}
const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function ManageProductModal({ initialValues, handleSubmit, handlePrev, isOpen, handleCloseModal }: ManageProductModalProps) {
  const [imageUrls, setImagUrls] = useState<string[]>([]);

  const validationSchema = object().shape({
    imageUrl: array().of(string().required("Image cannot be empty")).max(5, "You can only upload up to 5 images"),
    name: string()
      .min(3, "Product name must be at least 3 characters")
      .max(100, "Product name cannot exceed 100 characters")
      .required("Product name is required"),
    description: string().max(500, "Description cannot exceed 500 characters").required("Description is required"),
    category: string().required("Category is required"),
    price: number().min(0, "Price must be a positive value").required("Price is required"),
    stocks: number().min(0, "Stocks must be a positive value").required("Stocks are required"),
    unit: string().required("Unit is required"),
    discount: number().max(100, "Discount cannot exceed 100%"),
    // variants: array().of(string().required("Variant cannot be empty")).min(1, "At least one variant is required"),
    shippingInfo: object().shape({
      packageWeight: number().min(0, "Package weight must be a positive value").required("Package weight is required"),
      packageHeight: number().min(0, "Package height must be a positive value").required("Package height is required"),
      packageWidth: number().min(0, "Package width must be a positive value").required("Package width is required"),
      packageLength: number().min(0, "Package length must be a positive value").required("Package length is required"),
      shippingFee: number().min(0, "Shipping fee must be a positive value").required("Shipping fee is required"),
    }),
    tags: array().of(string().required("Tags cannot be empty")).min(1, "At least one tag is required"),
  });

  const calculateShippingFee = (shippingInfo: ShippingInfo) => {
    const DIMENSIONAL_FACTOR = 4000;
    const BASE_RATE_PER_KG = 2000;
    const { packageWeight, packageWidth, packageLength, packageHeight } = shippingInfo;

    const dimensionalWeight = (packageHeight * packageWidth * packageLength) / DIMENSIONAL_FACTOR;

    const chargeableWeight = Math.max(packageWeight, dimensionalWeight);

    const shippingFee = chargeableWeight * BASE_RATE_PER_KG;

    return formatPrice(parseFloat(shippingFee.toFixed(2)).toString());
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, values: any, setFieldValue: (field: string, value: any) => void) => {
    const files = event.target.files;
    if (files) {
      const updatedUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          updatedUrls.push(base64String);

          if (updatedUrls.length === files.length) {
            setFieldValue("imageUrl", [...values.imageUrl, ...updatedUrls]);
          }
        };

        reader.onerror = (error) => {
          console.log(error);
        };

        reader.readAsDataURL(file);
      });
    }
  };
  const handleRemoveImage = (index: number, values: any, setFieldValue: (field: string, value: any) => void) => {
    const updatedUrls = values.imageUrl.filter((_, i) => i !== index);
    setFieldValue("imageUrl", updatedUrls);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>, currentTags: string[], setFieldValue: (field: string, value: any) => void) => {
    const { value } = e.target;

    if (e.type === "blur" && value.trim() !== "") {
      setFieldValue("tags", [...currentTags, value.trim()]);
      e.target.value = "";
    }
  };
  return (
    <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15">
      <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
        <LuX className="tablet:text-[2rem]" />
      </button>
      <DialogBody className="text-black font-normal max-h-[70vh] overflow-y-auto">
        <div className="mt-10 ">
          <h5 className="font-bold text-center w-full mb-10 ">Shop Information</h5>
          <div>
            <DynamicThemeProvider value={customeTheme}>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                  <Form className="flex flex-col justify-between min-h-[70svh]">
                    <div className="flex flex-col gap-15">
                      <div className="relative">
                        <div className="realtive">
                          <div className="flex justify-between text-xs text-dark-gray mb-10">
                            <p>Product Media (Max. 5 Photos)</p>
                            <p>
                              <span>*</span>Ratio will be 1:1
                            </p>
                          </div>
                          <div className="flex gap-5 flex-wrap">
                            {values.imageUrl &&
                              values.imageUrl.map((imageUrl: string, index: number) => (
                                <div key={index} className="w-25 h-25 border border-dark-gray rounded relative">
                                  <Image
                                    src={imageUrl}
                                    width={50}
                                    height={50}
                                    className="w-full h-full object-cover object-center rounded"
                                    alt="Product Image"
                                  />
                                  <span
                                    onClick={() => handleRemoveImage(index, values, setFieldValue)}
                                    className="absolute -top-2 -right-2 min-w-6 min-h-6 flex items-center justify-center bg-dark-gray text-white rounded-full text-[0.5rem]"
                                  >
                                    <LuX />
                                  </span>
                                </div>
                              ))}
                            {values.imageUrl.length <= 5 && (
                              <div>
                                <label htmlFor="uploadImage">
                                  <div className="w-25 h-25 overflow-hidden rounded border-dashed border-red border flex items-center justify-center p-2">
                                    <span className="text-red text-[0.5rem] text-center">Add Photo</span>
                                  </div>
                                </label>
                                <input
                                  id="uploadImage"
                                  type="file"
                                  name="imageUrl"
                                  multiple
                                  accept="image/*"
                                  onChange={(event) => handleFileChange(event, values, setFieldValue)}
                                  className="hidden"
                                />
                              </div>
                            )}

                            <p className={`text-red absolute top-full ${errors.imageUrl ? "visible" : ""}`}>
                              <ErrorMessage name="imageUrl" />
                            </p>
                          </div>
                        </div>
                        <div className="relative mt-10">
                          <Input
                            name="name"
                            label="Product Name"
                            value={values.name}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            maxLength={200}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.name ? "visible" : ""}`}>
                            <ErrorMessage name="name" />
                          </p>
                          <div className="w-full flex justify-end mt-2">
                            <span className="text-xs tablet:text-sm text-dark-gray">
                              {values.name.length}/{200}
                            </span>
                          </div>
                        </div>
                        <div className="relative mt-5">
                          <Textarea
                            name="description"
                            label="Product Description"
                            value={values.description}
                            onChange={handleChange}
                            maxLength={3000}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.description ? "visible" : ""}`}>
                            <ErrorMessage name="name" />
                          </p>
                          <div className="w-full flex justify-end mt-2">
                            <span className="text-xs tablet:text-sm text-dark-gray">
                              {values.description.length}/{3000}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5">
                          <Select
                            name="category"
                            onChange={(value) => {
                              setFieldValue("category", value);
                            }}
                            label="Select Category"
                            className=" capitalize "
                          >
                            {avaibleCategories.map((category: any, index: number) => (
                              <Option value={category} className="capitalize" key={index}>
                                {category}
                              </Option>
                            ))}
                          </Select>
                        </div>
                        <LineDivider className="mt-10" />
                        <div className="mt-10">
                          <Input
                            name="unit"
                            label="Product Unit"
                            value={values.unit}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="unit" />
                          </p>
                        </div>
                        <div className="mt-5">
                          <p className="text-xs mb-2 text-dark-gray">Price</p>
                          <div className="flex">
                            <div className="h-20 rounded-s-md flex items-center justify-center bg-gray px-5">
                              <span className="font-semibold text-sm">Rp.</span>
                            </div>
                            <input
                              name="price"
                              inputMode="numeric"
                              placeholder="0"
                              value={values.price}
                              onChange={(e) => {
                                const formatedPrice = formatPrice(e.target.value);
                                setFieldValue("price", formatedPrice);
                              }}
                              className="text-sm w-full h-20 border border-blue-gray-200 rounded-e-md px-5 text-md focus:outline-none"
                            />
                          </div>
                          <p className={`text-red absolute top-full ${errors.price ? "visible" : ""}`}>
                            <ErrorMessage name="price" />
                          </p>
                        </div>
                        <div className="mt-10">
                          <Input
                            type="number"
                            name="stocks"
                            label="Stocks"
                            placeholder="0"
                            value={values.stocks}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="stocks" />
                          </p>
                        </div>
                        <LineDivider className="mt-10" />
                        <p className="mt-10 font-semibold text-sm">Shipping Fee</p>
                        <div className="mt-10">
                          <Input
                            type="number"
                            name="shippingInfo.packageWeight"
                            label="Package Weight (Kg)"
                            placeholder="0"
                            value={values.shippingInfo.packageWeight}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="shippingInfo.packageWeight" />
                          </p>
                        </div>
                        <div className="mt-10">
                          <Input
                            type="number"
                            name="shippingInfo.packageWidth"
                            label="Package Width (cm)"
                            placeholder="0"
                            value={values.shippingInfo.packageWidth}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="shippingInfo.packageWidth" />
                          </p>
                        </div>
                        <div className="mt-10">
                          <Input
                            type="number"
                            name="shippingInfo.packageHeight"
                            label="Package Height (cm)"
                            placeholder="0"
                            value={values.shippingInfo.packageHeight}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="shippingInfo.packageHeight" />
                          </p>
                        </div>
                        <div className="mt-10">
                          <Input
                            type="number"
                            name="shippingInfo.packageLength"
                            label="Package Length (cm)"
                            placeholder="0"
                            value={values.shippingInfo.packageLength}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="shippingInfo.packageLength" />
                          </p>
                        </div>
                        <div className="mt-5">
                          <p className="text-xs mb-2 text-dark-gray">Package Fee</p>
                          <div className="flex">
                            <div className="h-20 rounded-s-md flex items-center justify-center bg-gray px-5">
                              <span className="font-semibold text-sm">Rp.</span>
                            </div>
                            <div className="w-full h-20 border border-blue-gray-200 rounded-e-md px-5 text-sm flex items-center">
                              <p>{calculateShippingFee(values.shippingInfo)}</p>
                            </div>
                          </div>
                        </div>
                        <LineDivider className="mt-10" />
                        <div className="mt-10">
                          <Input
                            type="number"
                            name="discount"
                            label="Product Discount (%)"
                            placeholder="0"
                            value={values.discount}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="discount" />
                          </p>
                        </div>
                        <LineDivider className="mt-10" />
                        <div className="mt-10">
                          <p className="font-semibold text-sm">Tags / Keywords</p>
                          <div className="w-full h-fit border flex-wrap border-blue-gray-200 rounded-md px-5 py-5 text-sm flex items-center gap-5 mt-3">
                            {values.tags &&
                              values.tags.map((tag, index) => (
                                <div key={index} className="bg-gray rounded px-5 flex items-center gap-5">
                                  <p className="text-sm">{tag}</p>
                                  <button className="text-sm">
                                    <LuX />
                                  </button>
                                </div>
                              ))}
                            <input
                              type="text"
                              name="tags"
                              placeholder="Add tags"
                              className="text-sm"
                              onBlur={(e) => handleTagChange(e, values.tags, setFieldValue)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleTagChange(e as any, values.tags, setFieldValue);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-10 flex justify-between gap-5">
                      <button onClick={() => handlePrev(values)} className="w-full border-gray border rounded font-semibold py-3">
                        Prev
                      </button>
                      <button type="submit" className="w-full bg-primary text-white rounded font-semibold py-3">
                        Next
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DynamicThemeProvider>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
