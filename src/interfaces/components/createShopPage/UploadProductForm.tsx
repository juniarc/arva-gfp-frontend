import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, boolean, array, date } from "yup";
import { Input, Option, Select, Spinner, Textarea, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { customeTheme } from "@/interfaces/theme/customTheme";
import dynamic from "next/dynamic";
import { avaibleCategories, shippingOptions } from "@/services/fixedData";
import LineDivider from "../dividers/LineDivider";
import { Product, ShippingInfo } from "@/types/types";
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
            value={selectedDate ? format(selectedDate, "PPP") : ""}
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

interface UploadProductValuesTypes {
  image_data: string[];
  product_name: string;
  product_description: string;
  category: string;
  variant_name: string;
  price: number;
  unit: string;
  stock: number;
  discount_name: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  // price: number;
  // stocks: number;
  // unit: string;
  // discount: number;
  // variants: string[];
  // shippingInfo: {
  //   packageWeight: number;
  //   packageHeight: number;
  //   packageWidth: number;
  //   packageLength: number;
  //   shippingFee: number;
  // };
  // tags: string[];
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
    image_data: array().of(string().required("Image cannot be empty")).max(5, "You can only upload up to 5 images"),
    product_name: string()
      .min(3, "Product name must be at least 3 characters")
      .max(100, "Product name cannot exceed 100 characters")
      .required("Product name is required"),
    product_description: string().max(500, "Description cannot exceed 500 characters").required("Description is required"),
    category: string().required("Category is required"),
    variant_name: string()
      .min(3, "Variant name must be at least 3 characters")
      .max(20, "Variant name cannot exceed 20 characters")
      .required("Variant name is required"),
    price: number().min(0, "Price must be a positive value").required("Price is required"),
    stock: number().min(0, "Stocks must be a positive value").required("Stocks are required"),
    unit: string().required("Unit is required"),
    discount_name: string()
      .min(3, "Discount name must be at least 3 characters")
      .max(100, "Discount name cannot exceed 100 characters")
      .required("Discount name is required"),
    discount_value: number().min(0, "Discount Value must be a positive value").required("Discount Value is required"),
    start_date: date().required("Start Date is required").typeError("Start Date is not valid"),
    end_date: date()
      .required("End Date is required")
      .typeError("End Date is not valid")
      .test("is-later", "End Date can not less than Start Date", function (value) {
        const { start_date } = this.parent;
        return !value || new Date(value) >= new Date(start_date); // validate start_date < end_date
      }),

    // shippingInfo: object().shape({
    //   packageWeight: number().min(0, "Package weight must be a positive value").required("Package weight is required"),
    //   packageHeight: number().min(0, "Package height must be a positive value").required("Package height is required"),
    //   packageWidth: number().min(0, "Package width must be a positive value").required("Package width is required"),
    //   packageLength: number().min(0, "Package length must be a positive value").required("Package length is required"),
    //   shippingFee: number().min(0, "Shipping fee must be a positive value").required("Shipping fee is required"),
    // }),
    // tags: array().of(string().required("Tags cannot be empty")).min(1, "At least one tag is required"),
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
            setFieldValue("image_data", [...values.image_data, ...updatedUrls]);
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
    const updatedUrls = values.image_data.filter((_, i) => i !== index);
    setFieldValue("image_data", updatedUrls);
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
                        {values.image_data &&
                          values.image_data.map((imageUrl: string, index: number) => (
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
                        {values.image_data.length <= 5 && (
                          <div>
                            <label htmlFor="uploadImage">
                              <div className="w-25 h-25 overflow-hidden rounded border-dashed border-red border flex items-center justify-center p-2">
                                <span className="text-red text-[0.5rem] text-center">Add Photo</span>
                              </div>
                            </label>
                            <input
                              id="uploadImage"
                              type="file"
                              name="image_data"
                              multiple
                              accept="image/*"
                              onChange={(event) => handleFileChange(event, values, setFieldValue)}
                              className="hidden"
                            />
                          </div>
                        )}

                        <p className={`text-red absolute top-full ${errors.image_data ? "visible" : ""}`}>
                          <ErrorMessage name="image_data" />
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
                        name="product_description"
                        label="Product Description"
                        value={values.product_description}
                        onChange={handleChange}
                        maxLength={3000}
                        className="tablet:text-base "
                      />
                      <p className={`text-red absolute top-full ${errors.product_description ? "visible" : ""}`}>
                        <ErrorMessage name="product_description" />
                      </p>
                      <div className="w-full flex justify-end mt-2">
                        <span className="text-xs tablet:text-sm text-dark-gray">
                          {values.product_description.length}/{3000}
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
                          <Option value={category.category_name} className="capitalize" key={index}>
                            {category.category_name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <LineDivider className="mt-10" />
                    <div className="mt-5">
                      <p className="font-semibold">Product Variants</p>
                      <div>
                        <div className="relative mt-10">
                          <Input
                            name="variant_name"
                            label="Variant Name"
                            value={values.variant_name}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            maxLength={20}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.variant_name ? "visible" : ""}`}>
                            <ErrorMessage name="variant_name" />
                          </p>
                          <div className="w-full flex justify-end mt-2">
                            <span className="text-xs tablet:text-sm text-dark-gray">
                              {values.variant_name.length}/{20}
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
                            name="stock"
                            label="Stocks"
                            placeholder="0"
                            value={values.stock}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.stock ? "visible" : ""}`}>
                            <ErrorMessage name="stock" />
                          </p>
                        </div>
                        <div className="mt-10">
                          <Input
                            name="unit"
                            label="Unit"
                            value={values.unit}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.unit ? "visible" : ""}`}>
                            <ErrorMessage name="unit" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <LineDivider className="my-10" />
                    <div>
                      <p className="font-semibold">Product Discount</p>
                      <div>
                        <div className="relative mt-5">
                          <Input
                            name="discount_name"
                            label="Discount Name"
                            value={values.discount_name}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            maxLength={20}
                            className="tablet:text-base "
                          />
                          <p className={`text-red discount_name top-full ${errors.discount_name ? "visible" : ""}`}>
                            <ErrorMessage name="variant_name" />
                          </p>
                          <div className="w-full flex justify-end mt-2">
                            <span className="text-xs tablet:text-sm text-dark-gray">
                              {values.discount_name.length}/{20}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5">
                          <Input
                            type="number"
                            name="discount_value"
                            label="Discount Value (%)"
                            placeholder="0"
                            value={values.discount_value}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${errors.discount_value ? "visible" : ""}`}>
                            <ErrorMessage name="discount_value" />
                          </p>
                        </div>
                        <DatePicker
                          name="start_date"
                          label="Start Date"
                          selectedDate={values.start_date}
                          onDateChange={(date: any) => setFieldValue("start_date", date)}
                        />
                        <DatePicker
                          name="end_date"
                          label="End Date"
                          selectedDate={values.end_date}
                          onDateChange={(date: any) => setFieldValue("end_date", date)}
                        />
                      </div>
                    </div>
                    {/* <div className="mt-10">
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
                    </div> */}
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
  );
}
