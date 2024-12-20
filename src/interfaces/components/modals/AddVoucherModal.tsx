"use client";

import { customeTheme } from "@/interfaces/theme/customTheme";
import { Dialog, DialogBody, Input, Spinner } from "@material-tailwind/react";
import { format } from "date-fns";
import { ErrorMessage, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { LuX } from "react-icons/lu";
import { date, number, object, string } from "yup";

const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

const DatePicker = ({ name, selectedDate, onDateChange, label }: any) => {
  return (
    <div className="mt-10">
      <div>
        <div>
          <Input
            type="date"
            label={label}
            value={selectedDate ? format(new Date(selectedDate), "yyyy-MM-dd") : ""}
            onChange={(e) => onDateChange(new Date(e.target.value))} // Input tidak digunakan untuk mengubah nilai langsung
            crossOrigin={undefined}
          />
        </div>
      </div>
    </div>
  );
};
export interface InitialValues {
  voucher_name: string;
  voucher_value: number;
  start_date: string;
  end_date: string;
}

interface AddVoucherModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  initialValues: InitialValues;
  addVoucherStatus: "idle" | "loading" | "success" | "error";
  handleSubmit: (values: any) => void;
}

export default function AddVoucherModal({ isOpen, handleCloseModal, initialValues, handleSubmit, addVoucherStatus }: AddVoucherModalProps) {
  const validationSchema = object({
    voucher_name: string().required("Vocuher Name is required"),
    voucher_value: number().required("Voucher Value is required"),
    start_date: date().typeError("Start Date is not valid"),
    end_date: date()
      .typeError("End Date is not valid")
      .test("is-later", "End Date can not less than Start Date", function (value) {
        const { start_date } = this.parent;
        return !value || new Date(value) >= new Date(start_date); // validate start_date < end_date
      }),
  });
  return (
    <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15 desktop:p-20 overflow-visible">
      <button onClick={handleCloseModal} className="absolute top-5 right-5 z-10">
        <LuX className="tablet:text-[2rem]" />
      </button>
      <DialogBody className="text-black font-normal max-h-[70vh] overflow-y-scroll">
        <div className="mt-10 desktop:mt-0 ">
          <h5 className="font-bold text-center w-full mb-10 ">Add Voucher</h5>
          <div>
            <DynamicThemeProvider value={customeTheme}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                  handleCloseModal();
                }}
              >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                  <Form className="flex flex-col justify-between">
                    <div className="flex flex-col gap-15">
                      <div className="relative">
                        <div className="relative">
                          <Input
                            name="voucher_name"
                            label="Voucher Name"
                            value={values.voucher_name}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            maxLength={30}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${touched.voucher_name && errors.voucher_name ? "visible" : ""}`}>
                            <ErrorMessage name="voucher_name" />
                          </p>
                          <div className="w-full flex justify-end mt-2">
                            <span className="text-xs tablet:text-sm text-dark-gray">
                              {values.voucher_name.length}/{30}
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <Input
                            name="voucher_value"
                            label="Voucher Value (%)"
                            type="number"
                            value={values.voucher_value}
                            onChange={handleChange}
                            crossOrigin={undefined}
                            className="tablet:text-base "
                          />
                          <p className={`text-red absolute top-full ${touched.voucher_value && errors.voucher_value ? "visible" : ""}`}>
                            <ErrorMessage name="voucher_value" />
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
                    <div className="w-full mt-10 flex justify-between gap-5">
                      {addVoucherStatus === "loading" ? (
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
