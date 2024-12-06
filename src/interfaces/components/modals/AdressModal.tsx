"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Spinner, Textarea, Input, Select, Option, ThemeProvider } from "@material-tailwind/react";
import { LuX } from "react-icons/lu";
import LineDivider from "../dividers/LineDivider";
import { customeTheme } from "@/interfaces/theme/customTheme";
import SuccessAlert from "../alerts/SuccessAlert";
import { mockApiRequestPostUser } from "@/services/api/dummyData";

interface AddressMoadlProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateAddress: (updatedAddress: any) => void;
  id: number;
  name: string;
  addressLabel: string | null;
  addressStreet: string | null;
  addressSubdistrict: string | null;
  addressDistrict: string | null;
  addressCity: string | null;
  addressProvince: string | null;
  zipCode: string | null;
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
export default function AddressModal({
  isOpen,
  handleCloseModal,
  handleUpdateAddress,
  id,
  name,
  addressLabel,
  addressStreet,
  addressSubdistrict,
  addressDistrict,
  addressCity,
  addressProvince,
  zipCode,
}: AddressMoadlProps) {
  const maxLength = 30;
  const streetMaxLength = 200;

  const [isDataCompleted, setIsDataCompleted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [labelValue, setLabelValue] = useState<string>("");
  const [streetValue, setStreetValue] = useState<string>("");
  const [recipientValue, setRecipientValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");

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

  const isCompleted = useMemo(() => {
    return (
      labelValue.trim() !== "" &&
      streetValue.trim() !== "" &&
      recipientValue.trim() !== "" &&
      phoneValue.trim() !== "" &&
      selectedProvince.trim() !== "" &&
      selectedCity.trim() !== "" &&
      selectedDistrict.trim() !== "" &&
      selectedSubdistrict.trim() !== ""
    );
  }, [labelValue, streetValue, recipientValue, phoneValue, selectedProvince, selectedCity, selectedDistrict, selectedSubdistrict]);

  useEffect(() => {
    if (isCompleted) {
      setIsDataCompleted(true);
    } else {
      setIsDataCompleted(false);
    }
  }, [isCompleted]);

  const onSaveAdressBtn = async () => {
    setIsLoadingCities(true);
    try {
      const user = {
        id: id,
        name: recipientValue.toLowerCase(),
        addressLabel: labelValue.toLowerCase(),
        addressStreet: streetValue.toLowerCase(),
        addressSubdistrict: selectedSubdistrict.toLowerCase(),
        addressDistrict: selectedDistrict.toLowerCase(),
        addressCity: selectedCity.toLowerCase(),
        addressProvince: selectedProvince.toLowerCase(),
        zipCode: phoneValue,
      };
      console.log("updated");
      handleUpdateAddress(user);
      handleCloseModal();
    } catch (error) {
      console.log("fail");
    } finally {
      setIsPostLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 min-h-[360px]">
      <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
        <LuX />
      </button>
      <ThemeProvider value={customeTheme}>
        <DialogBody className="text-black font-normal">
          <h3 className=" mb-10">Address Detail</h3>
          <div className="h-full">
            <div>
              <Input
                label="Address Label"
                value={labelValue}
                onChange={(e) => setLabelValue(e.target.value)}
                crossOrigin={undefined}
                maxLength={maxLength}
              />
              <div className="w-full flex justify-end mt-2">
                <span className="text-xs text-dark-gray">
                  {labelValue.length}/{maxLength}
                </span>
              </div>
            </div>
            <div className="mt-5">
              <Select onClick={fetchProvinces} label="Select Province" className="h-20 capitalize">
                {isLoadingProvinces ? (
                  <div className="w-full flex justify-center h-23 items-center">
                    <Spinner />
                  </div>
                ) : (
                  provinces.map((province: any) => (
                    <Option
                      onClick={() => {
                        setSelectedProvince(province.name);
                        setSelectedCity("");
                        setCities([]);
                        setSelectedDistrict("");
                        setDistricts([]);
                        setSubdistricts([]);
                        fetchCities(province.id);
                      }}
                      className="capitalize"
                      key={province.id}
                    >
                      {province.name.toLowerCase()}
                    </Option>
                  ))
                )}
              </Select>

              {selectedProvince && (
                <DropdownWithSpinner
                  label="Select City"
                  options={cities}
                  isLoading={isLoadingCities}
                  onSelect={(cityId: number, cityName: string) => {
                    setSelectedCity(cityName);
                    setSelectedDistrict("");
                    setDistricts([]);
                    setSubdistricts([]);
                    fetchDistricts(cityId);
                  }}
                />
              )}

              {selectedCity && (
                <DropdownWithSpinner
                  label="Select District"
                  options={districts}
                  isLoading={isLoadingDistricts}
                  onSelect={(districtId: number, districtName: string) => {
                    setSelectedDistrict(districtName);
                    setSubdistricts([]);
                    fetchSubdistricts(districtId);
                  }}
                />
              )}

              {selectedDistrict && (
                <DropdownWithSpinner
                  label="Select Subdistrict"
                  options={subdistricts}
                  isLoading={isLoadingSubdistricts}
                  onSelect={(subdistrictId: number, subdistrictName: string) => {
                    setSelectedSubdistrict(subdistrictName);
                  }}
                />
              )}
            </div>
            {selectedSubdistrict && (
              <div className="mt-10">
                <Textarea label="Address Street" value={streetValue} onChange={(e) => setStreetValue(e.target.value)} maxLength={streetMaxLength} />
                <div className="w-full flex justify-end mt-2">
                  <span className="text-xs text-dark-gray">
                    {streetValue.length}/{streetMaxLength}
                  </span>
                </div>
              </div>
            )}
            <LineDivider className="my-10" />
            {selectedSubdistrict && (
              <>
                <div>
                  <Input
                    label="Recipient's Name"
                    value={recipientValue}
                    onChange={(e) => setRecipientValue(e.target.value)}
                    crossOrigin={undefined}
                    maxLength={maxLength}
                  />
                  <div className="w-full flex justify-end mt-2">
                    <span className="text-xs text-dark-gray">
                      {recipientValue.length}/{maxLength}
                    </span>
                  </div>
                </div>
                <div>
                  <Input
                    label="Phone Number"
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e.target.value)}
                    crossOrigin={undefined}
                    maxLength={maxLength}
                    type="number"
                  />
                  <div className="w-full flex justify-end mt-2">
                    <span className="text-xs text-dark-gray">
                      {phoneValue.length}/{maxLength}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogBody>
      </ThemeProvider>
      <DialogFooter>
        <button
          onClick={onSaveAdressBtn}
          className={`${isDataCompleted ? "bg-primary" : "bg-gray d"} text-white py-2 px-10 rounded font-bold w-full text-center`}
          disabled={isDataCompleted ? false : true}
        >
          {isPostLoading ? <Spinner /> : "Save Adress"}
        </button>

        <SuccessAlert isOpen={isSuccess} className="" text="Success add adress" />
      </DialogFooter>
    </Dialog>
  );
}
