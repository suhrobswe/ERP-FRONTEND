import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useGroup = (id?: string) => {
    return useQuery({
        queryKey: ["groupById"],
        queryFn: () => {
            request.get(`/for-admin/${id}`).then((res) => res.data);
        },
    });
};
