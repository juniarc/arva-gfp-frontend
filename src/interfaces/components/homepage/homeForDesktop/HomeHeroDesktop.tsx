import HomeHero from "../homeHero/HomeHero";
import dummyBanner1 from "@/../public/images/dummy-banner.jpg";
import dummyBanner2 from "@/../public/images/dummy-banner-2.jpg";
import Image from "next/image";

export default async function HomeHeroDesktop() {
  return (
    <div className="w-full my-10 flex items-start gap-10">
      <div className="max-w-[66%] h-[460px] overflow-hidden rounded-lg">
        <HomeHero />
      </div>
      <div className="max-w-[34%] w-full overflow-hidden ">
        <div className="h-[220px] mb-10">
          <Image src={dummyBanner1} alt="Banner" className="w-full h-full object-cover object-center rounded-lg" />
        </div>
        <div className="h-[220px]">
          <Image src={dummyBanner2} alt="Banner" className="w-full h-full object-cover object-center rounded-lg" />
        </div>
      </div>
    </div>
  );
}
