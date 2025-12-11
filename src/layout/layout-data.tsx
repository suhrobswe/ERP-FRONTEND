import { Home, Inbox, Search, Settings, Users, User } from "lucide-react";

export const links = {
    admin: [
        { title: "Home", url: "/app/admin", icon: Home },
        { title: "Teachers", url: "/app/admin/teachers", icon: Inbox },
        { title: "Groups", url: "/app/admin/groups", icon: Users },
        { title: "Search", url: "#", icon: Search },
        { title: "Settings", url: "#", icon: Settings },
    ],

    teacher: [
        { title: "Home", url: "teacher", icon: Home },
        { title: "Profile", url: "teacher/profile", icon: User },
    ],
};
