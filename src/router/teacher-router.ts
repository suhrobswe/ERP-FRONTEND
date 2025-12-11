import { GroupDetail } from "@/pages/teacher/groups/groupDetail";
import { Profile } from "@/pages/teacher/profile";

export default [
    { path: "profile", page: Profile },
    { path: "group/for-teacher/:id", page: GroupDetail },
];
