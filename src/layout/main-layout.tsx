import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./navbar";
import Cookies from "js-cookie";

export const MainLayout = () => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || !role) {
        return <Navigate replace to={"/"} />;
    }

    return (
        <SidebarProvider>
            {/* @ts-ignore */}
            <AppSidebar role={role} />
            <main className="grow">
                <div className="p-3">
                    <SidebarTrigger className="cursor-pointer" />
                </div>
                <div className="px-[30px] py-3">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
};
