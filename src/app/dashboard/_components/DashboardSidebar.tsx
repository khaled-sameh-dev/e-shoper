"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";
import AnimatedToggleText from "@/app/(public)/_components/AnimatedToggleText";
import NavigationLinks from "./NavigationLinks";


const DashboardSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" className=" bg-white shadow-md py-2">
      <SidebarHeader className="py-6 px-3 border-b border-black/10">
        <Link href={"/"}>
          <p className="text-2xl font-bold text-main-blue">
            <span className="py-1 px-3  rounded bg-main-blue mr-1 text-white">
              E
            </span>
            <AnimatedToggleText show={open}>SHOPr</AnimatedToggleText>
          </p>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <NavigationLinks showText={open}/>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-4 border-t border-black/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown inSidebar alignSide="top" avatarOnly={!open} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
