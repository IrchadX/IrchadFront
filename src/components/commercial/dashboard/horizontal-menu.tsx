"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function HorizontalMenu() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Performance Commerciale",
      path: "/commercial/dashboard/performance",
    },
    { name: "Produits", path: "/commercial/dashboard/products" },
    { name: "Zones", path: "/commercial/dashboard/zones" },
  ];

  return (
    <nav className="flex justify-center space-x-8">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={clsx(
            "relative text-sm font-medium transition-colors",
            pathname === item.path
              ? "text-main after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-full after:bg-main " + // Active link styles
                  "dark:text-main-70 dark:after:bg-main-70"
              : "text-gray-700 hover:text-main hover:after:absolute hover:after:left-0 hover:after:bottom-[-2px] hover:after:h-[2px] hover:after:w-full hover:after:bg-main " + // Hover styles
                  "dark:text-gray-300 dark:hover:text-main-70 dark:hover:after:bg-main-70"
          )}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
