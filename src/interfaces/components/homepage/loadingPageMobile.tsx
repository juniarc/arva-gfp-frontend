import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";
import Image from "next/image";

export default function LoadingPageMobile() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full p-10">
        <div className="w-full h-60 tablet:h-[330px] bg-gray flex items-center justify-center animate-pulse rounded-lg"></div>
      </div>
      <div>
        <div className="tes w-auto bg-white p-5 tablet:p-10 rounded-lg shadow-lg mx-10">
          <div className="w-full grid grid-cols-5 gap-7 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
              <CiCoffeeBean className="text-xl tablet:text-[2.5rem]" />
              <span className="text-[0.5rem] tablet:text-base">Seeds</span>
            </div>
            <div className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
              <Image src={SpinachIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
              <span className="text-[0.5rem] tablet:text-base">Vegetables</span>
            </div>
            <div className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px] ">
              <Image src={FruitsIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
              <span className="text-[0.5rem] tablet:text-base">Fruits</span>
            </div>
            <div className="flex flex-col  items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
              <Image src={FertilizersIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
              <span className="text-[0.5rem] tablet:text-base">Fertilizers</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5 tablet:min-h-[120px]">
              <Image src={EquipmentsIcon} className="w-10 h-10 tablet:w-20 tablet:h-20" alt="Spinach Icon" />
              <span className="text-[0.5rem] tablet:text-base">Equipments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="">
          <div className=" animate-pulse rounded bg-gray flex h-15 w-32 items-center justify-between mx-10 mb-8"></div>
          <div className="mx-10 flex items-center gap-10 w-screen max-w-screen overflow-hidden tablet:pr-15">
            <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
              <div className="w-full h-1/2 bg-gray animate-pulse"></div>
              <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
              </div>
            </div>
            <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
              <div className="w-full h-1/2 bg-gray animate-pulse"></div>
              <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
              </div>
            </div>
            <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
              <div className="w-full h-1/2 bg-gray animate-pulse"></div>
              <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
              </div>
            </div>
            <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
              <div className="w-full h-1/2 bg-gray animate-pulse"></div>
              <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
              </div>
            </div>
            <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
              <div className="w-full h-1/2 bg-gray animate-pulse"></div>
              <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
                <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
                <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
                <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="mx-10 mb-10">
          <div className="bg-gray relative max-w-[350px] w-[70vw]  h-[126px] flex items-center p-10"></div>
        </div>
      </div>
      <div className="">
        <div className=" animate-pulse rounded bg-gray flex h-15 w-32 items-center justify-between mx-10 mb-8"></div>
        <div className="mx-10 flex items-center gap-10 w-screen max-w-screen overflow-hidden tablet:pr-15">
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className=" animate-pulse rounded bg-gray flex h-15 w-32 items-center justify-between mx-10 mb-8"></div>
        <div className="mx-10 flex items-center gap-10 w-screen max-w-screen overflow-hidden tablet:pr-15">
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
          <div className="animate-pulse shadow-lg w-56 min-w-56 h-[330px] tablet:w-[224px] tablet:h-[350px] rounded-lg">
            <div className="w-full h-1/2 bg-gray animate-pulse"></div>
            <div className="w-full flex-grow p-5 tablet:p-7 flex flex-col desktop:gap-3">
              <div className="bg-gray w-20 h-6 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-full h-8 animate-pulse rounded mb-15"></div>
              <div className="bg-gray w-30 h-7 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-24 h-8 animate-pulse rounded mb-3"></div>
              <div className="bg-gray w-15 h-8 animate-pulse rounded mb-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
