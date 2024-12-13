"use client"; 

import React, { useState } from "react";
import PhotoProfile from "@/interfaces/components/my-profile/PhotoProfile";
import ProfileInfo from "@/interfaces/components/my-profile/ProfileInfo";
import Address from "@/interfaces/components/my-profile/Address";

export default function ProfilePage() {
  const [alert, setAlert] = useState({ type: "", message: "" });

// save
  const handleSave = (isValid: boolean) => {
    if (isValid) {
      setAlert({
        type: "green",
        message: "Profile Updated Successfully",
      });
    } else {
      setAlert({
        type: "red",
        message: "Profile update failed. Please try again.",
      });
    }
  };

  return (
    <main className="w-full min-h-screen bg-white p-25">
      {/* Alert Box */}
      {alert.message && (
        <div
          className={`p-4 rounded-md text-center ${
            alert.type === "green"
              ? "bg-green-100 text-green-700"
              : alert.type === "red"
              ? "bg-red text-black"
              : "bg-gray text-gray"
          }`}
        >
          {alert.message}
        </div>
      )}

      <section className="mt-6">

        <PhotoProfile onSave={handleSave} />
        <div className="mt-6">
          <ProfileInfo onSave={handleSave} onCancel={() => {}} />
          <div className="mt-6">
            <Address onSave={handleSave} />
          </div>
        </div>
      </section>
    </main>
  );
}
