"use client";

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import dummyBanner1 from "@/../public/images/dummy-banner.jpg";
import dummyBanner2 from "@/../public/images/dummy-banner-2.jpg";
import dummyBanner3 from "@/../public/images/dummy-banner-3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
export default function HomeHero() {
  const heroImages = [dummyBanner1, dummyBanner2, dummyBanner3];
  return (
    <div className="w-full p-10 pb-5 desktop:p-0 desktop:h-[460px]">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Link href="/">
              <div>
                <Image
                  src={image}
                  quality={5}
                  className="w-full h-60 desktop:h-[460px] tablet:h-[330px] object-cover object-center rounded-lg"
                  alt="Banner"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
