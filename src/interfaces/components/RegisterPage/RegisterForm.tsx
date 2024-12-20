"use client";

import { customeTheme } from "@/interfaces/theme/customTheme";
import { LoginBody, RegisterBody } from "@/types/types";
import { ErrorMessage, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { number, object, ref, string } from "yup";
import { Input, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { RiKey2Line } from "react-icons/ri";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import api from "@/services/api/api";
import { useRouter } from "next/navigation";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";

const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function RegisterForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error" | "idle" | "success">("idle");

  const initialValues = {
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = object({
    username: string().required("Username is required"),
    phone_number: number().required("Username is required"),
    email: string().email().required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*]/, "Password must contain at least one special character"),
    confirmPassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (values: any) => {
    const reqBody = {
      username: values.username,
      email: values.email,
      phone_number: values.phone_number.toString(),
      password: values.password,
      role: "user",
    };
    setStatus("loading");
    try {
      await api.regiser(reqBody);

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
      router.push("/login");
    } catch (error) {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }
  };
  return (
    <>
      <div className="w-full mt-10 px-20">
        <DynamicThemeProvider value={customeTheme}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, values, handleChange, isValid, dirty }) => (
              <Form>
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="flex items-center gap-10 ">
                      <div className="pt-4 w-20 h-20 flex items-center justify-center">
                        <FaRegUser />
                      </div>
                      <Input
                        name="username"
                        label="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        className="tablet:text-base "
                        variant="standard"
                      />
                    </div>
                    <p className={`text-red mt-5 pl-[50px] ${touched.username && errors.username ? "visible" : ""}`}>
                      <ErrorMessage name="username" />
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-10 ">
                      <div className="pt-4 w-20 h-20 flex items-center justify-center">
                        <FiPhone />
                      </div>
                      <Input
                        name="phone_number"
                        label="Enter your phone number"
                        value={values.phone_number}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        className="tablet:text-base "
                        variant="standard"
                      />
                    </div>
                    <p className={`text-red mt-5 pl-[50px] ${touched.phone_number && errors.phone_number ? "visible" : ""}`}>
                      <ErrorMessage name="phone_number" />
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-10 ">
                      <div className="pt-6 w-20 h-20 flex items-center justify-center">
                        <IoMailOutline className="text-xl" />
                      </div>
                      <Input
                        name="email"
                        label="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        className="tablet:text-base "
                        variant="standard"
                      />
                    </div>
                    <p className={`text-red mt-5 pl-[50px] ${touched.email && errors.email ? "visible" : ""}`}>
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-10">
                      <div className="pt-4 w-20 h-20 flex items-center justify-center">
                        <RiKey2Line className="text-xl" />
                      </div>
                      <Input
                        name="password"
                        type="password"
                        label="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        className="tablet:text-base "
                        variant="standard"
                      />
                    </div>
                    <p className={`text-red mt-5 pl-[50px] ${touched.password && errors.password ? "visible" : ""}`}>
                      <ErrorMessage name="password" />
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-10">
                      <div className="pt-4 w-20 h-20 flex items-center justify-center">
                        <RiKey2Line className="text-xl" />
                      </div>
                      <Input
                        name="confirmPassword"
                        type="password"
                        label="Confirm your password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        crossOrigin={undefined}
                        className="tablet:text-base "
                        variant="standard"
                      />
                    </div>
                    <p className={`text-red mt-5 pl-[50px] ${touched.confirmPassword && errors.confirmPassword ? "visible" : ""}`}>
                      <ErrorMessage name="confirmPassword" />
                    </p>
                  </div>
                  <div className="w-full mt-5 flex justify-between gap-5">
                    {status === "loading" ? (
                      <div className="w-full py-3  flex items-center justify-center">
                        <Spinner color="green" />
                      </div>
                    ) : (
                      <>
                        <button
                          className={`${!dirty ? "bg-gray" : "bg-primary hover:bg-dark-green transition-colors ease-in"}  w-full text-white font-bold rounded py-5 px-5}`}
                          disabled={!dirty}
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                  <div className="w-full mt-5">
                    <p className="w-full text-center text-xs">Already have an account ?</p>
                    <div className="w-full bg-secondary hover:bg-secondary/80 transition-colors ease-in rounded flex items-center justify-center py-5 mt-10">
                      <Link href="/login" className="text-center font-semibold text-primary ">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </DynamicThemeProvider>
      </div>
      <SuccessAlert isOpen={status === "success"} text="Registration successful" />
      <FailAlert isOpen={status === "error"} text="Registration failed. Try again" />
    </>
  );
}
