"use client";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import IdentityFrom from "./IdentityForm";
import ShopProfile from "./ShopProfileForm";
import { FaCheck } from "react-icons/fa6";
import UploadProductForm from "./UploadProductForm";
import { ReqShopBody, Discount, Product, ReqProductBody, CreateDiscountBody } from "@/types/types";
import api from "@/services/api/api";
import { useRouter } from "next/navigation";
import SpinnerModal from "../modals/SpinnerModa";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";
import { format } from "date-fns";

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
    shop_zip_code: "",
    shop_email: "",
    shop_phone_number: "",
    shop_name: "",
    description: "",
  });
  const [uploadProductValues, setUploadProductValues] = useState({
    images: [],
    product_name: "",
    description: "",
    product_type: "",
    category_id: 0,
    variants: [
      {
        variant_name: "",
        price: 0,
        stock: 0,
        unit: "",
      },
    ],
    shippingInfo: {
      packageWeight: 0,
      packageWidth: 0,
      packageLength: 0,
      packageHeight: 0,
      shippingCost: 0,
    },
    shipping_cost: 0,
    discount: {
      discount_name: "",
      discount_value: 0,
      start_date: "",
      end_date: "",
      discount_type: "percentage",
    },
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
        submitShopAndProduct(values);
        break;
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
        // submitCreateProduct(values);
        break;
    }
    !isFirstStep && setActiveStep((cur) => (cur > 0 ? cur - 1 : cur));
  };

  // Fungsi untuk mengubah semua nilai Shop menjadi lowercase
  const formatShopToLowerCase = (values: ReqShopBody): ReqShopBody => {
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
      shop_email: values.shop_email.toLowerCase(),
      shop_phone_number: values.shop_phone_number.toString(),
      shop_zip_code: values.shop_zip_code.toString(),
    };
  };

  const formatProductToLowerCase = (values: ReqProductBody): ReqProductBody => {
    return {
      product_type: values.product_type.toLowerCase(),
      product_name: values.product_name.toLowerCase(),
      images: values.images,
      description: values.description.toLowerCase(),
      category_id: values.category_id,
      variants: values.variants.map((variant) => ({
        variant_name: variant.variant_name.toLowerCase(),
        price: parseInt(String(variant.price).replace(/\./g, ""), 10),
        stock: variant.stock,
        unit: variant.unit.toLowerCase(),
      })),
      shipping_cost: values.shipping_cost,
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

  const router = useRouter();
  const [reqStatus, setReqStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submitShopAndProduct = async (productValuesInput: any) => {
    setReqStatus("loading");
    const shopValues = formatShopToLowerCase(shopProfileValues);
    const productValues = formatProductToLowerCase(productValuesInput);

    console.log("shopValues", shopValues);
    console.log("productValues", productValues);

    try {
      const createShop = await api.createShop(userId, token, shopValues);

      const createProduct = await api.createProduct(userId, token, productValues);

      if (createProduct.product_id && productValuesInput.discount) {
        const formatedDiscountBody = formatDiscountToLowerCase(productValuesInput.discount);
        await api.createDiscount(createProduct.product_id, token, formatedDiscountBody);
      }
      console.log(createShop, createProduct);

      setReqStatus("success");
      setTimeout(() => {
        setReqStatus("idle");
      }, 2000);

      router.push("/my-shop");
    } catch (error) {
      console.log(error);

      setReqStatus("error");
      setTimeout(() => {
        setReqStatus("idle");
      }, 2000);
    }
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
      <SpinnerModal isOpen={reqStatus === "loading"} handleCloseModal={() => setReqStatus("idle")} />
      <SuccessAlert isOpen={reqStatus === "success"} text="Success Add Shop" />
      <FailAlert isOpen={reqStatus === "error"} text="Failed Add Shop" />
    </div>
  );
}
