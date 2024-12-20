import { User } from "@/types/types";
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import DefaultAvatar from "@/../public/images/dummy-photo-product.jpg";
import { LuUser2 } from "react-icons/lu";
import Image from "next/image";
import LineDivider from "@/interfaces/components/dividers/LineDivider";
import { AiOutlineLogout } from "react-icons/ai";

interface UserNavDesktopProps {
  user: User;
}
export default function UserNavDesktop({ user }: UserNavDesktopProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!user)
    return (
      <a
        href="/login"
        className="flex items-center justify-center gap-3 rounded-lg py-2 px-4 hover:bg-light-gray transition ease-in-out duration-300"
      >
        <LuUser2 className="text-xl" />
        <span>Login</span>
      </a>
    );
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <button className="flex items-center justify-center gap-3 bg-light-gray rounded-lg py-2 px-4 hover:bg-light-gray transition ease-in-out duration-300 max-w-[144px]">
          <span className="w-12 h-12 relative">
            <Image
              src={user.profile_image || DefaultAvatar}
              width={24}
              height={24}
              alt="Cart Icon"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </span>
          <span className="font-semibold truncate text-xxs">{user.username}</span>
        </button>
      </PopoverHandler>
      <PopoverContent className="min-w-[261px] min-h-[100px] z-50 shadow-lg">
        <div className="w-full h-full p-10">
          <div className="flex items-center gap-10">
            <div className="w-21 h-21">
              <Image
                src={user.profile_image || DefaultAvatar}
                width={42}
                height={42}
                alt="Cart Icon"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
            <div>
              <p className="text-black font-semibold">{user.username}</p>
              <p className="text-dark-gray text-xs lowercase">{user.email}</p>
            </div>
          </div>
          <LineDivider className="my-10" />
          <div>
            <button onClick={handleLogout} className="flex items-center gap-8 mt-auto text-red hover:text-red/80">
              <AiOutlineLogout className="text-xl tablet:text-[2rem]" />
              <p>Log Out</p>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
