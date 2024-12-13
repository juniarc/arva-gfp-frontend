import { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, boolean } from "yup";
import { Input, Option, Select, Spinner, Textarea } from "@material-tailwind/react";
import { customeTheme } from "@/interfaces/theme/customTheme";
import dynamic from "next/dynamic";
import { shippingOptions } from "@/services/fixedData";
import LineDivider from "../dividers/LineDivider";

const DropdownWithSpinner = ({ label, options, isLoading, onSelect, name, touched, errors }: any) => {
  return (
    <div className="mt-10">
      <Select label={label} className="h-20 capitalize" name={name}>
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
      <p className={`text-red absolute top-full ${touched.name && errors.name ? "visible" : ""}`}>
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

interface ShopFormTypes {
  name: string;
  description: string;
  addressLabel: string;
  addressProvince: string;
  addressCity: string;
  addressDistrict: string;
  addressSubdistrict: string;
  addressStreet: string;
  shippingChannel: string[];
  email: string;
  phoneNumber: string;
  openingHours: string;
  closingHours: string;
  zipCode: string;
}
interface ShopProfileFormProps {
  initialValues: ShopFormTypes;
  handleSubmit: (values: ShopFormTypes) => void;
  handlePrev: (values: ShopFormTypes) => void;
}
const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function ShopProfile({ initialValues, handleSubmit, handlePrev }: ShopProfileFormProps) {
  const validationSchema = object({
    name: string().required("Name is required"),
    description: string().required("Description is required"),
    addressLabel: string().required("Label is required"),
    addressProvince: string().required("Province is required"),
    addressCity: string().required("City is required"),
    addressDistrict: string().required("District is required"),
    addressSubdistrict: string().required("Subdistrict is required"),
    addressStreet: string().required("Street is required"),
    zipCode: string().required("Zip Code is required"),
    email: string().email().required("Email is required"),
    phoneNumber: number().required("Phone Number is required"),
    openingHours: string().required("Opening Hours is required"),
    closingHours: string().required("Closing Hours is required"),
    shippingChannel: string().required("Shipping is required"),
  });

  const maxLength = 30;
  const streetMaxLength = 200;

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

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
    <div className="mt-10 ">
      <h5 className="font-bold text-center w-full mb-10 ">Shop Information</h5>
      <div>
        <DynamicThemeProvider value={customeTheme}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ errors, touched, values, handleChange, setFieldValue }) => (
              <Form className="flex flex-col justify-between min-h-[70svh]">
                <div className="flex flex-col gap-15">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        name="name"
                        label="Shop Name"
                        value={values.name}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        maxLength={maxLength}
                        className="tablet:text-base "
                      />
                      <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                        <ErrorMessage name="name" />
                      </p>
                      <div className="w-full flex justify-end mt-2">
                        <span className="text-xs tablet:text-sm text-dark-gray">
                          {values.addressLabel.length}/{maxLength}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <Textarea
                        name="description"
                        label="Shop Description"
                        value={values.addressLabel}
                        onChange={handleChange}
                        maxLength={3000}
                        className="tablet:text-base "
                      />
                      <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                        <ErrorMessage name="description" />
                      </p>
                      <div className="w-full flex justify-end mt-2">
                        <span className="text-xs tablet:text-sm text-dark-gray">
                          {values.addressLabel.length}/{maxLength}
                        </span>
                      </div>
                    </div>
                    <LineDivider className="my-5" />
                    <div className="relative mt-5">
                      <Input
                        name="addressLabel"
                        label="Address Label"
                        value={values.addressLabel}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        maxLength={maxLength}
                        className="tablet:text-base "
                      />
                      <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                        <ErrorMessage name="addressLabel" />
                      </p>
                      <div className="w-full flex justify-end mt-2">
                        <span className="text-xs tablet:text-sm text-dark-gray">
                          {values.addressLabel.length}/{maxLength}
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      {/* <DropdownWithSpinner
                        touched={touched}
                        errors={errors}
                        name="addressProvince"
                        label="Select Province"
                        options={provinces}
                        isLoading={isLoadingProvinces}
                        onSelect={(provinceId: number, provinceName: string) => {
                          setFieldValue("addressProvince", provinceName);
                          setFieldValue("addressCity", "");
                          setCities([]);
                          setDistricts([]);
                          setSubdistricts([]);
                          fetchCities(provinceId);
                        }}
                      /> */}
                      <Select
                        name="adressProvince"
                        onChange={(value) => {
                          setFieldValue("addressProvince", value);
                          setFieldValue("addressCity", "");
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
                            <Option value={province.id} onClick={() => fetchCities(province.id)} className="capitalize" key={province.id}>
                              {province.name.toLowerCase()}
                            </Option>
                          ))
                        )}
                      </Select>

                      {values.addressProvince && (
                        <DropdownWithSpinner
                          touched={touched}
                          errors={errors}
                          name="addressCity"
                          label="Select City"
                          options={cities}
                          isLoading={isLoadingCities}
                          onSelect={(cityId: number, cityName: string) => {
                            setFieldValue("addressCity", cityName);
                            setDistricts([]);
                            setSubdistricts([]);
                            fetchDistricts(cityId);
                          }}
                        />
                      )}

                      {values.addressCity && (
                        <DropdownWithSpinner
                          touched={touched}
                          errors={errors}
                          name="addressDistrict"
                          label="Select District"
                          options={districts}
                          isLoading={isLoadingDistricts}
                          onSelect={(districtId: number, districtName: string) => {
                            setFieldValue("addressDistrict", districtName);
                            setSubdistricts([]);
                            fetchSubdistricts(districtId);
                          }}
                        />
                      )}

                      {values.addressDistrict && (
                        <DropdownWithSpinner
                          touched={touched}
                          errors={errors}
                          name="addressSubdistrict"
                          label="Select Subdistrict"
                          options={subdistricts}
                          isLoading={isLoadingSubdistricts}
                          onSelect={(subdistrictId: number, subdistrictName: string) => {
                            setFieldValue("addressSubdistrict", subdistrictName);
                          }}
                        />
                      )}
                    </div>
                    {values.addressSubdistrict && (
                      <div className="mt-10 relative">
                        <Input
                          name="zipCode"
                          label="Zip Code"
                          value={values.zipCode}
                          onChange={handleChange}
                          crossOrigin={undefined}
                          maxLength={6}
                          type="text"
                        />
                        <p className={`text-red absolute top-full ${touched.zipCode && errors.zipCode ? "visible" : ""}`}>
                          <ErrorMessage name="zipCode" />
                        </p>
                        <div className="w-full flex justify-end mt-2">
                          <span className="text-xs text-dark-gray">
                            {values.zipCode.length}/{6}
                          </span>
                        </div>
                      </div>
                    )}
                    {values.zipCode && (
                      <div className="mt-10 mb-5">
                        <Textarea
                          name="addressStreet"
                          label="Address Street"
                          value={values.addressStreet}
                          onChange={handleChange}
                          maxLength={streetMaxLength}
                        />
                        <p className={`text-red absolute top-full ${touched.addressStreet && errors.addressStreet ? "visible" : ""}`}>
                          <ErrorMessage name="addressStreet" />
                        </p>
                        <div className="w-full flex justify-end mt-2">
                          <span className="text-xs text-dark-gray">
                            {values.addressStreet.length}/{streetMaxLength}
                          </span>
                        </div>
                      </div>
                    )}
                    {values.addressStreet && (
                      <Select
                        name="shippingChannel"
                        onChange={(value) => setFieldValue("shippingChannel", value)}
                        label="Select Shipping"
                        className="h-20 capitalize"
                      >
                        {shippingOptions.map((option: any, index) => (
                          <Option value={option} className="capitalize" key={index}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    )}
                    <LineDivider className="my-5" />
                    {values.shippingChannel && (
                      <div className="relative ">
                        <Input
                          name="email"
                          label="Email"
                          value={values.email}
                          onChange={handleChange}
                          crossOrigin={undefined}
                          maxLength={maxLength}
                          className="tablet:text-base "
                        />
                        <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                          <ErrorMessage name="email" />
                        </p>
                      </div>
                    )}
                    {values.email && (
                      <>
                        <div className="relative mt-10">
                          <Input
                            name="phoneNumber"
                            label="Phone Number"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            maxLength={maxLength}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                            <ErrorMessage name="phoneNumber" />
                          </p>
                        </div>
                        <LineDivider className="my-5" />
                      </>
                    )}
                    {values.phoneNumber && (
                      <div className="relative mt-10">
                        <Input
                          name="openingHours"
                          label="Opening Hours"
                          value={values.openingHours}
                          onChange={handleChange}
                          crossOrigin={undefined}
                          maxLength={maxLength}
                          className="tablet:text-base "
                        />
                        <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                          <ErrorMessage name="openingHours" />
                        </p>
                      </div>
                    )}
                    {values.openingHours && (
                      <div className="relative mt-10">
                        <Input
                          name="closingHours"
                          label="Closing Hours"
                          value={values.closingHours}
                          onChange={handleChange}
                          crossOrigin={undefined}
                          maxLength={maxLength}
                          className="tablet:text-base "
                        />
                        <p className={`text-red absolute top-full ${touched.addressLabel && errors.addressLabel ? "visible" : ""}`}>
                          <ErrorMessage name="closingHours" />
                        </p>
                      </div>
                    )}
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
