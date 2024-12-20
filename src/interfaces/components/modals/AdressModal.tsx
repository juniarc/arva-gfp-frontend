"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Spinner, Textarea, Input, Select, Option, ThemeProvider } from "@material-tailwind/react";
import { LuX } from "react-icons/lu";
import LineDivider from "../dividers/LineDivider";
import { customeTheme } from "@/interfaces/theme/customTheme";
import SuccessAlert from "../alerts/SuccessAlert";
import { mockApiRequestPostUser } from "@/services/api/dummyData";
import { ReqUserBody, User } from "@/types/types";
import { object, string } from "yup";
import dynamic from "next/dynamic";
import { ErrorMessage, Form, Formik } from "formik";

const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export interface InitialValues extends ReqUserBody {
  address_label: string;
}

interface AddressMoadlProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateAddress: (updatedAddress: any) => void;
  initialValues: InitialValues;
  editAddressStatus: "idle" | "loading" | "success" | "error";
}

const DropdownWithSpinner = ({ label, options, isLoading, onSelect }: any) => {
  return (
    <div className="mt-10">
      <Select label={label} className="h-20 capitalize">
        {isLoading ? (
          <div className="w-full flex justify-center h-23 items-center">
            <Spinner />
          </div>
        ) : (
          options.map((option: any) => (
            <Option onClick={() => onSelect(option.id, option.name)} className="capitalize" key={option.id}>
              {option.name.toLowerCase()}
            </Option>
          ))
        )}
      </Select>
    </div>
  );
};
export default function AddressModal({ isOpen, handleCloseModal, handleUpdateAddress, initialValues, editAddressStatus }: AddressMoadlProps) {
  const maxLength = 30;
  const streetMaxLength = 200;

  const validationSchema = object({
    address_province: string().required("Province is required"),
    address_city: string().required("City is required"),
    address_district: string().required("District is required"),
    address_subdistrict: string().required("Subdistrict is required"),
    address_street: string().required("Street is required"),
    zip_code: string().required("Zip Code is required"),
    address_label: string().required("Label is required"),
  });

  const [isDataCompleted, setIsDataCompleted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>("");

  const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingSubdistricts, setIsLoadingSubdistricts] = useState(false);

  const fetchProvinces = async () => {
    setIsLoadingProvinces(true);
    const response = await fetch("/api/provinces");
    const data = await response.json();
    setProvinces(data);
    setIsLoadingProvinces(false);
  };

  const fetchCities = async (provinceId: number) => {
    setIsLoadingCities(true);
    const response = await fetch(`/api/regencies/${provinceId}`);
    const data = await response.json();
    setCities(data);
    setIsLoadingCities(false);
  };

  const fetchDistricts = async (cityId: number) => {
    setIsLoadingDistricts(true);
    const response = await fetch(`/api/districts/${cityId}`);
    const data = await response.json();
    setDistricts(data);
    setIsLoadingDistricts(false);
  };

  const fetchSubdistricts = async (districtId: number) => {
    setIsLoadingSubdistricts(true);
    const response = await fetch(`/api/subdistricts/${districtId}`);
    const data = await response.json();
    setSubdistricts(data);
    setIsLoadingSubdistricts(false);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15 overflow-visible">
      <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
        <LuX className="tablet:text-[2rem]" />
      </button>
      <DialogBody className="text-black font-normal max-h-[70vh] overflow-scroll">
        <div className="mt-10 ">
          <h5 className="font-bold text-center w-full mb-10 ">Edit Address</h5>
          <div>
            <DynamicThemeProvider value={customeTheme}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleUpdateAddress(values);
                  handleCloseModal();
                }}
              >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                  <Form className="flex flex-col justify-between min-h-[70svh]">
                    <div className="flex flex-col gap-15">
                      <div className="relative">
                        <div className="relative">
                          <Input
                            name="address_label"
                            label="Address Label"
                            value={values.address_label}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            maxLength={maxLength}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${touched.address_label && errors.address_label ? "visible" : ""}`}>
                            <ErrorMessage name="address_label" />
                          </p>
                          <div className="w-full flex justify-end mt-2">
                            <span className="text-xs tablet:text-sm text-dark-gray">
                              {values.address_label.length}/{maxLength}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5">
                          <Select
                            name="address_province"
                            onChange={(value) => {
                              setFieldValue("address_province", value);
                              setFieldValue("address_city", "");
                              setCities([]);
                              setDistricts([]);
                              setSubdistricts([]);
                            }}
                            label="Select Province"
                            className="h-20 capitalize"
                          >
                            {isLoadingProvinces ? (
                              <div className="w-full flex justify-center h-23 items-center">
                                <Spinner />
                              </div>
                            ) : (
                              provinces.map((province: any) => (
                                <Option value={province.name} onClick={() => fetchCities(province.id)} className="capitalize" key={province.id}>
                                  {province.name.toLowerCase()}
                                </Option>
                              ))
                            )}
                          </Select>

                          {values.address_province && (
                            <DropdownWithSpinner
                              touched={touched}
                              errors={errors}
                              name="address_city"
                              label="Select City"
                              options={cities}
                              isLoading={isLoadingCities}
                              onSelect={(cityId: number, cityName: string) => {
                                setFieldValue("address_city", cityName);
                                setDistricts([]);
                                setSubdistricts([]);
                                fetchDistricts(cityId);
                              }}
                            />
                          )}

                          {values.address_city && (
                            <DropdownWithSpinner
                              touched={touched}
                              errors={errors}
                              name="address_district"
                              label="Select District"
                              options={districts}
                              isLoading={isLoadingDistricts}
                              onSelect={(districtId: number, districtName: string) => {
                                setFieldValue("address_district", districtName);
                                setSubdistricts([]);
                                fetchSubdistricts(districtId);
                              }}
                            />
                          )}

                          {values.address_district && (
                            <DropdownWithSpinner
                              touched={touched}
                              errors={errors}
                              name="address_subdistrict"
                              label="Select Subdistrict"
                              options={subdistricts}
                              isLoading={isLoadingSubdistricts}
                              onSelect={(subdistrictId: number, subdistrictName: string) => {
                                setFieldValue("address_subdistrict", subdistrictName);
                              }}
                            />
                          )}
                        </div>
                        {values.address_subdistrict && (
                          <div className="mt-10 mb-5">
                            <Textarea
                              name="address_street"
                              label="Address Street"
                              value={values.address_street}
                              onChange={handleChange}
                              maxLength={streetMaxLength}
                            />
                            <p className={`text-red absolute top-full ${touched.address_street && errors.address_street ? "visible" : ""}`}>
                              <ErrorMessage name="address_street" />
                            </p>
                            <div className="w-full flex justify-end mt-2">
                              <span className="text-xs text-dark-gray">
                                {values.address_street.length}/{streetMaxLength}
                              </span>
                            </div>
                          </div>
                        )}
                        {values.address_street && (
                          <div className="relative">
                            <Input
                              type="number"
                              name="zip_code"
                              label="Zip Code"
                              value={values.zip_code}
                              onChange={handleChange}
                              crossOrigin={undefined}
                              maxLength={6}
                              className="tablet:text-base "
                            />
                            <p className={`text-red absolute top-full ${touched.zip_code && errors.zip_code ? "visible" : ""}`}>
                              <ErrorMessage name="zip_code" />
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-10 flex justify-between gap-5">
                      {editAddressStatus === "loading" ? (
                        <div className="w-full py-3  flex items-center justify-center">
                          <Spinner color="green" />
                        </div>
                      ) : (
                        <>
                          <button onClick={handleCloseModal} className="w-full border-gray border rounded font-semibold py-3">
                            Cancel
                          </button>
                          <button type="submit" className="w-full bg-primary text-white rounded font-semibold py-3">
                            Save
                          </button>
                        </>
                      )}
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
