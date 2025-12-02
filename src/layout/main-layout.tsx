import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { AppSidebar } from "./navbar";

export const MainLayout = () => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || !role) {
        return <Navigate replace to={"/"} />;
    }

    return (
        <SidebarProvider>
            {/* AppSidebar */}
            {/* @ts-ignore */}
            <AppSidebar role={role} />

            {/* Main content */}
            <main className="grow min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 text-gray-100">
                {/* Topbar */}
                <div className="sticky top-0 z-50 bg-linear-to-r from-black/90 to-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 shadow-lg flex items-center justify-between">
                    <SidebarTrigger className="cursor-pointer text-white hover:text-blue-400 transition-colors" />
                    <h1 className="text-lg font-semibold text-white select-none">
                        {role?.toUpperCase()} Dashboard
                    </h1>
                </div>

                {/* Content wrapper */}
                <div className="px-6 py-6">
                    <div className="rounded-xl bg-linear-to-br from-gray-900/60 to-black/60 border border-gray-800 backdrop-blur-sm p-6 shadow-inner">
                        <Outlet />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
};
