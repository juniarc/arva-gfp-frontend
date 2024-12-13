"use client";

import React, { useState } from "react";

interface PhotoProfileProps {
  onSave: (isValid: boolean) => void;
  onCancel: () => void;
}

export default function PhotoProfile({ onSave, onCancel }: PhotoProfileProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [isSaved, setIsSaved] = useState(false); 


  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setIsPhotoChanged(true);
      setIsSaved(false); 
    }
  };


  const handleSave = () => {
    if (photo) {
      setIsSaved(true); 
      onSave(true); 
    } else {
      onSave(false); 
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsPhotoChanged(false);
    setPhoto(null); 
    onCancel(); 
  };

  return (
    <div className="flex flex-col items-center mt-6 py-8">
      <div className="relative">
        <img
          src={photo ? URL.createObjectURL(photo) : "/default-avatar.png"}
          alt="InsertProfile Photo"
          className="w-32 h-32 rounded-bl-3xl object-cover text-center"
        />
      </div>

    
      <label
        htmlFor="file-input"
        className="mt-4 text-primary cursor-pointer text-xl font-semibold"
      >
        Change Profile Photo
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleChangePhoto}
        className="hidden"
      />

      
      {!isSaved && isPhotoChanged && (
        <div className="mt-4 flex space-x-4">
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
        </div>
      )}

   
      {isSaved && !isPhotoChanged && (
        <div className="mt-4 text-green-500">
          Photo saved successfully! You can change it again.
        </div>
      )}
    </div>
  );
}
