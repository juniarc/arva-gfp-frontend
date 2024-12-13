"use client";

import React, { useState } from "react";

interface Props {
  onSave: (isValid: boolean) => void;
  onCancel: () => void;
}

export default function ProfileInfo({ onSave, onCancel }: Props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [isSaved, setIsSaved] = useState(false); 
  const [showConfirmCancel, setShowConfirmCancel] = useState(false); 

  const [errors, setErrors] = useState({ name: "", phone: "" });

  const handleSave = () => {
    let isValid = true;
    let newErrors = { name: "", phone: "" };

 
    if (!name) {
      isValid = false;
      newErrors.name = "Name cannot be empty";
    }
    if (!phone) {
      isValid = false;
      newErrors.phone = "Phone number cannot be empty";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSaved(true); 
      setIsEditing(false); 
      setShowConfirmCancel(false); 
      onSave(isValid);
    } else {
      onSave(isValid); 
    }
  };

  const handleCancel = () => {
    if (isSaved) {
      setIsEditing(false); 
    } else {
      setShowConfirmCancel(true); 
    }
  };

  const confirmCancel = () => {
    setIsEditing(false);
    setShowConfirmCancel(false); 
    setName(""); 
    setPhone("");
    onCancel();
  };

  const cancelEdit = () => {
    setShowConfirmCancel(false); 
  };

  return (
    <div className="pb-10 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Profile Info</h2>
        <div className="flex space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)} 
              className="text-green-500"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {showConfirmCancel && !isSaved && (
        <div className="mb-4 p-4 bg-gray-100 border rounded border-gray">
          <p className="text-center text-gray-700">
            Are you sure you want to cancel the changes?
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={confirmCancel}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              No
            </button>
          </div>
        </div>
      )}

      {errors.name && (
        <p className="text-red text-right text-sm mb-2">{errors.name}</p>
      )}
      <div className="flex items-center mb-4">
        <label className="w-1/3 text-gray-500">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing} 
          className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
          placeholder="Name"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-1/3 text-gray-500">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled
          className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-1/3 text-gray-500">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
          className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
          placeholder="Email"
        />
      </div>

      {errors.phone && (
        <p className="text-red text-right text-sm mb-2">{errors.phone}</p>
      )}
      <div className="flex items-center mb-4">
        <label className="w-1/3 text-gray-500">Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!isEditing} 
          className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
          placeholder="Phone Number"
        />
      </div>

    </div>
  );
}
