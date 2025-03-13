import { IconType } from "react-icons";
import { FiUsers, FiSettings } from "react-icons/fi";
import { MdDevices, MdOutlineDashboard } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export interface SidebarLink {
  name: string;
  href: string;
  Icon: IconType;
}

export const adminSidebarLinks: SidebarLink[] = [
  {
    name: "Tableau de Bord",
    href: "/admin/dashboard",
    Icon: MdOutlineDashboard,
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    Icon: FiUsers,
  },
  {
    name: "Environnements",
    href: "/admin/environments",
    Icon: TbWorld,
  },
  {
    name: "Dispositifs",
    href: "/admin/devices",
    Icon: MdDevices,
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    Icon: FiSettings,
  },
];
