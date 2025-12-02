import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";

import {
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { ActiveLink } from "@/components/active-link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { links } from "@/layout/layout-data";

export function AppSidebar({ role }: { role: "admin" | "teacher" }) {
    return (
        <Sidebar className="border-r border-[#0e0e0e] bg-[#020202] bg-linear-to-b from-black via-[#0b0b0b] to-[#020202] shadow-2xl">
            {/* Header */}
            <SidebarHeader className="flex justify-center py-8 border-b border-[#111] bg-linear-to-r from-black via-[#0a0a0a] to-black">
                <Link
                    to={`/app/${role}`}
                    className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
                        <img
                            className="w-[50px] h-[50px] relative rounded-lg"
                            src={logo}
                            alt="logo"
                        />
                    </div>

                    <span className="text-lg font-bold tracking-wider capitalize bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,180,255,0.5)]">
                        {role}
                    </span>
                </Link>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="bg-black">
                <SidebarGroupContent className="p-4 bg-black">
                    <SidebarMenu className="space-y-2 bg-black">
                        {links[role].map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                                className="bg-black"
                            >
                                <SidebarMenuButton asChild>
                                    <ActiveLink
                                        href={item.url}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#111] text-gray-300 hover:text-cyan-400 glow"
                                    >
                                        <item.icon className="text-xl opacity-80 group-hover:opacity-100" />
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

            {/* Footer */}
            <SidebarFooter className="border-t border-[#111] p-4 bg-linear-to-r from-black via-[#090909] to-black">
                <Button className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.03] shadow-red-600/30 shadow-md hover:shadow-red-500/50">
                    <LogOut className="w-4 h-4" />
                    Sign out
                </Button>

                <div className="text-xs text-gray-500 text-center mt-3">
                    © {new Date().getFullYear()} — {role.toUpperCase()}{" "}
                    Dashboard
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
