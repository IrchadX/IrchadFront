"use client";
import { usePathname } from "next/navigation";
import { BiBell } from "react-icons/bi"; // BoxIcons (Outline)
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
    }
    return "Décideur";
  };

  return (
    <>
      {!isAuthRoute && (
        <div className="z-50 bg-white py-2 xl:py-3 mb-4 border-b border-[#E6EFF5] text-black font-futura sticky top-0 w-full flex items-center justify-between px-4 xl:px-8">
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
