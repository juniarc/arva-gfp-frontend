"use client";

import "swiper/css";
import React from "react";
import AdsItem from "./AdsItem";
import dummyAdsPhoto from "@/../public/images/dummy-ads.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeAds() {
  const adsData = [
    {
      image: dummyAdsPhoto,
      category: "fruit",
      teks: "Healty Fruits",
    },
    {
      image: dummyAdsPhoto,
      category: "fruit",
      teks: "Healty Fruits",
    },
    {
      image: dummyAdsPhoto,
      category: "fruit",
      teks: "Healty Fruits",
    },
  ];
  return (
    <div className="mx-10 mb-10">
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        {adsData.map((item, index) => (
          <SwiperSlide key={index} className="w-auto">
            <AdsItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
