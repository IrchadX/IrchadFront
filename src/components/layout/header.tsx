"use client";
import { usePathname } from "next/navigation";
import { BiBell } from "react-icons/bi";  // BoxIcons (Outline)
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

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
    return "Tableau de bord";
  };

  return (
    <>
      {!isAuthRoute && (
        <div className="z-50 bg-white py-6 xl:py-8 mb-4 border-b-[#E6EFF5] border-b-[1px] font-futura lg:text-2xl xl:text-3xl sticky top-0 w-full text-black  grid grid-cols-[90%,5%,5%]">
          <div>{getTitle()}</div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-main/5 shadow-sm">
  <BiBell className="w-6 h-6 text-gray-500" />
</div>


          <Image
            src="/assets/layout/avatar.svg"
            width={50}
            height={50}
            alt=""
            className="xl:scale-100 scale-75 mx-auto"
          />{" "}
        </div>
      )}{" "}
    </>
  );
};

export default Header;
