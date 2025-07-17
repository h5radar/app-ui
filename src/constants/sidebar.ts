import {
  Activity,
  Barcode,
  Copyright,
  Cpu,
  Handshake,
  LayoutDashboard,
  LogIn,
  LucideShoppingBag,
  Ruler,
  Settings,
  UserPen,
  Wallet,
} from "lucide-react";

import { NavItem } from "@/types/nav-item";

/*
 * The data for account sidebar and cmd k bar.
 */
export const accountNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/account",
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: LayoutDashboard,
    items: [],
  },
];

/*
 * The data for billing sidebar and cmd k bar.
 */
export const billingNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/billing",
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: LayoutDashboard,
    items: [],
  },
];

/*
 * The data for billing sidebar and cmd k bar.
 */
export const notificationsNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/notifications",
    icon: LayoutDashboard,
    items: [],
  },
];

/*
 * The data for radar sidebar and cmd k bar.
 */
export const radarNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Products",
    url: "/products",
    icon: Barcode,
    items: [],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    items: [
      {
        title: "Practices",
        url: "/practices",
        icon: Ruler,
        items: [],
      },
      {
        title: "Licenses",
        url: "/licenses",
        icon: Copyright,
        items: [],
      },
      {
        title: "Technologies",
        url: "/technologies",
        icon: LucideShoppingBag,
        items: [],
      },
      {
        title: "Maturities",
        url: "/maturities",
        icon: LucideShoppingBag,
        items: [],
      },
      {
        title: "Segments",
        url: "/segments",
        icon: LucideShoppingBag,
        items: [],
      },
    ],
  },
  {
    title: "Contributions",
    url: "#",
    icon: Activity,
    items: [
      {
        title: "Git repos",
        url: "/repositories",
        icon: UserPen,
      },
      {
        title: "Platforms",
        url: "/platforms",
        icon: LogIn,
      },
      {
        title: "Teams",
        url: "/teams",
        icon: LogIn,
      },
      {
        title: "Authors",
        url: "/authors",
        icon: LogIn,
      },
    ],
  },
  {
    title: "Technologies",
    url: "#",
    icon: Cpu,
    items: [
      {
        title: "Radars",
        url: "/radars",
        icon: LucideShoppingBag,
        items: [],
      },
      {
        title: "Rings",
        url: "/rings",
        icon: LucideShoppingBag,
        items: [],
      },
      {
        title: "Segments",
        url: "/segments",
        icon: LucideShoppingBag,
        items: [],
      },
      {
        title: "Technology blips",
        url: "/technology-blips",
        icon: LucideShoppingBag,
        items: [],
      },
    ],
  },
  {
    title: "Practices",
    url: "#",
    icon: Ruler,
    items: [
      {
        title: "Cobwebs",
        url: "/cobwebs",
        icon: Ruler,
        items: [],
      },
      {
        title: "Rays",
        url: "/rays",
        icon: Ruler,
        items: [],
      },
    ],
  },
  {
    title: "Licenses",
    url: "#",
    icon: Copyright,
    items: [
      {
        title: "Pie charts",
        url: "/pies",
        icon: Copyright,
        items: [],
      },
    ],
  },
  {
    title: "Communications",
    url: "#",
    icon: Handshake,
    items: [
      {
        title: "Channels",
        url: "/channels",
        icon: Handshake,
      },
      {
        title: "Participants",
        url: "/participants",
        icon: Handshake,
      },
    ],
  },
  {
    title: "Finances",
    url: "#",
    icon: Wallet,
    items: [
      {
        title: "BI systems",
        url: "/bi-systems",
        icon: Wallet,
      },
    ],
  },
  {
    title: "Adapters",
    url: "/adapters",
    icon: Settings,
  },
];
