import { Barcode, Copyright, LayoutDashboard, LucideShoppingBag, Ruler, Settings } from "lucide-react";

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
        title: "Compliances",
        url: "/compliances",
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
];
