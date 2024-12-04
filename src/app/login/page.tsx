import "@/styles/homepage.css";
import React from "react";
import LoginImage from "@/interfaces/components/LoginPage/LoginImage";
import LoginForm from "@/interfaces/components/LoginPage/LoginForm";
import LoginSubmitButton from "@/interfaces/components/LoginPage/LoginSubmitButton";

export default function LoginPage() {
  return (
    <main className="flex-row w-full bg-white items-center">
      <section className="w-1/2 flex flex-row justify-center items-center">
        <LoginImage />
      </section>
      <section className="w-1/2 flex flex-row justify-center items-center">
        <LoginForm />
      </section>
    </main>
  );
}
