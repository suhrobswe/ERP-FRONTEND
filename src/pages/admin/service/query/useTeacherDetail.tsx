import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useTeacherDetail = (id: string) => {
    return useQuery({
        queryKey: ["teacher", id],
        queryFn: () => request.get(`/teacher/${id}`).then((res) => res.data),
    });
};
