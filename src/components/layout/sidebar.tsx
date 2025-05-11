"use client";
import {
  adminSidebarLinks,
  commercialSidebarLinks,
  SidebarLink,
} from "@/data/sidebarLinks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { decideurSidebarLinks } from "@/data/sidebarLinks";
import { useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  // Get user data from sessionStorage
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : null;

  const userRole = userData?.role || "guest";
  console.log(userRole);
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  const handleSignOut = async () => {
    try {
      // Call your logout API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear client-side storage
      sessionStorage.removeItem("user");

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show error to user
    }
  };

  const sidebarLinks: SidebarLink[] =
    userRole === "admin" || userRole === "super_admin"
      ? adminSidebarLinks
      : userRole === "commercial"
      ? commercialSidebarLinks
      : decideurSidebarLinks;

  useEffect(() => {}, [userRole]);

  return (
    <>
      {!isAuthRoute && (
        <aside className="text-white h-screen overflow-hidden lg:w-60 xl:w-64 p-2 hidden lg:flex flex-col items-center justify-center">
          <div className="lg:text-md h-[100%] bg-main w-full rounded-[15px] flex flex-col items-center py-4">
            {/* Logo Section */}
            <motion.div whileHover={{ scale: 1.05 }} className="h-[15%] w-full">
              <Image
                src="/assets/logo.svg"
                width={150}
                height={40}
                alt=""
                className="mx-auto"
              />
            </motion.div>

            {/* Sidebar Links */}
            <div className="w-full h-[45%] flex flex-col justify-between items-center">
              {sidebarLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`items-center relative mb-2 flex gap-4 w-full font-medium p-4 rounded-lg transition-colors duration-200`}>
                  {/* Active Link Indicator */}
                  {pathname.startsWith(link.href) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                      <Image
                        alt="active link indicator"
                        src="/assets/layout/activeLink.svg"
                        width={260}
                        height={50}
                      />
                    </div>
                  )}

                  {/* Render React Icon Instead of Image */}
                  <link.Icon className="text-white w-8 h-8 lg:scale-50 xl:scale-75" />

                  {/* Link */}
                  <Link href={link.href} className="hover:text-black">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Logout Section */}
            <motion.div className="h-[40%] flex flex-col items-center justify-end w-full">
              <div className="flex flex-col border-t-border border-t-[1px] py-6 mx-auto w-full">
                <button
                  onClick={handleSignOut}
                  className="flex gap-2 mx-auto hover:opacity-80 transition-opacity">
                  <Image
                    src="/assets/layout/logout.svg"
                    width={20}
                    height={20}
                    alt="Logout"
                  />
                  <p>Se déconnecter</p>
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
