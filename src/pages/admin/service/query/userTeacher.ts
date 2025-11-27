import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useTeacher = (id?: string) => {
    return useQuery({
        queryKey: ["teacherById"],
        queryFn: () => {
            request.get(`/teacher/${id}`).then((res) => res.data);
        },
    });
};
