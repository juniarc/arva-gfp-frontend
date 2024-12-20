import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string, boolean } from "yup";
import { Input } from "@material-tailwind/react";
import { customeTheme } from "@/interfaces/theme/customTheme";
import dynamic from "next/dynamic";

interface IdentitiyFormProps {
  initialValues: { name: string; ktp: string; agreement: boolean };
  handleSubmit: (values: { name: string; ktp: string; agreement: boolean }) => void;
}
const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function IdentityFrom({ initialValues, handleSubmit }: IdentitiyFormProps) {
  const validationSchema = object({
    name: string().required("Name is required"),
    ktp: string().max(16).required("IC Number is required"),
    agreement: boolean().oneOf([true]).required("Agreement is required"),
  });

  return (
    <div className="mt-10 ">
      <h5 className="font-bold text-center w-full mb-10 ">Identity Form</h5>
      <div>
        <DynamicThemeProvider value={customeTheme}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ errors, touched, values, handleChange }) => (
              <Form className="flex flex-col justify-between min-h-[70svh]">
                <div className="flex flex-col gap-15">
                  <div className="relative">
                    <Input
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      crossOrigin={undefined}
                      className="tablet:text-base"
                    />
                    <p className={`text-red absolute top-full ${touched.name && errors.name ? "visible" : ""}`}>
                      <ErrorMessage name="name" />
                    </p>
                  </div>
                  <div className="relative">
                    <Input
                      label="IC Number (KTP)"
                      name="ktp"
                      value={values.ktp}
                      onChange={handleChange}
                      crossOrigin={undefined}
                      className="tablet:text-base"
                    />
                    <p className={`text-red absolute top-full ${touched.ktp && errors.ktp ? "visible" : ""}`}>
                      <ErrorMessage name="ktp" />
                    </p>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <Field type="checkbox" name="agreement" />
                    <label htmlFor="agreement" className="text-xs text-dark-gray capitalize">
                      I agree to the terms and conditions
                    </label>
                    <p className={`text-red absolute top-full ${touched.ktp && errors.ktp ? "visible" : ""}`}>
                      <ErrorMessage name="agreement" />
                    </p>
                  </div>
                </div>
                <div className="w-full mt-10 flex justify-between gap-5">
                  <button className="w-full border-gray border rounded font-semibold py-3" disabled>
                    Prev
                  </button>
                  <button type="submit" disabled={false} className="w-full bg-primary text-white rounded font-semibold py-3">
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
