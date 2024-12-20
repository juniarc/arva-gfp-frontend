"use client";

import { customeTheme } from "@/interfaces/theme/customTheme";
import { LoginBody } from "@/types/types";
import { ErrorMessage, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { object, string } from "yup";
import Image from "next/image";
import { Input, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { RiKey2Line } from "react-icons/ri";
import Link from "next/link";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";
import { useRouter } from "next/navigation";
import api from "@/services/api/api";

const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error" | "idle" | "success">("idle");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = object({
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginBody) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
        window.location.href = "/";
      }
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
                  <div className="w-full mt-5 flex justify-between gap-5">
                    {status === "loading" ? (
                      <div className="w-full py-3  flex items-center justify-center">
                        <Spinner color="green" />
                      </div>
                    ) : (
                      <>
                        <button
                          className={`${!(isValid && dirty) ? "bg-gray" : "bg-primary hover:bg-dark-green transition-colors ease-in"}  w-full text-white font-bold rounded py-5 px-5}`}
                          disabled={!(isValid && dirty)}
                        >
                          Login
                        </button>
                      </>
                    )}
                  </div>
                  <div className="w-full mt-5">
                    <p className="w-full text-center text-xs">Don’t have an account ?</p>
                    <div className="w-full bg-secondary hover:bg-secondary/80 transition-colors ease-in rounded flex items-center justify-center py-5 mt-10">
                      <Link href="/register" className="text-center font-semibold text-primary ">
                        Sign Up
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
