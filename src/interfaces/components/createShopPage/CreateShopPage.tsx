"use client";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import IdentityFrom from "./IdentityForm";
import ShopProfile from "./ShopProfileForm";
import { FaCheck } from "react-icons/fa6";
import UploadProductForm from "./UploadProductForm";
import { Product } from "@/types/types";

export default function CreateShopPage() {
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
    addressLabel: "",
    addressProvince: "",
    addressCity: "",
    addressDistrict: "",
    addressSubdistrict: "",
    addressStreet: "",
    zipCode: "",
    shippingChannel: [""],
    email: "",
    phoneNumber: "",
    openingHours: "",
    closingHours: "",
    phonNumber: "",
  });
  const [uploadProductValues, setUploadProductValues] = useState({
    imageUrl: [],
    name: "",
    description: "",
    category: "",
    price: 0,
    stocks: 0,
    unit: "",
    discount: 0,
    variants: [],
    shippingInfo: {
      packageWeight: 0,
      packageHeight: 0,
      packageWidth: 0,
      packageLength: 0,
      shippingFee: 0,
    },
    tags: [],
  });
  const handleNext = (values: any) => {
    console.log("next");
    switch (activeStep) {
      case 0:
        setIdentityValues({
          name: values.name,
          ktp: values.ktp,
          agreement: values.agreement,
        });
        break;
      case 1:
        console.log(shopProfileValues);
        setShopProfileValues({ ...values });
        break;
      case 2:
        setUploadProductValues({ ...values });
    }
    !isLastStep && setActiveStep((cur) => (cur < MAX_STEP ? cur + 1 : cur));
  };
  const handlePrev = (values: any) => {
    switch (activeStep) {
      case 0:
        setIdentityValues(values);
        break;
      case 1:
        console.log(shopProfileValues);

        setShopProfileValues(values);
        break;
      case 2:
        setUploadProductValues(values);
        break;
    }
    !isFirstStep && setActiveStep((cur) => (cur > 0 ? cur - 1 : cur));
  };
  return (
    <div className="p-10 w-full min-h-full relative">
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
                  <FaCheck className="text-xs" />
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
  );
}
