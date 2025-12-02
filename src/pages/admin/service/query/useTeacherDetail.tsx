import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { TeacherDetailT } from "../../type";

export const useTeacherDetail = (id: string) => {
    return useQuery({
        queryKey: ["teacher", id],
        queryFn: () =>
            request
                .get<TeacherDetailT>(`/teacher/${id}`)
                .then((res) => res.data),
    });
};
