import { Students } from "@/pages/admin/students/students";
import { Teachers } from "@/pages/admin/teachers/teachers";
import { Profile } from "@/pages/admin/profile";
import { Settings } from "@/pages/admin/settings";
import { Groups } from "@/pages/admin/groups/groups";

export default [
    {
        path: "teachers",
        page: Teachers,
    },
    {
        path: "students",
        page: Students,
    },
    {
        path: "profile",
        page: Profile,
    },
    {
        path: "settings",
        page: Settings,
    },

    {
        path: 'groups',
        page: Groups
    }
];
