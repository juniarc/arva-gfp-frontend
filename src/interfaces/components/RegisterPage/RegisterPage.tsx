import HeroImage from "@/../public/images/Farmer-amico.png";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-[90vh] w-screen p-10 desktop:px-[120px] desktop:py-20 flex flex-col desktop:flex-row desktop:items-center desktop:justify-between gap-10 desktop:gap-20">
      <div className="w-full max-h-[280px] desktop:w-[581px] desktop:h-[581px] desktop:max-h-fit px-30 desktop:px-0 aspect-square">
        <Image src={HeroImage} width={1000} height={1000} alt="Login Image" className="w-full h-full object-contain object-center" />
      </div>
      <section className="w-full h-fit desktop:max-w-[500px]">
        <div className="w-full">
          <h2 className="w-full text-center">Create Your Account</h2>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
