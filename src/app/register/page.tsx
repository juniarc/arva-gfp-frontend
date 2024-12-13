import "@/styles/homepage.css";
import React from "react";
import RegisterImage from "@/interfaces/components/RegisterPage/RegisterImage";
import RegisterForm from "@/interfaces/components/RegisterPage/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      <section className="w-full lg:w-1/2 flex justify-center items-center px-4">
      <div className="max-w-md w-full">
        <RegisterImage />
        </div>
      </section>
      <section className="w-full lg:w-1/2 flex justify-center items-center px-4">
        <div className="max-w-md w-full">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
