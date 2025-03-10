// sidebarLinks.ts
export interface SidebarLink {
  name: string;
  href: string;
  iconLink: string;
}

export const adminSidebarLinks: SidebarLink[] = [
  {
    name: "Tableau de Bord",
    href: "/admin/dashboard",
    iconLink: "/assets/layout/dashboard.png",
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    iconLink: "/assets/layout/users.png",
  },
  {
    name: "Environnements",
    href: "/admin/environments",
    iconLink: "/assets/layout/envs.png",
  },
  {
    name: "Dispositifs",
    href: "/admin/devices",
    iconLink: "/assets/layout/devices.png",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    iconLink: "/assets/layout/settings.png",
  },
];

export const commercialSidebarLinks: SidebarLink[] = [
  {
    name: "Tableau de Bord",
    href: "/commercial/dashboard",
    iconLink: "/assets/layout/dashboard.png",
  },
  {
    name: "Clients",
    href: "/commercial/clients",
    iconLink: "/assets/layout/users.png",
  },
  {
    name: "Ventes",
    href: "/commercial/sales",
    iconLink: "/assets/layout/sales.png",
  },
  {
    name: "Offres",
    href: "/commercial/offers",
    iconLink: "/assets/layout/offers.png",
  },
  {
    name: "Paramètres",
    href: "/commercial/settings",
    iconLink: "/assets/layout/settings.png",
  },
];
