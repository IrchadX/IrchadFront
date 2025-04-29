import { IconType } from "react-icons";
import { FiUsers, FiSettings } from "react-icons/fi";
import { MdDevices, MdOutlineDashboard, MdLocalOffer } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdLocationOn, MdOutlineDescription } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FiUser } from "react-icons/fi";

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

export const commercialSidebarLinks: SidebarLink[] = [
  {
    name: "Tableau de Bord",
    href: "/commercial/dashboard",
    Icon: MdOutlineDashboard,
  },
  {
    name: "Clients",
    href: "/commercial/clients",
    Icon: FiUsers,
  },
  {
    name: "Ventes",
    href: "/commercial/sales",
    Icon: FaMoneyBillTrendUp,
  },
  {
    name: "Offres",
    href: "/commercial/offers",
    Icon: MdLocalOffer,
  },
  {
    name: "Paramètres",
    href: "/commercial/settings",
    Icon: FiSettings,
  },
];
export const decideurSidebarLinks: SidebarLink[] = [
  {
    name: "Tableau de Bord",
    href: "/decideur/dashboard",
    Icon: MdOutlineDashboard,
  },

  {
    name: "Zones",
    href: "/decideur/zones",
    Icon: MdLocationOn, 
  },
  {
    name: "Rapports",
    href: "/decideur/rapports",
    Icon: MdOutlineDescription, 
    },
  {
    name: "Profil",
    href: "/decideur/profile",
    Icon: FiUser,
  },
];
