import { Home, Inbox, Search, Settings, Camera, Users } from "lucide-react";

export const links = {
    admin: [
        { title: "Home", url: "/app/admin", icon: Home },
        { title: "Teachers", url: "/app/admin/teachers", icon: Inbox },
        { title: "Groups", url: "/app/admin/groups", icon: Users },
        { title: "Search", url: "#", icon: Search },
        { title: "Settings", url: "#", icon: Settings },
    ],

    teacher: [
        { title: "Home", url: "#", icon: Home },
        { title: "Inbox", url: "#", icon: Camera },
    ],
};
