import { GroupDetail } from "@/pages/teacher/groups/groupDetail";
import { Profile } from "@/pages/teacher/profile";
import { StudentDetail } from "@/pages/teacher/students/studentDetail";

export default [
    { path: "profile", page: Profile },
    { path: "group/for-teacher/:id", page: GroupDetail },
    { path: "student/:id", page: StudentDetail },
];
