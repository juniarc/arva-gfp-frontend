import React from "react";
import Link from "next/link";

export default function RegisterFailed() {
  return (
    <div className="w-full max-w-md mx-auto p-6 text-center">
      {/* Failure Message */}
      <p className="mb-6 bg-light-red border border-red text-red p-4 rounded">
        Registration failed: Email or username already exists.
      </p>
      
      {/* Back to Register Button */}
      <Link href="/register">
        <button className="bg-red hover:bg-dark-gray text-white py-2 px-4 rounded">
          Back to Register
        </button>
      </Link>
    </div>
  );
}
