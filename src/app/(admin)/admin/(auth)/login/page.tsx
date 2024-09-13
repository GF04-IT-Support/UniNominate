import Image from "next/image";
import LoginCard from "@/components/pages/admin/login/LoginCard";

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/loginbackground.png"
        alt="Login Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="z-10 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">KNUST Nomination System</h1>
        <p className="text-xl mb-8">Admin Portal</p>
        <LoginCard />
      </div>
      <div className="text-sm z-10 text-white mt-10">
        &copy; {new Date().getFullYear()} KNUST Nomination System. All rights
        reserved.
      </div>
    </div>
  );
}
