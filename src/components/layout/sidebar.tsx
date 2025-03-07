"use client";
import { adminSidebarLinks } from "@/data/sidebarLinks";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="text-white h-screen overflow-hidden lg:w-60 xl:w-64 p-2 hidden lg:flex flex-col items-center justify-center">
      <div className="lg:text-md  h-[100%] bg-main w-full rounded-[15px] flex flex-col items-center py-4">
        <div className="h-[15%] w-full">
          <Image
            src="/assets/logo.svg"
            width={150}
            height={40}
            alt=""
            className="mx-auto"
          />
        </div>
        <div className="w-full h-[45%] flex flex-col justify-between items-center">
          {adminSidebarLinks.map((link, index) => (
            <div
              key={index}
              className={`relative mb-2 flex gap-4 w-full font-medium p-4 rounded-lg transition-colors duration-200 `}>
              {pathname.startsWith(link.href) && (
                <Image
                  alt="active link indicator"
                  src="/assets/layout/activeLink.svg"
                  width={260}
                  height={50}
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                />
              )}
              <Image
                src={link.iconLink}
                width={30}
                height={40}
                alt=""
                className="lg:scale-50 xl:scale-75 "
              />
              <a href={link.href} className="hover:text-black">
                {link.name}
              </a>
            </div>
          ))}
        </div>
        <div className="h-[40%] flex flex-col items-center justify-end w-full">
          <div className="flex flex-col border-t-border border-t-[1px] py-6 mx-auto w-full">
            <div className="flex gap-2 mx-auto">
              <Image
                src="/assets/layout/logout.svg"
                width={20}
                height={20}
                alt=""
              />
              <p>Se déconnecter</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
