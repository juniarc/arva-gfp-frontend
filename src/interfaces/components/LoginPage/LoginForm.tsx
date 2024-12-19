"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineKey } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import FailAlert from "../alerts/FailAlert";
import SuccessAlert from "../alerts/SuccessAlert";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const router = useRouter();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://capitalist-corliss-revoustudents-ed34d764.koyeb.app/user/allusers"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { username: "", password: "" };

    // Input validation
    if (!username) {
      newErrors.username = "Username cannot be empty";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Password cannot be empty";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Validate credentials
    const user = allUsers.find((user: any) => user.username === username);
    if (user && user.password === password) {
      setLoginError("");
      setLoginSuccess("Login successful! Welcome back.");
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard
      }, 2000);
    } else {
      setLoginSuccess("");
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="w-full max-w-sm p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
      {loginError && <FailAlert message={loginError} />}
      {loginSuccess && <SuccessAlert message={loginSuccess} />}
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
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
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
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-[#5B5B5B] hover:bg-[#969696] text-white font-serif font-semibold py-7 rounded"
        >
          Sign In
        </button>

        {/* Alternative Login Options */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500 py-7">or login with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 py-7 rounded"
        >
          <FcGoogle className="mr-2 text-x2" />
          Login with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mb-4 py-7">Don't have an account?</p>
        <button
          type="button"
          onClick={navigateToRegister}
          className="w-full bg-secondary hover:bg-primary text-black font-serif font-semibold py-7 rounded mb-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
