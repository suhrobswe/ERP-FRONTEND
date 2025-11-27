import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";

import { links } from "./layout-data";

import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { ActiveLink } from "@/components/active-link";
import { Button } from "@/components/ui/button";

export function AppSidebar({ role }: { role: "admin" | "teacher" }) {
    return (
        <Sidebar className="border-r bg-white">
            <SidebarHeader className="flex justify-center py-6 border-b">
                <Link
                    to={`/app/${role}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-all"
                >
                    <img className="w-[50px] h-[50px]" src={logo} alt="logo" />
                    <span className="text-lg font-semibold tracking-wide capitalize">
                        {role}
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroupContent className="p-4">
                    <SidebarMenu className="space-y-1">
                        {links[role].map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <ActiveLink href={item.url}>
                                        <item.icon className="text-xl" />
                                        <span className="text-sm font-medium">
                                            {item.title}
                                        </span>
                                    </ActiveLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <Button className="w-[150px]">Sign out</Button>
                <div className="text-xs text-gray-500 text-center">
                    © {new Date().getFullYear()} — {role.toUpperCase()}{" "}
                    Dashboard
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
