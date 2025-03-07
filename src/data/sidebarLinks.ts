// sidebarLinks.ts
export interface SidebarLink {
  name: string;
  href: string;
  iconLink: string;
}

export const adminSidebarLinks: SidebarLink[] = [
  {
    name: "Tableau de Bord",
    href: "/dashboard",
    iconLink: "/assets/layout/dashboard.png",
  },
  {
    name: "Utilisateurs",
    href: "/users",
    iconLink: "/assets/layout/users.png",
  },
  {
    name: "Environnements",
    href: "/environments",
    iconLink: "/assets/layout/envs.png",
  },
  {
    name: "Dispositifs",
    href: "/devices",
    iconLink: "/assets/layout/devices.png",
  },
  {
    name: "Paramètres",
    href: "/settings",
    iconLink: "/assets/layout/settings.png",
  },
];
