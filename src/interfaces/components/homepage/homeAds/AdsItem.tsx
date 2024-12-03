import Image from "next/image";
import React from "react";
import dummyAdsPhoto from "@/../public/images/dummy-ads.jpg";
import Link from "next/link";

interface AdsItemProps {
  image: any;
  category: string;
  teks: string;
}
export default function AdsItem({ image, category, teks }: AdsItemProps) {
  return (
    <div className="relative max-w-[350px] w-[70vw]  h-[126px] flex items-center p-10">
      <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
        <Image src={image} width={350} height={126} alt={category} className="w-full h-full object-cover object-center rounded-lg" />
      </div>
      <div className="z-10">
        <h3>{teks}</h3>
        <p className="text-xs mb-5">Save up to 20%</p>
        <Link href="*" className="font-semibold bg-primary text-white px-10 py-1 rounded">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
