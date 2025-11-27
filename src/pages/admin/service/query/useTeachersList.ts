import { useQuery } from "@tanstack/react-query";
import { request } from "@/config/request";
import type { IResponse, TeacherList } from "../../type";

export const useTeachersList = () => {
    return useQuery({
        queryKey: ["teacher_list"],
        queryFn: () =>
            request
                .get<IResponse<TeacherList>>("/teacher")
                .then((res) => res.data),
    });
};
