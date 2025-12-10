import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useGroup = (id: string) => {
    return useQuery({
        queryKey: ["group"],
        queryFn: () =>
            request.get(`/group/for-teacher/${id}`).then((res) => res.data),
    });
};
