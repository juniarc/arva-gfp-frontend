"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineKey } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { addUser } from "@/services/api/dummyUser";
import Link from "next/link";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [registrationError, setRegistrationError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };

    if (!username) {
      newErrors.username = "Username cannot be empty";
      hasError = true;
    }

    if (!email) {
      newErrors.email = "Email cannot be empty";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password cannot be empty";
      hasError = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // simulasi POST user
    const errorMessage = addUser(username, email, password);
    if (errorMessage) {
      router.push("/register/register-failed");
    } else {
      router.push("/register/register-success");
    }
  };

  return (
    <div className="w-full max-w-sm p-4">
      <h2 className="text-2xl font-bold mb-6 text-center py-7">Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-6">
          <div className="flex items-center border-b-2 border-gray-300 py-7">
            <HiOutlineUser className="mr-2 text-gray-500" />
            <input
              type="text"
              id="username"
              name="username"
              className="w-full bg-transparent outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <div className="flex items-center border-b-2 border-gray-300 py-7">
          <TfiEmail className="mr-2 text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-transparent outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <div className="flex items-center border-b-2 border-gray-300 py-7">
            <HiOutlineKey className="mr-2 text-gray-500" />
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-transparent outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <HiMiniEyeSlash className="ml-2 text-gray-500 cursor-pointer" />
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <div className="flex items-center border-b-2 border-gray-300 py-7">
            <HiOutlineKey className="mr-2 text-gray-500" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-transparent outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <HiMiniEyeSlash className="ml-2 text-gray-500 cursor-pointer" />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#5B5B5B] hover:bg-[#969696] text-white font-serif font-semibold py-7 rounded"
        >
          Sign Up
        </button>

        {/* Divider with Lines */}
        <div className="flex items-center my-6 py-7">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500">or Sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 py-7 rounded"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign up with Google
        </button>

        {/* Login Prompt */}
        <p className="text-center text-gray-600 mt-4 py-7">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-primary hover:underline"
          >
            <Link href="/login">Log In</Link>
          </button>
        </p>
      </form>
    </div>
  );
}
