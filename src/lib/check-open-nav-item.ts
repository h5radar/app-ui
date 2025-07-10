import { NavItem } from "@/types/nav-item";

export default function checkOpenNavItem(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split("?")[0] === item.url ||
    !!item?.items?.filter((i) => i.url === href).length ||
    (href.split("/")[1] !== "" && href.split("/")[1] === item?.url?.split("/")[1]) ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      !!item?.items?.filter((i) => i.url.split("/")[1] === href.split("/")[1]).length)
  );
}
