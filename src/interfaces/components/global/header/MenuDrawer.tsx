import Image from "next/image";
import React from "react";
import { LuX } from "react-icons/lu";
import dummyPhotoProfile from "@/../public/images/dummy-photo-product.jpg";
import DefaultAvatar from "@/../public/images/dummy-photo-product.jpg";
import Link from "next/link";
import MenuDrawerContent from "./MenuDrawerContent";
import { User } from "@/types/types";

interface MenuDrawerProps {
  overlayRef: React.RefObject<HTMLDivElement>;
  menuDrawerRef: React.RefObject<HTMLDivElement>;
  handleCloseDrawer: () => void;
  isOpen: boolean;
  user: User;
}
export default function MenuDrawer({ overlayRef, menuDrawerRef, handleCloseDrawer, isOpen, user }: MenuDrawerProps) {
  const isLogin = user ? true : false;
  return (
    <>
      <div ref={overlayRef} className={`w-screen h-screen bg-black opacity-30 absolute top-0 right-0 ${isOpen ? "block" : "hidden"}`}></div>
      <div
        ref={menuDrawerRef}
        className={`w-56 h-screen max-h-screen bg-white absolute translate-x-full top-0 right-0 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="relative w-full h-full ">
          <button onClick={handleCloseDrawer} className="absolute top-5 right-5 w-15 h-15 tablet:h-30 tablet:w-30 flex items-center justify-center">
            <LuX className="text-base text-white tablet:text-[2rem]" />
          </button>
          {user ? (
            <div className="w-full h-55 tablet:h-[150px] bg-primary px-10 pt-15 tablet:pt-30 pb-10 flex items-center gap-10">
              <div className="w-30 h-30 min-w-30 min-h-30 rounded-full overflow-hidden">
                <Image src={user.profile_image || dummyPhotoProfile} className="w-full h-full object-cover object-center" alt="Profile Image" />
              </div>
              <div>
                <p className="font-bold text-white">{user.username}</p>
                <p className=" text-xxs text-gray lowercase text-wrap">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-55 tablet:h-[150px] bg-primary px-10 pt-15 tablet:pt-30 pb-10 flex items-center gap-10">
              <div className="w-30 h-30 rounded-full overflow-hidden">
                <Image src={dummyPhotoProfile} className="w-full h-full object-cover object-center" alt="Profile Image" />
              </div>
              <Link href="/login" className="font-bold text-white">
                Login
              </Link>
            </div>
          )}
          <MenuDrawerContent isLogin={isLogin} />
        </div>
      </div>
    </>
  );
}
