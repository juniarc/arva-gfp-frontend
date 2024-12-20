import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import { object, string, number, boolean, array, date } from "yup";
import { Input, Option, Select, Spinner, Textarea, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { customeTheme } from "@/interfaces/theme/customTheme";
import dynamic from "next/dynamic";
import { avaibleCategories, avaibleProductType, shippingOptions } from "@/services/fixedData";
import LineDivider from "../dividers/LineDivider";
import { CreateDiscountBody, Discount, Product, ReqProductBody, ShippingInfo } from "@/types/types";
import Image from "next/image";
import { LuX } from "react-icons/lu";
import { formatPrice } from "@/utils/elementHelpers";
import { format } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const DatePicker = ({ name, selectedDate, onDateChange, label }) => {
  return (
    <div className="mt-10">
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            label={label}
            value={selectedDate ? format(new Date(selectedDate), "yyyy-MM-dd") : ""}
            onChange={() => null} // Input tidak digunakan untuk mengubah nilai langsung
            crossOrigin={undefined}
          />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => onDateChange(date)} // Memperbarui nilai
            showOutsideDays
            className="border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface UploadProductValuesTypes extends ReqProductBody {
  discount: CreateDiscountBody | undefined;
  shippingInfo: ShippingInfo;
}
interface UploadProductFormProps {
  initialValues: UploadProductValuesTypes;
  handleSubmit: (values: UploadProductValuesTypes) => void;
  handlePrev: (values: UploadProductValuesTypes) => void;
}
const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function UploadProductForm({ initialValues, handleSubmit, handlePrev }: UploadProductFormProps) {
  const [imageUrls, setImagUrls] = useState<string[]>([]);

  const validationSchema = object().shape({
    images: array().of(string().required("Image cannot be empty")).max(5, "You can only upload up to 5 images"),
    product_name: string()
      .min(3, "Product name must be at least 3 characters")
      .max(100, "Product name cannot exceed 100 characters")
      .required("Product name is required"),
    description: string().max(500, "Description cannot exceed 500 characters").required("Description is required"),
    product_type: string().required("Product type is required"),
    shipping_cost: number(),
    category_id: number().required("Category is required"),
    variants: array()
      .of(
        object().shape({
          variant_name: string().required("Variant name is required").min(2, "Variant name must be at least 2 characters"),
          price: number().required("Price is required").min(1, "Price must be greater than 0"),
          stock: number().required("Stock is required").min(0, "Stock cannot be negative"),
          unit: string().required("Unit is required").min(1, "Unit cannot be empty"),
        }),
      )
      .min(1, "At least one variant is required"),
    discount: object().shape({
      discount_name: string().required("Discount name is required").min(3, "Discount name must be at least 3 characters"),
      discount_value: number().required("Discount value is required").min(0, "Discount value cannot be negative"),
      start_date: date().required("Start Date is required").typeError("Start Date is not valid"),
      end_date: date()
        .required("End Date is required")
        .typeError("End Date is not valid")
        .test("is-later", "End Date can not less than Start Date", function (value) {
          const { start_date } = this.parent;
          return !value || new Date(value) >= new Date(start_date); // validate start_date < end_date
        }),
    }),
    shippingInfo: object().shape({
      packageWeight: number().required("Package Weight is required").min(0, "Package Weight cannot be negative"),
      packageHeight: number().required("Package Height is required").min(0, "Package Height cannot be negative"),
      packageWidth: number().required("Package Width is required").min(0, "Package Width cannot be negative"),
      packageLength: number().required("Package Length is required").min(0, "Package Length cannot be negative"),
      shippingCost: number().required("Shipping Fee is required").min(0, "Shipping Fee cannot be negative"),
    }),
  });

  const calculateShippingFee = (shippingInfo: ShippingInfo) => {
    const DIMENSIONAL_FACTOR = 4000;
    const BASE_RATE_PER_KG = 2000;
    const { packageWeight, packageWidth, packageLength, packageHeight } = shippingInfo;

    const dimensionalWeight = (packageHeight * packageWidth * packageLength) / DIMENSIONAL_FACTOR;

    const chargeableWeight = Math.max(packageWeight, dimensionalWeight);

    const shippingFee = chargeableWeight * BASE_RATE_PER_KG;

    return shippingFee;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, values: any, setFieldValue: (field: string, value: any) => void) => {
    const MAX_FILE_SIZE = 500 * 1024; //500kb
    const files = event.target.files;
    if (files) {
      const updatedUrls: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          alert(`File "${file.name}" Too big. Maximum file size is 500 KB.`);
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          updatedUrls.push(base64String);

          if (updatedUrls.length === files.length) {
            setFieldValue("images", [...values.images, ...updatedUrls]);
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
    const updatedUrls = values.images.filter((_, i) => i !== index);
    setFieldValue("images", updatedUrls);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>, currentTags: string[], setFieldValue: (field: string, value: any) => void) => {
    const { value } = e.target;

    if (e.type === "blur" && value.trim() !== "") {
      setFieldValue("tags", [...currentTags, value.trim()]);
      e.target.value = "";
    }
  };
  return (
    <div className="mt-10 ">
      <h5 className="font-bold text-center w-full mb-10 ">Shop Information</h5>
      <div>
        <DynamicThemeProvider value={customeTheme}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              try {
                validationSchema.validateSync(values, { abortEarly: false });
                handleSubmit(values);
              } catch (error) {
                console.error("Validation error:", error);
              }
            }}
          >
            {({ errors, touched, values, handleChange, setFieldValue }) => {
              useEffect(() => {
                const shippingFee = calculateShippingFee(values.shippingInfo);
                setFieldValue("shipping_cost", shippingFee);
                setFieldValue("shippingInfo.shippingCost", shippingFee);
              }, [
                values.shippingInfo.packageWeight,
                values.shippingInfo.packageWidth,
                values.shippingInfo.packageHeight,
                values.shippingInfo.packageLength,
                setFieldValue,
              ]);
              return (
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
                          {values.images &&
                            values.images.map((imageUrl: string, index: number) => (
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
                          {values.images.length <= 5 && (
                            <div>
                              <label htmlFor="uploadImage">
                                <div className="w-25 h-25 overflow-hidden rounded border-dashed border-red border flex items-center justify-center p-2">
                                  <span className="text-red text-[0.5rem] text-center">Add Photo</span>
                                </div>
                              </label>
                              <input
                                id="uploadImage"
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                onChange={(event) => handleFileChange(event, values, setFieldValue)}
                                className="hidden"
                              />
                            </div>
                          )}

                          <p className={`text-red absolute top-full ${errors.images ? "visible" : ""}`}>
                            <ErrorMessage name="images" />
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-10">
                        <Input
                          name="product_name"
                          label="Product Name"
                          value={values.product_name}
                          onChange={handleChange}
                          crossOrigin={undefined}
                          maxLength={200}
                          className="tablet:text-base "
                        />
                        <p className={`text-red absolute top-full ${errors.product_name ? "visible" : ""}`}>
                          <ErrorMessage name="name" />
                        </p>
                        <div className="w-full flex justify-end mt-2">
                          <span className="text-xs tablet:text-sm text-dark-gray">
                            {values.product_name.length}/{200}
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
                          <ErrorMessage name="description" />
                        </p>
                        <div className="w-full flex justify-end mt-2">
                          <span className="text-xs tablet:text-sm text-dark-gray">
                            {values.description.length}/{3000}
                          </span>
                        </div>
                      </div>
                      <div className="mt-5">
                        <Select
                          name="category_id"
                          onChange={(value) => {
                            setFieldValue("category_id", value);
                          }}
                          label="Select Category"
                          className=" capitalize "
                        >
                          {avaibleCategories.map((category: any, index: number) => (
                            <Option value={category.category_id} className="capitalize" key={index}>
                              {category.category_name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="mt-10">
                        <Select
                          name="product_type"
                          onChange={(value) => {
                            setFieldValue("product_type", value);
                          }}
                          label="Select Product Type"
                          className=" capitalize "
                        >
                          {avaibleProductType.map((type: any, index: number) => (
                            <Option value={type} className="capitalize" key={index}>
                              {type}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <LineDivider className="mt-10" />
                      <div className="mt-5">
                        <p className="font-semibold">Product Variants</p>
                        <FieldArray name="variants">
                          {({ push, remove }) => (
                            <>
                              {values.variants.map((variant, index) => (
                                <div key={index}>
                                  <div className="relative mt-10">
                                    <Input
                                      name={`variants[${index}].variant_name`}
                                      label="Variant Name"
                                      value={variant.variant_name}
                                      onChange={handleChange}
                                      crossOrigin={undefined}
                                      maxLength={20}
                                      className="tablet:text-base "
                                    />
                                    <p className={`text-red absolute top-full`}>
                                      <ErrorMessage name={`variants[${index}].variant_name`} />
                                    </p>
                                    <div className="w-full flex justify-end mt-2">
                                      <span className="text-xs tablet:text-sm text-dark-gray">
                                        {variant.variant_name.length}/{20}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs mb-2 text-dark-gray">Variant Price</p>
                                    <div className="flex">
                                      <div className="h-20 rounded-s-md flex items-center justify-center bg-gray px-5">
                                        <span className="font-semibold text-sm">Rp.</span>
                                      </div>
                                      <input
                                        name={`variants[${index}].price`}
                                        inputMode="numeric"
                                        placeholder="0"
                                        value={variant.price}
                                        onChange={(e) => {
                                          const formatedPrice = formatPrice(e.target.value);
                                          setFieldValue(`variants[${index}].price`, formatedPrice);
                                        }}
                                        className="text-sm w-full h-20 border border-blue-gray-200 rounded-e-md px-5 text-md focus:outline-none"
                                      />
                                    </div>
                                    <p className={`text-red absolute top-full`}>
                                      <ErrorMessage name={`variants[${index}].variant_name`} />
                                    </p>
                                  </div>
                                  <div className="mt-10">
                                    <Input
                                      type="number"
                                      name={`variants[${index}].stock`}
                                      label="Stocks"
                                      placeholder="0"
                                      value={variant.stock}
                                      onChange={handleChange}
                                      crossOrigin={undefined}
                                      className="tablet:text-base "
                                    />
                                    <p className={`text-red absolute top-full`}>
                                      <ErrorMessage name={`variants[${index}].stock`} />
                                    </p>
                                  </div>
                                  <div className="mt-10">
                                    <Input
                                      name={`variants[${index}].unit`}
                                      label="Unit"
                                      value={variant.unit}
                                      onChange={handleChange}
                                      crossOrigin={undefined}
                                      className="tablet:text-base "
                                    />
                                    <p className={`text-red absolute top-full`}>
                                      <ErrorMessage name={`variants[${index}].unit`} />
                                    </p>
                                  </div>
                                  {values.variants.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="mt-5 rounded border border-red text-red px-8 py-2 text-xs"
                                    >
                                      Delete Variant
                                    </button>
                                  )}
                                </div>
                              ))}
                              <div className="w-full flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => push({ variant_name: "", price: 0, stock: 0, unit: "" })}
                                  className="mt-5 rounded bg-primary text-white text-xs font-semibold px-8 py-5"
                                >
                                  + Add Variant
                                </button>
                              </div>
                            </>
                          )}
                        </FieldArray>
                      </div>
                      <LineDivider className="my-10" />
                      <div>
                        <p className="font-semibold">Product Discount</p>
                        <div>
                          <div className="relative mt-5">
                            <Input
                              name="discount.discount_name"
                              label="Discount Name"
                              value={values.discount?.discount_name}
                              onChange={handleChange}
                              crossOrigin={undefined}
                              maxLength={20}
                              className="tablet:text-base "
                            />
                            <p className={`text-red discount_name top-full`}>
                              <ErrorMessage name="discount.discount_name" />
                            </p>
                            <div className="w-full flex justify-end mt-2">
                              <span className="text-xs tablet:text-sm text-dark-gray">
                                {values.discount?.discount_name.length}/{20}
                              </span>
                            </div>
                          </div>

                          <div className="mt-5">
                            <Input
                              type="number"
                              name="discount.discount_value"
                              label="Discount Value (%)"
                              placeholder="0"
                              value={values.discount?.discount_value}
                              onChange={handleChange}
                              crossOrigin={undefined}
                              className="tablet:text-base "
                            />
                            <p className={`text-red absolute top-full `}>
                              <ErrorMessage name="discount.discount_value" />
                            </p>
                          </div>
                          <DatePicker
                            name="discount.start_date"
                            label="Start Date"
                            selectedDate={values.discount?.start_date}
                            onDateChange={(date: any) => setFieldValue("discount.start_date", date)}
                          />
                          <DatePicker
                            name="discount.end_date"
                            label="End Date"
                            selectedDate={values.discount?.end_date}
                            onDateChange={(date: any) => setFieldValue("discount.end_date", date)}
                          />
                        </div>
                      </div>
                      <LineDivider className="my-10" />
                      <div>
                        <p className="font-semibold text-sm">Shipping Fee</p>
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
                          <p className={`text-red absolute top-full ${errors.shippingInfo?.packageWeight ? "visible" : ""}`}>
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
                          <p className={`text-red absolute top-full ${errors.shippingInfo?.packageWidth ? "visible" : ""}`}>
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
                          <p className={`text-red absolute top-full ${errors.shippingInfo?.packageHeight ? "visible" : ""}`}>
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
                          <p className={`text-red absolute top-full ${errors.shippingInfo?.packageLength ? "visible" : ""}`}>
                            <ErrorMessage name="shippingInfo.packageLength" />
                          </p>
                        </div>
                        <div className="mt-5">
                          <p className="text-xs mb-2 text-dark-gray">Shipping Fee (per quantity)</p>
                          <div className="flex">
                            <div className="h-20 rounded-s-md flex items-center justify-center bg-gray px-5">
                              <span className="font-semibold text-sm">Rp.</span>
                            </div>
                            <div className="w-full h-20 border border-blue-gray-200 rounded-e-md px-5 text-sm flex items-center">
                              <p>{formatPrice(parseFloat(calculateShippingFee(values.shippingInfo).toFixed(2)).toString())}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-10 flex justify-between gap-5">
                    <button onClick={() => handlePrev(values)} className="w-full border-gray border rounded font-semibold py-3">
                      Prev
                    </button>
                    <button type="submit" onClick={() => console.log(errors)} className="w-full bg-primary text-white rounded font-semibold py-3">
                      Next
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </DynamicThemeProvider>
      </div>
    </div>
  );
}
