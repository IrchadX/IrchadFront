"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/dashboard")) {
      return "Tableau de bord";
    } else if (pathname.startsWith("/admin/users")) {
      return "Gestion des utilisateurs";
    } else if (pathname.startsWith("/admin/environment")) {
      return "Gestion des environnements";
    } else if (pathname.startsWith("/admin/devices")) {
      return "Gestion des dispositifs";
    } else if (pathname.startsWith("/admin/settings")) {
      return "Paramètres";
    }
    return "Title goes in here";
  };

  return (
    <div className="bg-white py-6 xl:py-8 border-b-[#E6EFF5] border-b-[1px] font-futura lg:text-2xl xl:text-3xl sticky top-0 w-full text-black  grid grid-cols-[90%,5%,5%]">
      <div>{getTitle()}</div>
      <Image
        src="/assets/layout/notif.png"
        width={50}
        height={50}
        alt=""
        className="xl:scale-100 scale-75 mx-auto"
      />{" "}
      <Image
        src="/assets/layout/avatar.svg"
        width={50}
        height={50}
        alt=""
        className="xl:scale-100 scale-75 mx-auto"
      />{" "}
    </div>
  );
};

export default Header;
