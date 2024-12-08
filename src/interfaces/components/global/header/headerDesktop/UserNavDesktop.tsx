import { LuUser2 } from "react-icons/lu";
export default function UserNavDesktop() {
  return (
    <button className="flex items-center justify-center gap-3 rounded-lg py-2 px-4 hover:bg-light-gray transition ease-in-out duration-300">
      <LuUser2 className="text-xl" />
      <span>Login</span>
    </button>
  );
}
