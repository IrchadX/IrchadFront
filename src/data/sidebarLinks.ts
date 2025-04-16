import { IconType } from "react-icons";
import { FiUsers, FiSettings } from "react-icons/fi";
import { MdDevices, MdOutlineDashboard, MdLocalOffer } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
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
    Icon: FiSettings,
  },
  {
    name: "Utilisateurs",
    href: "/decideur/users",
    Icon: FiSettings,
  },
  {
    name: "Fréquentation des zones",
    href: "/decideur/zones",
    Icon: FiSettings,
  },
  {
    name: "Rapports",
    href: "/decideur/rapports",
    Icon: FiSettings,
  },
  {
    name: "Paramètres",
    href: "/decideur/settings",
    Icon: FiSettings,
  },
];
