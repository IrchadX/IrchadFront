import { IconType } from "react-icons";
import { FiUsers, FiSettings } from "react-icons/fi";
import {
  MdDevices,
  MdOutlineDashboard,
  MdLocalOffer,
  MdInsights,
} from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdLocationOn, MdOutlineDescription } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { TranslationStrings } from "@/lib/translations";

export interface SidebarLink {
  nameKey: string;
  href: string;
  Icon: IconType;
}

// Helper function to get sidebar links with translations
export const getAdminSidebarLinks = (t: TranslationStrings): SidebarLink[] => [
  {
    nameKey: t.navigation.dashboard,
    href: "/admin/dashboard/performance",
    Icon: MdOutlineDashboard,
  },
  {
    nameKey: t.navigation.users,
    href: "/admin/users",
    Icon: FiUsers,
  },
  {
    nameKey: t.navigation.environments,
    href: "/admin/environments",
    Icon: TbWorld,
  },
  {
    nameKey: t.navigation.devices,
    href: "/admin/devices",
    Icon: MdDevices,
  },
  {
    nameKey: t.navigation.settings,
    href: "/admin/settings",
    Icon: FiSettings,
  },
];

export const getCommercialSidebarLinks = (
  t: TranslationStrings
): SidebarLink[] => [
  {
    nameKey: t.navigation.dashboard,
    href: "/commercial/dashboard/performance",
    Icon: MdOutlineDashboard,
  },
  {
    nameKey: t.navigation.clients,
    href: "/commercial/clients",
    Icon: FiUsers,
  },
  {
    nameKey: t.navigation.sales,
    href: "/commercial/sales",
    Icon: FaMoneyBillTrendUp,
  },
  {
    nameKey: t.navigation.offers,
    href: "/commercial/offers",
    Icon: MdLocalOffer,
  },
  {
    nameKey: t.navigation.settings,
    href: "/commercial/settings",
    Icon: FiSettings,
  },
];

export const getDecideurSidebarLinks = (
  t: TranslationStrings
): SidebarLink[] => [
  {
    nameKey: t.navigation.dashboard,
    href: "/decideur/dashboard",
    Icon: MdOutlineDashboard,
  },
  {
    nameKey: t.navigation.zones,
    href: "/decideur/zones",
    Icon: MdLocationOn,
  },
  {
    nameKey: t.navigation.dataAnalysis,
    href: "/decideur/analyse",
    Icon: MdInsights,
  },
  {
    nameKey: t.navigation.reports,
    href: "/decideur/rapports",
    Icon: MdOutlineDescription,
  },
  {
    nameKey: t.navigation.profile,
    href: "/decideur/profile",
    Icon: FiUser,
  },
];

export const adminSidebarLinks: SidebarLink[] = [];
export const commercialSidebarLinks: SidebarLink[] = [];
export const decideurSidebarLinks: SidebarLink[] = [];
