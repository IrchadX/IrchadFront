"use client";
import { usePathname } from "next/navigation";
import { BiBell } from "react-icons/bi";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");
  const getTitle = () => {
    if (pathname.startsWith("/decideur/dashboard")) {
      return "Tableau de bord";
    } else if (pathname.startsWith("/decideur/users")) {
      return "Gestion des utilisateurs";
    } else if (pathname.startsWith("/decideur/zones")) {
      return "Fréquentation des zones";
    } else if (pathname.startsWith("/decideur/rapports")) {
      return "Rapports";
    } else if (pathname.startsWith("/decideur/settings")) {
      return "Paramètres";
    } else if (pathname.startsWith("/commercial/clients")) {
      return "Gestion des clients";
    } else if (pathname.startsWith("/commercial/sales")) {
      return "Gestion des ventes";
    } else if (pathname.startsWith("/commercial/offers")) {
      return "Offres";
    } else if (pathname.startsWith("/admin/environments")) {
      return "Gestion des environnements";
    } else if (pathname.startsWith("/admin/users")) {
      return "Gestion des utilisateurs";
    }
  };

  return (
    <>
      {!isAuthRoute && (
        <div className="bg-white dark:bg-black text-black dark:text-white  z-50 py-2 xl:py-3 mb-4 border-b border-[#E6EFF5] text-black font-futura sticky top-0 w-full flex items-center justify-between ">
          <div className="text-xl xl:text-2xl">{getTitle()}</div>
          <div className="flex items-center gap-4">
            <Image
              src="/assets/layout/notif.png"
              width={50}
              height={50}
              alt="Notification"
              className="xl:scale-100 scale-75"
            />
            <Image
              src="/assets/layout/avatar.svg"
              width={50}
              height={50}
              alt="Avatar"
              className="xl:scale-100 scale-75"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
