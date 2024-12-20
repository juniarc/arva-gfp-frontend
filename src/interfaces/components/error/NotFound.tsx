import Image from "next/image";
import NotFoundImage from "@/../public/images/404-error.png";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="desktop:w-[300px] desktop:h-[300px] tablet:w-[500px] tablet:h-[500px] w-[250px] h-[250px] mt-10">
        <Image src={NotFoundImage.src} className="w-full h-full" alt="Item Not Found" width={1000} height={1000} />
      </div>
      <p className="text-xl font-semibold">Oops, Page Not Found</p>
      <Link href="/" className="text-white bg-primary font-semibold px-20 py-3 rounded mt-10 hover:bg-dark-green transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
