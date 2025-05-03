"use client";
import { usePathname } from "next/navigation";
import { BiBell } from "react-icons/bi";
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
    } else if (pathname.startsWith("/admin/devices/unassigned")) {
      return "Dispositifs non associés";
    } else if (pathname.startsWith("/admin/devices")) {
      return "Dispositifs";
    } else if (pathname.startsWith("/admin/settings")) {
      return "Paramètres";
    } else if (pathname.startsWith("/commercial/clients")) {
      return "Gestion des clients";
    } else if (pathname.startsWith("/commercial/sales")) {
      return "Gestion des ventes";
    } else if (pathname.startsWith("/commercial/offers")) {
      return "Offres";
    }
    return "Décideur";
  };

  return (
    <>
      {!isAuthRoute && (
        <div className="z-50 bg-white py-4 mb-4 border-b-[#E6EFF5] border-b-[1px] lg:text-2xl xl:text-3xl sticky font-montserrat top-0 w-full items-center text-main font-semibold  grid grid-cols-[90%,5%,5%]">
          <div>{getTitle()}</div>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-main/5 shadow-sm">
            <BiBell className="w-6 h-6 text-gray-500" />
          </div>
          <Image
            src="/assets/layout/avatar.svg"
            width={40}
            height={40}
            alt=""
            className=" scale-75 mx-auto"
          />{" "}
        </div>
      )}
    </>
  );
};

export default Header;
