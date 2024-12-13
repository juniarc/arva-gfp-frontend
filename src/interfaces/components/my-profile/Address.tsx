"use client";

import React, { useState } from "react";

interface Props {
  onSave: (isValid: boolean) => void;
  onCancel: () => void;
}

export default function Address({ onSave, onCancel }: Props) {
  const [street, setStreet] = useState("username");
  const [state, setState] = useState("Manggarai");
  const [city, setCity] = useState("DKI Jakarta");
  const [zip, setZip] = useState("123456");
  const [isEditing, setIsEditing] = useState(false); 
  const [isSaved, setIsSaved] = useState(false); 
  const [showConfirmCancel, setShowConfirmCancel] = useState(false); 

  const handleSave = () => {
    // Validate fields
    const isValid = street && state && city && zip;
    if (isValid) {
      setIsSaved(true); 
      setIsEditing(false); 
      setShowConfirmCancel(false); 
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
    setStreet("username"); 
    setState("Manggarai");
    setCity("DKI Jakarta");
    setZip("123456");
    onCancel();
  };

  const cancelEdit = () => {
    setShowConfirmCancel(false); 
  };

  return (
    <div className="pb-10 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Address</h2>
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

     
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <label className="w-1/3 text-gray-500">Address Street:</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={!isEditing} 
            className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
            placeholder="Street"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3 text-gray-500">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={!isEditing} 
            className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
            placeholder="State"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3 text-gray-500">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!isEditing} 
            className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
            placeholder="City"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3 text-gray-500">Zip Code:</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            disabled={!isEditing} 
            className="w-2/3 border border-gray-300 p-2 rounded-lg text-black"
            placeholder="Zip Code"
          />
        </div>
      </div>
    </div>
  );
}
