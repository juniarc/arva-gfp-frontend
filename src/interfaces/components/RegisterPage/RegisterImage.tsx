import React from "react";
import Image from "next/image";

export default function RegisterImage() {
  return (
    <div className="h-full">
      <div className= "w-[340px]">
        <Image src="/images/Farmer-amico.png" width={1000} height={1000} quality={100} alt="Login Image" className="w-full h-full object-cover p-4" />
      </div>

    </div>
  );
}
