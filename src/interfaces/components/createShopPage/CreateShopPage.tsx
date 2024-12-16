"use client";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import IdentityFrom from "./IdentityForm";
import ShopProfile from "./ShopProfileForm";
import { FaCheck } from "react-icons/fa6";
import UploadProductForm from "./UploadProductForm";
import { CreateShopBody, Product, UploadProductBody } from "@/types/types";
import api from "@/services/api/api";

interface CreateShopPageProps {
  userId: number;
  token: string | undefined;
}

export default function CreateShopPage({ userId, token }: CreateShopPageProps) {
  const MAX_STEP = 2;
  const steps = [
    {
      step: 0,
      name: "Identitiy Information",
    },
    {
      step: 1,
      name: "Shop Information",
    },
    {
      step: 2,
      name: "Upload Product",
    },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [identityValues, setIdentityValues] = useState({
    name: "",
    ktp: "",
    agreement: false,
  });
  const [shopProfileValues, setShopProfileValues] = useState({
    shop_image: "",
    shop_address_province: "",
    shop_address_city: "",
    shop_address_district: "",
    shop_address_subdistrict: "",
    shop_address_street: "",
    // zipCode: "",
    // email: "",
    // phoneNumber: "",
    shop_name: "",
    description: "",
  });
  const [uploadProductValues, setUploadProductValues] = useState({
    image_data: [],
    product_name: "",
    product_description: "",
    category: "",
    variant_name: "",
    price: 0,
    stock: 0,
    unit: "",
    discount_name: "",
    discount_value: 0,
    start_date: "",
    end_date: "",
    // discount: {
    //   discount_name: "",
    //   discount_type: "",
    //   discount_value: 0,
    //   start_date: "",
    //   end_date: "",
    //   product_id: 0,
    // },
    // variant: {
    //   variant_name: "",
    //   price: 0,
    //   stock: 0,
    //   product_id: 0,
    // },
    // shippingInfo: {
    //   packageWeight: 0,
    //   packageHeight: 0,
    //   packageWidth: 0,
    //   packageLength: 0,
    //   shippingFee: 0,
    // },
    // tags: [],
  });
  const handleNext = (values: any) => {
    switch (activeStep) {
      case 0:
        setIdentityValues({
          name: values.name,
          ktp: values.ktp,
          agreement: values.agreement,
        });
        break;
      case 1:
        setShopProfileValues({ ...values });
        // submitCreateShop(values);
        break;
      case 2:
        setUploadProductValues({ ...values });
        submitCreateProduct(values);
    }
    !isLastStep && setActiveStep((cur) => (cur < MAX_STEP ? cur + 1 : cur));
  };
  const handlePrev = (values: any) => {
    switch (activeStep) {
      case 0:
        setIdentityValues(values);
        break;
      case 1:
        setShopProfileValues(values);
        break;
      case 2:
        setUploadProductValues(values);
        break;
    }
    !isFirstStep && setActiveStep((cur) => (cur > 0 ? cur - 1 : cur));
  };

  // Fungsi untuk mengubah semua nilai Shop menjadi lowercase
  const formatShopToLowerCase = (values: CreateShopBody): CreateShopBody => {
    return {
      ...values,
      shop_image: values.shop_image,
      shop_name: values.shop_name.toLowerCase(),
      description: values.description.toLowerCase(),
      shop_address_province: values.shop_address_province.toLowerCase(),
      shop_address_city: values.shop_address_city.toLowerCase(),
      shop_address_district: values.shop_address_district.toLowerCase(),
      shop_address_subdistrict: values.shop_address_subdistrict.toLowerCase(),
      shop_address_street: values.shop_address_street.toLowerCase(),
    };
  };

  // Fungsi untuk POST data ke backend
  const submitCreateShop = async (values: any) => {
    const formattedValues = formatShopToLowerCase(values);
    try {
      const createShop = await api.createShop(userId, token, formattedValues);
      const response = createShop.json();

      console.log(response);
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const formatProductToLowerCase = (values: UploadProductBody): UploadProductBody => {
    return {
      ...values,
      product_name: values.product_name.toLowerCase(),
      image_data: values.image_data,
      product_description: values.product_description.toLowerCase(),
      category: values.category.toLowerCase(),
      variant_name: values.variant_name.toLowerCase(),
      price: values.price,
      stock: values.stock,
      unit: values.unit.toLowerCase(),
      discount_name: values.discount_name.toLowerCase(),
      discount_value: values.discount_value,
      start_date: new Date(values.start_date).toISOString().split("Z")[0],
      end_date: new Date(values.end_date).toISOString().split("Z")[0],
    };
  };

  const submitCreateProduct = async (values: any) => {
    const formattedValues = formatProductToLowerCase(values);
    console.log(formattedValues);
    // try {
    //   const createProduct = await api.createProduct(userId, token, formattedValues);
    //   const response = createProduct.json();

    //   console.log(response);
    // } catch (error) {
    //   console.error("Error posting data:", error);
    //   alert("Terjadi kesalahan saat mengirim data.");
    // }
  };

  return (
    <div className="p-10 w-full min-h-full relative desktop:flex desktop:items-center desktop:justify-center">
      <div className="desktop:w-1/2">
        <div className="flex w-full items-center justify-center">
          <div className="w-3/4">
            <Stepper activeStep={activeStep} isLastStep={(value) => setIsLastStep(value)} isFirstStep={(value) => setIsFirstStep(value)}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <div
                    className={`${
                      index < activeStep ? "bg-primary border-primary" : index === activeStep ? "border-primary bg-white" : "border-gray-300 bg-white"
                    } w-10 h-10 rounded-full border flex items-center justify-center`}
                  >
                    <FaCheck className={`text-xs ${index < activeStep ? "text-white" : "hidden"}`} />
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
        {activeStep === 0 && <IdentityFrom handleSubmit={handleNext} initialValues={identityValues} />}
        {activeStep === 1 && <ShopProfile handleSubmit={handleNext} initialValues={shopProfileValues} handlePrev={handlePrev} />}
        {activeStep === 2 && <UploadProductForm handleSubmit={handleNext} initialValues={uploadProductValues} handlePrev={handlePrev} />}
      </div>
    </div>
  );
}
