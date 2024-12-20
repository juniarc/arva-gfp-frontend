"use client";

import { useState } from "react";
import Image from "next/image";
import React from "react";

export default function ImagesSection({ image }: { image: { image_data: string; image_id: number }[] }) {
  const [selectedImage, setSelectedImage] = useState(image[0].image_data);
  const handleSelectImage = (image_data: string) => {
    setSelectedImage(image_data);
  };
  return (
    <div className="w-full tablet:px-[150px]">
      <div className="w-full aspect-square">
        <Image src={selectedImage} width={300} height={300} className="w-full h-full object-cover object-center" alt="Product Image" />
      </div>
      <div className="w-auto max-w-full overflow-x-scroll flex justify-center gap-5 mt-5 tablet:mt-10">
        {image.map((item, index) => (
          <button onClick={() => handleSelectImage(item.image_data)} key={index} className="w-30 tablet:w-[80px] aspect-square rounded">
            <Image
              src={item.image_data}
              width={60}
              height={60}
              className={`w-full h-full object-cover object-center rounded ${selectedImage === item.image_data && "border-[3px] border-solid border-primary"}`}
              alt="Product Image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
