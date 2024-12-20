import NotFoundImage from "@/../public/images/item-not-found.jpg";
import Image from "next/image";

interface ItemNotFoundProps {
  text: string;
}

export default function ItemNotFound({ text }: ItemNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="desktop:w-[300px] desktop:h-[300px] tablet:w-[500px] tablet:h-[500px] w-[250px] h-[250px] mt-10">
        <Image src={NotFoundImage.src} className="w-full h-full" alt="Item Not Found" width={1000} height={1000} />
      </div>
      <p className="text-xl font-semibold text-center">{text}</p>
    </div>
  );
}
