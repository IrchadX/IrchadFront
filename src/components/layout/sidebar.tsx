"use client";

import {
  getAdminSidebarLinks,
  getCommercialSidebarLinks,
  getDecideurSidebarLinks,
  SidebarLink,
  decideurSidebarLinks,
} from "@/data/sidebarLinks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

const Sidebar = () => {
  const { translations: t } = useLanguage();
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : null;

  const userRole = userData?.role || "guest";
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Logout failed");
      sessionStorage.removeItem("user");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get sidebar links based on user role and current translations
  const getSidebarLinks = (): {
    nameKey: string;
    href: string;
    Icon: any;
  }[] => {
    if (userRole === "admin" || userRole === "super_admin") {
      return getAdminSidebarLinks(t);
    } else if (userRole === "commercial") {
      return getCommercialSidebarLinks(t);
    } else {
      return getDecideurSidebarLinks(t);
    }
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <>
      {!isAuthRoute && (
        <aside className="text-white h-screen overflow-hidden lg:w-60 xl:w-64 p-2 hidden lg:flex flex-col items-center justify-center ">
          <div className="lg:text-md h-[100%] bg-main dark:bg-main-800 w-full rounded-[15px] flex flex-col items-center py-4 ">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="h-[15%] w-full flex items-center justify-center">
              <Image
                src="/assets/logo.svg"
                width={150}
                height={40}
                alt="Company Logo"
                className="mx-auto dark:brightness-90"
              />
            </motion.div>

            {/* Sidebar Links */}
            <div className="w-full h-[45%] flex flex-col justify-between items-center  ">
              {sidebarLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`items-center relative mb-2 flex gap-4 w-full font-medium p-4 rounded-lg transition-colors duration-200 ${
                    pathname.startsWith(link.href)
                      ? "bg-main-600 dark:bg-main-700"
                      : "hover:bg-main-500 dark:hover:bg-main-600"
                  }`}>
                  {pathname.startsWith(link.href) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                      <Image
                        alt="active link indicator"
                        src="/assets/layout/activeLink.svg"
                        width={260}
                        height={50}
                        className="dark:opacity-90"
                      />
                    </div>
                  )}

                  <link.Icon className="text-white w-8 h-8 lg:scale-50 xl:scale-75 dark:text-gray-200" />

                  <Link
                    href={link.href}
                    className="hover:text-gray-200 dark:hover:text-white">
                    {link.nameKey}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Logout Section */}
            <motion.div className="h-[40%] flex flex-col items-center justify-end w-full">
              <div className="flex flex-col border-t border-gray-700 py-6 mx-auto w-full px-4">
                <button
                  onClick={handleSignOut}
                  className="flex gap-2 mx-auto items-center hover:opacity-80 transition-opacity text-gray-200 dark:text-gray-300">
                  <Image
                    src="/assets/layout/logout.svg"
                    width={20}
                    height={20}
                    alt={t.navigation.logout}
                  />
                  <p>{t.navigation.logout}</p>
                </button>
              </div>
            </motion.div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
