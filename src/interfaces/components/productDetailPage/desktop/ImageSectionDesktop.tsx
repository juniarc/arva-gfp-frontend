"use client";

import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function ImagesSectionDesktop({ imageUrl }: { imageUrl: string }) {
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };
  const imageOptions = [
    imageUrl,
    "https://fastly.picsum.photos/id/219/200/200.jpg?hmac=A55nsncpsnDAEPuZjs3_12i2n8HJNZ5-1SVCIN2fAgc",
    "https://fastly.picsum.photos/id/23/200/200.jpg?hmac=IMR2f77CBqpauCb5W6kGzhwbKatX_r9IvgWj6n7FQ7c",
    "https://fastly.picsum.photos/id/506/200/200.jpg?hmac=dqBtp4Vb--C6IUQzyxIaGU15obUuVWySoqiM6c-3Pm8",
    "https://fastly.picsum.photos/id/947/200/200.jpg?hmac=Nso8kNr17S_Y5Rr6XXnifQUmzulyyA29wQXwgsJmb8A",
    "https://fastly.picsum.photos/id/947/200/200.jpg?hmac=Nso8kNr17S_Y5Rr6XXnifQUmzulyyA29wQXwgsJmb8A",
  ];
  return (
    <div className="w-full tablet:px-[150px]">
      <div className="w-full aspect-square">
        <Image src={selectedImage} width={300} height={300} className="w-full h-full object-cover object-center rounded-lg" alt="Product Image" />
      </div>
      <div className="mt-10">
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={"auto"}>
          {imageOptions.map((image, index) => (
            <SwiperSlide className="w-auto mr-5" key={index}>
              <button onClick={() => handleSelectImage(image)} key={index} className="w-30 desktop:h-30 tablet:w-[80px] aspect-square rounded">
                <Image
                  src={image}
                  width={60}
                  height={60}
                  className={`w-full h-full object-cover object-center rounded desktop:rounded-lg ${selectedImage === image && "border-[3px] border-solid border-primary"}`}
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
