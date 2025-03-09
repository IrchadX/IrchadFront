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
