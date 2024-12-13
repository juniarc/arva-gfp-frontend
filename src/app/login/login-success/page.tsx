import React from "react";
import Link from "next/link";

export default function LoginSuccess() {
  return (
    <div className="w-full max-w-md mx-auto p-6 text-center">
      {/* Success Message */}
      <p className="mb-6 bg-green-100 border border-green-600 text-green-700 p-4 rounded">
        You have logged in successfully.
      </p>
      
      {/* Go to Dashboard Button */}
      <Link href="/my-profile">
        <button className="bg-green-600 hover:bg-dark-gray text-white py-2 px-4 rounded">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
