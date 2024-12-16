import { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, boolean } from "yup";
import { Input, Option, Select, Spinner, Textarea } from "@material-tailwind/react";
import { customeTheme } from "@/interfaces/theme/customTheme";
import dynamic from "next/dynamic";
import { shippingOptions } from "@/services/fixedData";
import LineDivider from "../dividers/LineDivider";
import Image from "next/image";
import { FaCamera } from "react-icons/fa6";

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
  shop_image: string;
  shop_name: string;
  description: string;
  shop_address_province: string;
  shop_address_city: string;
  shop_address_district: string;
  shop_address_subdistrict: string;
  shop_address_street: string;
  // email: string;
  // phoneNumber: string;
  // openingHours: string;
  // closingHours: string;
  // zipCode: string;
}
interface ShopProfileFormProps {
  initialValues: ShopFormTypes;
  handleSubmit: (values: ShopFormTypes) => void;
  handlePrev: (values: ShopFormTypes) => void;
}
const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function ShopProfile({ initialValues, handleSubmit, handlePrev }: ShopProfileFormProps) {
  const validationSchema = object({
    shop_image: string().required("Image is required"),
    shop_name: string().required("Name is required"),
    description: string().required("Description is required"),
    shop_address_province: string().required("Province is required"),
    shop_address_city: string().required("City is required"),
    shop_address_district: string().required("District is required"),
    shop_address_subdistrict: string().required("Subdistrict is required"),
    shop_address_street: string().required("Street is required"),
    // zipCode: string().required("Zip Code is required"),
    // email: string().email().required("Email is required"),
    // phoneNumber: number().required("Phone Number is required"),
    // openingHours: string().required("Opening Hours is required"),
    // closingHours: string().required("Closing Hours is required"),
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, values: any, setFieldValue: (field: string, value: any) => void) => {
    const MAX_FILE_SIZE = 500 * 1024; //500kb
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Ambil hanya file pertama
      if (file.size > MAX_FILE_SIZE) {
        console.error(`File "${file.name}" exceeds the maximum size of 500 KB.`);
        alert(`File "${file.name}" terlalu besar. Maksimum ukuran file adalah 500 KB.`);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        // Set langsung shop_image dengan base64 string
        setFieldValue("shop_image", base64String);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
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
            onSubmit={(values, actions) => {
              try {
                validationSchema.validateSync(values, { abortEarly: false });
                console.log("Submit successful:", values);
                handleSubmit(values);
              } catch (err) {
                console.error("Validation errors:", err);
              }
            }}
          >
            {({ errors, touched, values, handleChange, setFieldValue }) => (
              <Form className="flex flex-col justify-between min-h-[70svh]">
                <div className="flex flex-col gap-15">
                  <div className="relative">
                    <div className="flex items-center gap-10 mb-10">
                      <div className="w-30 h-30 border border-gray bg-light-gray rounded-full relative flex justify-center items-center">
                        {values.shop_image && (
                          <Image
                            src={`${values.shop_image}`}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover object-center rounded-full"
                            alt="Product Image"
                          />
                        )}
                        {!values.shop_image && <FaCamera className="text-dark-gray text-xl" />}
                      </div>
                      <div>
                        <label htmlFor="shop_image" className="text-sm text-primary font-semibold">
                          Upload Shop Image <span className="text-xs text-dark-gray font-normal">(Max. 500 KB)</span>
                        </label>
                        <input
                          id="shop_image"
                          type="file"
                          name="shop_image"
                          multiple
                          accept="image/*"
                          onChange={(event) => handleFileChange(event, values, setFieldValue)}
                          className="hidden"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        name="shop_name"
                        label="Shop Name"
                        value={values.shop_name}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        maxLength={maxLength}
                        className="tablet:text-base "
                      />
                      <p className={`text-red absolute top-full ${touched.shop_name && errors.shop_name ? "visible" : ""}`}>
                        <ErrorMessage name="shop_name" />
                      </p>
                      <div className="w-full flex justify-end mt-2">
                        <span className="text-xs tablet:text-sm text-dark-gray">
                          {values.shop_name.length}/{maxLength}
                        </span>
                      </div>
                    </div>
                    <div className="mt-10 mb-5">
                      <Textarea name="description" label="Shop Description" value={values.description} onChange={handleChange} maxLength={3000} />
                      <p className={`text-red absolute top-full ${touched.description && errors.description ? "visible" : ""}`}>
                        <ErrorMessage name="description" />
                      </p>
                      <div className="w-full flex justify-end mt-2">
                        <span className="text-xs text-dark-gray">
                          {values.description.length}/{3000}
                        </span>
                      </div>
                    </div>
                    {/* <div className="relative">
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
                    <LineDivider className="my-5" /> */}
                    {/* <div className="relative mt-5">
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
                    </div> */}
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
                        name="shop_address_province"
                        onChange={(value) => {
                          setFieldValue("shop_address_province", value);
                          setFieldValue("shop_address_city", "");
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

                      {values.shop_address_province && (
                        <DropdownWithSpinner
                          touched={touched}
                          errors={errors}
                          name="shop_address_city"
                          label="Select City"
                          options={cities}
                          isLoading={isLoadingCities}
                          onSelect={(cityId: number, cityName: string) => {
                            setFieldValue("shop_address_city", cityName);
                            setDistricts([]);
                            setSubdistricts([]);
                            fetchDistricts(cityId);
                          }}
                        />
                      )}

                      {values.shop_address_city && (
                        <DropdownWithSpinner
                          touched={touched}
                          errors={errors}
                          name="shop_address_district"
                          label="Select District"
                          options={districts}
                          isLoading={isLoadingDistricts}
                          onSelect={(districtId: number, districtName: string) => {
                            setFieldValue("shop_address_district", districtName);
                            setSubdistricts([]);
                            fetchSubdistricts(districtId);
                          }}
                        />
                      )}

                      {values.shop_address_district && (
                        <DropdownWithSpinner
                          touched={touched}
                          errors={errors}
                          name="shop_address_subdistrict"
                          label="Select Subdistrict"
                          options={subdistricts}
                          isLoading={isLoadingSubdistricts}
                          onSelect={(subdistrictId: number, subdistrictName: string) => {
                            setFieldValue("shop_address_subdistrict", subdistrictName);
                          }}
                        />
                      )}
                    </div>
                    {/* {values.shop_address_district && (
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
                    )} */}
                    {values.shop_address_subdistrict && (
                      <div className="mt-10 mb-5">
                        <Textarea
                          name="shop_address_street"
                          label="Address Street"
                          value={values.shop_address_street}
                          onChange={handleChange}
                          maxLength={streetMaxLength}
                        />
                        <p className={`text-red absolute top-full ${touched.shop_address_street && errors.shop_address_street ? "visible" : ""}`}>
                          <ErrorMessage name="shop_address_street" />
                        </p>
                        <div className="w-full flex justify-end mt-2">
                          <span className="text-xs text-dark-gray">
                            {values.shop_address_street.length}/{streetMaxLength}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* {values.addressStreet && (
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
                    )} */}
                    <LineDivider className="my-5" />
                    {/* {values.shop_address_street && (
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
                    )} */}
                    {/* {values.email && (
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
                    )} */}
                  </div>
                </div>
                <div className="w-full mt-10 flex justify-between gap-5">
                  <button onClick={() => handlePrev(values)} className="w-full border-gray border rounded font-semibold py-3">
                    Prev
                  </button>
                  <button onClick={() => console.log(values)} className="w-full bg-primary text-white rounded font-semibold py-3">
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
