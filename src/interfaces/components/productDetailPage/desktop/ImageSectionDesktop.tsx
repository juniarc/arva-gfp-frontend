"use client";

import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function ImagesSectionDesktop({ image }: { image: { image_data: string; image_id: number }[] }) {
  const [selectedImage, setSelectedImage] = useState(image[0].image_data);
  const handleSelectImage = (image_data: string) => {
    setSelectedImage(image_data);
  };

  return (
    <div className="w-full tablet:px-[150px]">
      <div className="w-full  aspect-square">
        <Image src={selectedImage} width={700} height={700} className="w-full h-full object-cover object-center rounded-lg" alt="Product Image" />
      </div>
      <div className="mt-10">
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={"auto"}>
          {image.map((item, index) => (
            <SwiperSlide className="w-auto mr-5" key={index}>
              <button
                onClick={() => handleSelectImage(item.image_data)}
                key={index}
                className="w-30 desktop:h-30 tablet:w-[80px] aspect-square rounded"
              >
                <Image
                  src={item.image_data}
                  width={60}
                  height={60}
                  className={`w-full h-full object-cover object-center rounded desktop:rounded-lg ${selectedImage === item.image_data && "border-[3px] border-solid border-primary"}`}
                  alt="Product Image"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
