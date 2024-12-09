import "@/styles/homepage.css";
import React from "react";
import LoginImage from "@/interfaces/components/LoginPage/LoginImage";
import LoginForm from "@/interfaces/components/LoginPage/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      {/* Section for Login Image */}
      <section className="w-full lg:w-1/2 flex justify-center items-center px-4">
      <div className="max-w-md w-full">
        <LoginImage />
        </div>
      </section>
      {/* Section for Login Form */}
      <section className="w-full lg:w-1/2 flex justify-center items-center px-4">
        <div className="max-w-md w-full">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
