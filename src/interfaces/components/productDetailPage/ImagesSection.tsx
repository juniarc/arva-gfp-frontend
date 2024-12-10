"use client";

import { useState } from "react";
import Image from "next/image";
import React from "react";

export default function ImagesSection({ imageUrl }: { imageUrl: string[] }) {
  const [selectedImage, setSelectedImage] = useState(imageUrl[0]);
  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <div className="w-full tablet:px-[150px]">
      <div className="w-full aspect-square">
        <Image src={selectedImage} width={300} height={300} className="w-full h-full object-cover object-center" alt="Product Image" />
      </div>
      <div className="w-auto max-w-full overflow-x-scroll flex justify-center gap-5 mt-5 tablet:mt-10">
        {imageUrl.map((image, index) => (
          <button onClick={() => handleSelectImage(image)} key={index} className="w-30 tablet:w-[80px] aspect-square rounded">
            <Image
              src={image}
              width={60}
              height={60}
              className={`w-full h-full object-cover object-center rounded ${selectedImage === image && "border-[3px] border-solid border-primary"}`}
              alt="Product Image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
