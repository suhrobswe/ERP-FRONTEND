import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useStudent = (id: string) => {
    return useQuery({
        queryKey: ["student"],
        queryFn: () => request.get(`/student/${id}`).then((res) => res.data),
    });
};
